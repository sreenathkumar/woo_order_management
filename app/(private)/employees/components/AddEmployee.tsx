'use client'

import { Button } from "@/components/shadcn/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/dialog"
import { useState } from 'react'
import EmployeeFrom from "./EmployeeForm"



export default function AddEmployee() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    Add Employee
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Add Employee</DialogTitle>
                </DialogHeader>
                <EmployeeFrom />
            </DialogContent>
        </Dialog>
    )
}

