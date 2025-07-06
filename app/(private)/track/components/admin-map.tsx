"use client"

import maplibregl, { LngLatBoundsLike, Map as MapLibreMap, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef } from "react";


export default function AdminMap() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapLibreMap | null>(null);

    //initialize the map and set the bounds to kuwait
    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const kuwaitBounds: LngLatBoundsLike = [
            [46.5, 28.4],
            [49.0, 30.1],
        ];

        mapRef.current = new maplibregl.Map({
            container: mapContainerRef.current!, // <-- FIXED
            style: '/api/map',
            center: [48.085369, 29.215606],
            zoom: 0,
            maxBounds: kuwaitBounds,
        });


        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        mapRef.current.on('load', () => {
            const orderLocations = [
                { lon: 48.0853, lat: 29.2156, name: 'Order 1' },
                { lon: 47.9780, lat: 29.3750, name: 'Order 2' },
            ];
            orderLocations.forEach(location => {
                new Marker()
                    .setLngLat([location.lon, location.lat])
                    .setPopup(new maplibregl.Popup().setText(location.name))
                    .addTo(mapRef.current!);
            });
        });
    }, []);


    return (
        <div className="relative w-full h-[420px] z-10">
            <div ref={mapContainerRef} className='z-0 h-full w-full rounded' />
        </div>
    );
};

