'use client'


import { resendVerificationEmail, verifyEmail } from "@/actions/verifyEmail"
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card"
import { CheckCircle2 } from 'lucide-react'
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EmailVerifyPage() {
    const router = useRouter();
    const params = useSearchParams();
    const [verificationResult, setVerificationResult] = useState<'success' | 'error' | null>(null);
    const [message, setMessage] = useState('');

    const token = params.get('token');
    const email = params.get('email');

    //function which verifies the email
    async function checkEmail(email: string, token: string) {
        const res = await verifyEmail(email, token);
        if (res?.status === 'success') {
            setVerificationResult('success');
            setMessage(res?.message);
        } else {
            setVerificationResult('error');
            setMessage(res?.message);
        }
    }

    //function to resend the verification email
    async function resendEmail() {

        const res = await resendVerificationEmail(email as string);
        if (res?.status === 'success') {
            setVerificationResult('success');
            setMessage(res?.message);
        } else {
            setVerificationResult('error');
            setMessage(res?.message);
        }
    }

    //verrify the email after page load
    useEffect(() => {
        if (!token || !email) {
            setVerificationResult('error');
            setMessage('Invalid email or token');
            return;
        }

        checkEmail(email, token);

    }, [email, token]);


    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="min-w-[500px]">
                <CardHeader>
                    <CardTitle>Email Verification</CardTitle>
                    <CardDescription>We&#39;re verifying your email address.</CardDescription>
                </CardHeader>
                {verificationResult && (
                    <CardContent>
                        <Alert variant={verificationResult === 'success' ? 'success' : 'destructive'}>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>{verificationResult}</AlertTitle>
                            <AlertDescription>
                                {message}
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                )}
                <CardFooter className="flex flex-col">
                    {verificationResult === 'error' ? (
                        <Button
                            className="w-full"
                            onClick={resendEmail}
                        >
                            Resend Verification Email
                        </Button>
                    ) : (
                        <Button
                            className="w-full"
                            onClick={() => router.push('/login')}
                        >
                            Login
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}