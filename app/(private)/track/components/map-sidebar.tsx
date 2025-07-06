'use client'

import { Button } from "@/components/shadcn/button";
import { OrderLocationType } from "@/types/OrderType";
import { PanelRight, X } from "lucide-react";
import { useState } from "react";
import MapSiderbarContent from "./map-sidebar-content";

function MapSiderbar({ orderLocations }: { orderLocations?: OrderLocationType[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="bg-background/95 backdrop-blur-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <PanelRight className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-background z-20 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-start p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
          <MapSiderbarContent orderData={orderLocations} />
        </div>S

      </div>
    </>
  )
}

export default MapSiderbar