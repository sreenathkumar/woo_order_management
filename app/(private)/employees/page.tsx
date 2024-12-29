'use client'

import { Button } from "@/components/shadcn/button"
import SearchField from '@/components/ui/SearchField'
import { ListFilter } from 'lucide-react'
import EmployeeTable from './components/EmployeeTable'


export default function EmployeesPage() {
    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-6">
                <SearchField className='w-80' />
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <ListFilter className="h-4 w-4" />
                        Filters
                    </Button>
                    <Button size="sm">
                        Add Employee
                    </Button>
                </div>
            </div>
            <EmployeeTable />
        </div>
    )
}

