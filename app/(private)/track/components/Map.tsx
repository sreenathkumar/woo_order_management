"use client"

//import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl, { LngLatBoundsLike, Map as MapLibreMap } from 'maplibre-gl';
import { useEffect, useRef } from "react";


export default function Map() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapLibreMap | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const kuwaitBounds: LngLatBoundsLike = [
            [46.5, 28.4],  // Southwest
            [49.0, 30.1],  // Northeast
        ];

        mapRef.current = new maplibregl.Map({
            container: mapContainerRef.current!, // <-- FIXED
            style: '/api/map',
            center: [0, 0],
            zoom: 2,
            maxBounds: kuwaitBounds,
        });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            <div ref={mapContainerRef} className="absolute inset-0" />
        </div>
    );
};

