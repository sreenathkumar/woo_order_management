"use client"

import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert"
import { Button } from "@/components/shadcn/button"

interface VerifyEmailNoticeProps {
    email: string
}

export function VerifyEmailNotice({ email, }: VerifyEmailNoticeProps) {
    const [isResending, setIsResending] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)

    const handleResend = async () => {
        // setIsResending(true)
        // try {
        //     await onResend()
        //     setResendSuccess(true)
        // } catch (error) {
        //     console.error('Failed to resend verification email:', error)
        // } finally {
        //     setIsResending(false)
        // }
    }

    return (
        <Alert variant="default" className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Verify your email address</AlertTitle>
            <AlertDescription className="mt-2 text-yellow-700">
                We&#39;ve sent a verification email to <strong>{email}</strong>. Please check your inbox and click the verification link to activate your account.
            </AlertDescription>
            <div className="mt-4 flex items-center space-x-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResend}
                    disabled={isResending || resendSuccess}
                >
                    {isResending ? 'Resending...' : resendSuccess ? 'Email Resent' : 'Resend Email'}
                </Button>
                {resendSuccess && (
                    <span className="text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verification email resent
                    </span>
                )}
            </div>
        </Alert>
    )
}

