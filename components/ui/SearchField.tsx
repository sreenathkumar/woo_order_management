'use client'
import { Search } from 'lucide-react'

import { Input } from "@/components/shadcn/input"
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'


export default function SearchField({ className }: { className?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // debounced search function
    const handleSearch = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
        // Create a new URLSearchParams object
        const params = new URLSearchParams(searchParams);

        if (e.target.value) {
            params.set('query', e.target.value);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className={cn(`flex items-center justify-between w-full ${className}`)}>
            <form className="relative flex-1 mr-4">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4"
                    defaultValue={searchParams.get('query')?.toString()}
                    onChange={handleSearch}
                />
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
        </div>
    )
}

