'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from "@/components/shadcn/input"
import { cn } from '@/lib/utils'


export default function SearchField({ className }: { className?: string }) {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className={cn(`flex items-center justify-between w-full ${className}`)}>
            <form className="relative flex-1 mr-4">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
        </div>
    )
}

