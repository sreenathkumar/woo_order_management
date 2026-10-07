'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/shadcn/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface UniversalModalProps {
    trigger: React.ReactNode;
    icon?: React.ReactNode;
    title: string;
    description: string;
    body: React.ReactNode;
    bodyClass?: string;
}

function UniversalModal({ trigger, icon, title, description, body, bodyClass }: UniversalModalProps) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className={cn("max-h-[90vh] sm:max-w-md p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-2xl bg-white/70 dark:bg-card/40 shadow-2xl overflow-hidden gap-0", bodyClass)}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                {icon && (
                    <div className="flex justify-center mb-6 relative z-10">
                        {icon}
                    </div>
                )}
                <DialogHeader className="mb-8 relative z-10 text-center">
                    <DialogTitle className="text-2xl font-extrabold text-foreground tracking-tight text-center">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm text-center leading-relaxed">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {body}
            </DialogContent>
        </Dialog>
    )
}

export default UniversalModal