"use client"

import type React from "react"

import { PanelRight, Search, X } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"

import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"

// Dynamically import the Map component with no SSR to avoid issues with window object
const Map = dynamic(() => import("./components/Map"), { ssr: false })

export default function RealtimeLocationPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would implement the actual search functionality
        console.log("Searching for:", searchQuery)
        // Open sidebar when search is performed
        setSidebarOpen(true)
    }

    return (
        <div className="flex flex-col h-screen relative">
            <div className="absolute top-0 left-0 right-0 p-4 z-10">
                <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search locations..."
                            className="pl-8 bg-background/95 backdrop-blur-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button type="submit">Search</Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-background/95 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <PanelRight className="h-4 w-4" />
                        <span className="sr-only">Toggle sidebar</span>
                    </Button>
                </form>
            </div>

            <div className="flex-1 relative">
                <Map />
            </div>

            <div
                className={`fixed top-0 right-0 h-full w-full md:w-96 bg-background z-20 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-semibold">Location Information</h2>
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close sidebar</span>
                    </Button>
                </div>

            </div>
        </div>
    )
}
