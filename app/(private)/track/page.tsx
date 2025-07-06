import { getAssignedOrderCoordinates } from "@/actions/map/getCoordinates";
import Map from "./components/map"
import MapSiderbar from "./components/map-sidebar"
import SearchMap from "./components/search-map"

async function RealtimeLocationPage() {
    //fetched assigned orders lat and lon
    const location = await getAssignedOrderCoordinates();

    return (
        <div className="flex flex-col relative">
            <div className="flex gap-6 items-center py-6">
                <SearchMap />
                <MapSiderbar orderLocations={location} />
            </div>
            <Map />
        </div>
    )
}

export default RealtimeLocationPage