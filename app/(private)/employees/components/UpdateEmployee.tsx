'use client'

import { Button } from "@/components/shadcn/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/dialog"
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import EmployeeFrom from './EmployeeForm'


export default function UpdateEmployee() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Update Employee Information</DialogTitle>
                </DialogHeader>
                <EmployeeFrom />
            </DialogContent>
        </Dialog>
    )
}

