'use client'

import { Badge } from "@/components/shadcn/badge"
import { Button } from "@/components/shadcn/button"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import { Pencil, Trash } from 'lucide-react'
import { useState } from 'react'


// Sample data
const employees = [
    { id: '1', name: 'John Doe', image: '/placeholder.svg?height=40&width=40', email: 'john@example.com', position: 'Developer', status: 'success' },
    { id: '2', name: 'Jane Smith', image: '/placeholder.svg?height=40&width=40', email: 'jane@example.com', position: 'Designer', status: 'success' },
    { id: '3', name: 'Bob Johnson', image: '/placeholder.svg?height=40&width=40', email: 'bob@example.com', position: 'Manager', status: 'success' },
]

export default function EmployeeTable() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox
                                checked={selectedItems.length === employees.length}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedItems(employees.map(t => t.id))
                                    } else {
                                        setSelectedItems([])
                                    }
                                }}
                            />
                        </TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedItems.includes(transaction.id)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setSelectedItems([...selectedItems, transaction.id])
                                        } else {
                                            setSelectedItems(selectedItems.filter(id => id !== transaction.id))
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{transaction.name}</TableCell>
                            <TableCell>{transaction.email}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={transaction.status === 'completed' ? 'success' : 'warning'}
                                    className={
                                        transaction.status === 'completed'
                                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                    }
                                >
                                    {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

