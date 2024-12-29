'use client'

import { useState } from 'react'
import { Button } from "@/components/shadcn/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Pencil } from 'lucide-react'

interface Employee {
    id: number
    name: string
    image: string
    email: string
    position: string
}

interface UpdateEmployeeProps {
    employee: Employee
    onUpdate: (updatedEmployee: Employee) => void
}

export default function UpdateEmployee({ employee, onUpdate }: UpdateEmployeeProps) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState(employee)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onUpdate(formData)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Employee Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" name="position" value={formData.position} onChange={handleChange} />
                    </div>
                    <Button type="submit">Update Employee</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

