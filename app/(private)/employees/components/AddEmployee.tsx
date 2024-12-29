'use client'

import { useState } from 'react'
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/shadcn/card"


export default function AddEmployeeForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Employee</CardTitle>
            </CardHeader>
            <form>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Add Employee</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

