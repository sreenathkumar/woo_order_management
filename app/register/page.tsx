import React from 'react'
import RegisterForm from './components/RegisterForm'
import Link from 'next/link'

function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4 md:px-0">
            <div className="max-w-md w-full space-y-8 p-8 bg-card/50 text-card-foreground rounded-xl shadow border">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold">Register your account</h2>
                </div>
                <RegisterForm />
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-card-foreground hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default RegisterPage