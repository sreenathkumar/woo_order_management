import { redirect } from "next/navigation";
import crypto from "crypto";
import { getServerSession } from "@/lib/auth-context";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import Image from "next/image";
import { Button } from "@/components/shadcn/button";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};


type Params = Promise<{
    site_url?: string;
    callback_url?: string;
    state?: string;
    code_challenge?: string;
    code_challenge_method?: string;
    platform?: string;
}>;

export default async function AuthorizePage({ searchParams }: { searchParams: Params }) {
    const { site_url, callback_url, state, code_challenge, code_challenge_method, platform } = await searchParams;

    if (!site_url || !callback_url || !state || !code_challenge || !platform) {
        return <MissingParamsUI />;
    }

    if (!['shopify', 'woocommerce'].includes(platform)) {
        return <MissingParamsUI />;
    }

    const session = await getServerSession();

    if (!session?.session?.activeOrganizationSlug) {
        const returnParams = new URLSearchParams({
            site_url,
            callback_url,
            state,
            code_challenge,
            code_challenge_method: code_challenge_method || "S256",
            platform,
        });

        const next = `/authorize?${returnParams.toString()}`;
        redirect(`/login?callbackUrl=${encodeURIComponent(next)}`);
    }

    async function approve() {
        "use server";
        const authCode = crypto.randomBytes(24).toString("hex");

        await prisma.authCode.create({
            data: {
                code: authCode,
                platform: platform as 'shopify' | 'woocommerce',
                orgId: session!.session.activeOrganizationId,
                createdByUserId: session!.session.userId,
                storeUrl: site_url!,
                codeChallenge: code_challenge!,
                codeChallengeMethod: code_challenge_method || "S256",
                used: false,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
            },
        });

        const url = new URL(callback_url!);
        url.searchParams.set("code", authCode);
        url.searchParams.set("state", state!);
        redirect(url.toString());
    }

    async function deny() {
        "use server";
        const url = new URL(callback_url!);
        url.searchParams.set("error", "access_denied");
        url.searchParams.set("state", state!);
        redirect(url.toString());
    }

    return (
        <main className="min-h-screen text-slate-100 grid grid-rows-[auto_1fr] justify-center items-center p-4 md:p-6 font-sans">
            <Image loading="eager" src="/logo-dark.svg" alt="Logo" height={48} width={276} className="mx-auto mb-4 h-8 w-auto self-start" />

            <Card className="max-w-xl mx-auto p-8">
                <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold">Authorize Connection</CardTitle>
                    <CardDescription className="mb-6">
                        The website <span className="text-primary/70">{site_url}</span> is requesting to connect with your account. By approving, you allow access to your store data for OpsCommerce.
                    </CardDescription>
                </CardHeader>


                <CardContent className="flex flex-col gap-4 p-0">
                    <div className="rounded-lg border border-primary/10 bg-primary/5 p-4 mb-4">
                        <div className="flex gap-3">
                            <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div className="text-sm text-muted-foreground">
                                <span className="text-foreground font-semibold block mb-1">Important Instruction:</span>
                                Please review this carefully. If you did not initiate this request, simply deny the connection.
                            </div>
                        </div>
                    </div>

                    <CardFooter className="flex items-center ml-auto gap-4 mt-4 px-0">
                        <Button variant="outline" onClick={deny} className="border-1 border-primary/10 dark:border-muted dark:text-muted-foreground hover:border-primary/70 hover:text-primary transition-colors">
                            Deny
                        </Button>
                        <Button onClick={approve}>
                            Approve
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
        </main>
    );
}


function MissingParamsUI() {
    return (
        <main className="min-h-screen text-slate-100 grid grid-rows-[auto_1fr] justify-center items-center p-4 md:p-6 font-sans">
            <Image src="/logo-dark.svg" loading="eager" alt="Logo" height={48} width={276} className="mx-auto h-8 w-auto self-start" />

            <Card className="sm:max-w-xl p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-2xl bg-white/70 dark:bg-card/40 shadow-2xl overflow-hidden gap-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                <CardHeader className="text-center">
                    <h1 className="text-2xl font-bold">Invalid Authorization Request</h1>
                </CardHeader>
                <CardDescription className="text-center mb-6">
                    The authorization request is missing required parameters. Please ensure you are accessing the correct URL.
                </CardDescription>
                <CardFooter>
                    <Button variant="outline" className="mx-auto text-primary hover:text-primary-foreground" asChild>
                        <Link href="/" >
                            Go Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}