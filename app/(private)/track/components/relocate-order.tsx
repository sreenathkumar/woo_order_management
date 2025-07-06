'use client'

import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { useState } from "react"

function RelocateOrder({ order_id, address }: { order_id: number, address: { city: string, block?: string } }) {
    const [openPopover, setOpenPopover] = useState<string | null>(null)
    const [relocationType, setRelocationType] = useState<string>("")
    const [latitude, setLatitude] = useState<string>("")
    const [longitude, setLongitude] = useState<string>("");

    const handleRelocate = (order_id: number) => { };
    return (
        <Popover>
            <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 text-sm font-medium">
                Relocate
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <h4 className="font-medium">Choose relocation type</h4>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`automatic-${order_id}`}
                                name={`relocation-${order_id}`}
                                value="automatic"
                                checked={relocationType === "automatic"}
                                onChange={(e) => setRelocationType(e.target.value)}
                            />
                            <Label htmlFor={`automatic-${order_id}`}>Automatic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id={`custom-${order_id}`}
                                name={`relocation-${order_id}`}
                                value="custom"
                                checked={relocationType === "custom"}
                                onChange={(e) => setRelocationType(e.target.value)}
                            />
                            <Label htmlFor={`custom-${order_id}`}>Custom</Label>
                        </div>
                    </div>

                    {relocationType === "custom" && (
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <div className="flex-1">
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        placeholder="Latitude"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-center pt-6">
                                    <span className="text-muted-foreground">:</span>
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        placeholder="Longitude"
                                        value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setOpenPopover(null)}>
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => handleRelocate(order_id)}
                            disabled={!relocationType || (relocationType === "custom" && (!latitude || !longitude))}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default RelocateOrder