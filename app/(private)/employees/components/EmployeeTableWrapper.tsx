'use client'

import { Button } from "@/components/shadcn/button"
import SearchField from '@/components/ui/SearchField'
import { ListFilter, Trash2 } from 'lucide-react'
import { useState } from "react";
import DeleteEmployee from "./DeleteEmployee";
import AddEmployee from "./AddEmployee";
import EmployeeTable from "./EmployeeTable";

function EmployeeTableWrapper({ employees }: { employees: { id: string, name: string, email: string, role: string }[] }) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <div className="py-8 px-4">
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
                    <AddEmployee />
                </div>
            </div>
            <EmployeeTable employees={employees} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />

        </div>
    )
}

export default EmployeeTableWrapper