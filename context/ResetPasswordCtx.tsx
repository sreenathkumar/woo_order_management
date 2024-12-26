'use client'

import { createContext, useContext, useState } from "react";

// Define the context value type
interface EmailContextType {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const ResetPasswordCtx = createContext<EmailContextType | null>(null);

const ResetPasswordProvider = ({ children }: { children: React.ReactNode }) => {
    const [email, setEmail] = useState<string>('');
    return (
        <ResetPasswordCtx.Provider value={{ email, setEmail }}>
            {children}
        </ResetPasswordCtx.Provider>
    )
}

const useResetPasswordCtx = () => {
    const context = useContext(ResetPasswordCtx);
    if (!context) {
        throw new Error('useResetPasswordCtx must be used within a ResetPasswordProvider');
    }
    return context;
}
export { ResetPasswordCtx, ResetPasswordProvider, useResetPasswordCtx }