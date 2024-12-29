import { VerifyEmailNotice } from "./VerifyEmailNotice"

function EmailNotVerified({ email }: { email: string | undefined }) {
    return (
        <main className="flex flex-1 p-8 justify-center items-center">
            <VerifyEmailNotice email={email || ''} />
        </main>

    )
}

export default EmailNotVerified