import { VerifyEmailNotice } from "./VerifyEmailNotice"

function EmailNotVerified({ email }: { email: string }) {
    return (
        <div className="flex h-screen">
            <main className="flex flex-1 p-8 justify-center items-center">
                <VerifyEmailNotice email={email} />
            </main>
        </div>
    )
}

export default EmailNotVerified