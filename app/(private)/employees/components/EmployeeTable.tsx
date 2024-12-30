'use client'

import { Badge } from "@/components/shadcn/badge"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import UpdateEmployee from "./UpdateEmployee"
import DeleteEmployee from "./DeleteEmployee"
import { Button } from "@/components/shadcn/button"
import { Trash } from "lucide-react"


type Props = {
    employees: { id: string, name: string, email: string, status: string }[],
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void
}

export default function EmployeeTable({ employees, selectedItems, setSelectedItems }: Props) {

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
                        <TableHead>Role</TableHead>
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
                                    {transaction.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-4">
                                    <UpdateEmployee employee={transaction} onUpdate={(updatedEmployee) => console.log(updatedEmployee)} />
                                    <DeleteEmployee>
                                        <Button variant="ghost" size="icon">
                                            <Trash />
                                        </Button>
                                    </DeleteEmployee>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

