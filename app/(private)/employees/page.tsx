'use client'

import { Button } from "@/components/shadcn/button"
import SearchField from '@/components/ui/SearchField'
import { ListFilter, Trash2 } from 'lucide-react'
import { useState } from "react"
import AddEmployeeForm from "./components/AddEmployee"
import DeleteEmployee from "./components/DeleteEmployee"
import EmployeeTable from './components/EmployeeTable'

// Sample data
const employees = [
    { id: '1', name: 'John Doe', image: '/placeholder.svg?height=40&width=40', email: 'john@example.com', role: 'Developer', status: 'success' },
    { id: '2', name: 'Jane Smith', image: '/placeholder.svg?height=40&width=40', email: 'jane@example.com', role: 'Designer', status: 'success' },
    { id: '3', name: 'Bob Johnson', image: '/placeholder.svg?height=40&width=40', email: 'bob@example.com', role: 'Manager', status: 'success' },
]

export default function EmployeesPage() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-6">
                <SearchField className='w-80' />
                <div className="flex gap-2 items-center">
                    {
                        selectedItems.length > 0 && (
                            <DeleteEmployee>
                                <Button variant="outline" size="sm" className="bg-red-100 text-red-600">
                                    <Trash2 />
                                </Button>
                            </DeleteEmployee>
                        )
                    }
                    <Button variant="outline" size="sm">
                        <ListFilter className="h-4 w-4" />
                        Filters
                    </Button>
                    <AddEmployeeForm />
                </div>
            </div>
            <EmployeeTable employees={employees} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        </div>
    )
}

