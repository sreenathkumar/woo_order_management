'use client'

import register from "@/actions/register"
import PasswordField from "@/app/login/components/PasswordField"
import { Alert, AlertDescription } from "@/components/shadcn/alert"
import { Input } from "@/components/shadcn/input"
import FormField from "@/components/ui/CustomField"
import { useActionState } from "react"
import SubmitBtn from "./SubmitBtn"

const initailState = {
    status: '',
    message: '',
    errors: {},
}


function RegisterForm() {
    const [state, registerAction] = useActionState(register, initailState);

    return (
        <>
            {state?.status && (
                <Alert variant={state.status === 'success' ? 'success' : 'destructive'}>
                    {state?.message && (
                        <AlertDescription>
                            {state.message}
                        </AlertDescription>
                    )}
                </Alert>
            )}
            <form className="mt-8 space-y-6" action={registerAction}>
                <div>
                    <FormField label="Full Name" htmlFor="name" error={state?.errors?.name}>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="mt-1"
                        />
                    </FormField>
                    <FormField label="Email Address" htmlFor="email" error={state?.errors?.email}>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1"
                        />
                    </FormField>
                    <FormField label="Password" htmlFor="password" error={state?.errors?.password}>
                        <PasswordField />
                    </FormField>
                </div>
                <SubmitBtn text="Register" loadingText="Registering..." />
            </form>
        </>
    )
}

export default RegisterForm