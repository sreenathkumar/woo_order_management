'use client'

import { OrderLocationType } from "@/types/OrderType";
import { createContext, useContext, useState } from "react";

interface MapContextType {
    locations: OrderLocationType[];
    setLocations: React.Dispatch<React.SetStateAction<OrderLocationType[]>>;
}

const MapCtx = createContext<MapContextType | null>(null);

export function useMapContext() {
    const context = useContext(MapCtx);

    if (!context) {
        throw new Error("useMapContext must be used within a MapProvider");
    }

    return context;
}

export function MapProvider({ children, defaultLocation }: { children: React.ReactNode, defaultLocation?: OrderLocationType[] }) {
    const [locations, setLocations] = useState<OrderLocationType[]>(defaultLocation || []);

    return <MapCtx.Provider value={{ locations, setLocations }}>
        {children}
    </MapCtx.Provider>
}
