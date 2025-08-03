'use server';

import dbConnect from "@/dbConnect";
import Location from "@/models/locationModel";
import Order from "@/models/orderModel";
import getLocation from "./getLocation";

type Coordinates = {
    lat: number;
    lon: number;
};


async function updateLocation({ order_id, location }: { order_id: number, location?: Coordinates }): Promise<Coordinates | null> {
    if (!order_id) {
        console.log('[updateLocation] Missing order ID');
        return null;
    }

    await dbConnect();

    try {
        //Get order to extract city & block
        const order = await Order.findOne({ order_id })
            .select('address.city address.block city')
            .lean() as { address: { block: string }, city: string } | null;

        if (!order) {
            console.log(`[updateLocation] Order not found for ID: ${order_id}`);
            return null;
        }

        // check if location is provided
        if (location) {
            if (!isValidCoordinates(location)) {
                console.log(`[updateLocation] Invalid coordinates provided for order ID ${order_id}`);
                return null;
            }
            // Update the order with the provided coordinates
            const updateResult = await Order.updateOne(
                { order_id },
                { $set: { coordinates: location } }
            );

            if (updateResult.modifiedCount === 0) {
                console.log(`[updateLocation] No orders updated for order ID "${order_id}"`);
                return null;
            }

            return location;
        }

        const { city, address: { block } } = order;

        if (!city || !block) {
            console.log(`[updateLocation] Missing city or block in order ID ${order_id}`);
            return null;
        }

        //Check if the city already exists in DB
        const existingCity = await Location.findOne({ city });

        if (existingCity) {
            const hasBlock = existingCity.blocks?.has(block); // Check if the block exists in the city's blocks

            if (hasBlock) {
                const existingBlock = existingCity.blocks.get(block);

                //return the existing lon/lat if the block already exists
                return {
                    lat: existingBlock.lat,
                    lon: existingBlock.lon
                };
            }

            //Block not found → Fetch from external source
            const coordinates = await getLocation({ city, block });

            if (!isValidCoordinates(coordinates)) {
                console.log(`[updateLocation] Failed to fetch coordinates for the block ${block}`);
                return null;
            }

            const updateResult = await Location.updateOne(
                { city },
                { $set: { [`blocks.${block}`]: coordinates } }
            );

            if (updateResult.modifiedCount === 0) {
                console.log(`[updateLocation] No blocks updated for city "${city}"`);
                return null;
            }

            return coordinates;
        }

        //City not found → fetch and create new document
        const coordinates = await getLocation({ city, block });

        if (!isValidCoordinates(coordinates)) {
            console.log(`[updateLocation] Failed to fetch coordinates for ${city}, ${block}`);
            return null;
        }

        const newLocation = new Location({
            city,
            blocks: {
                [block]: coordinates
            }
        });

        await newLocation.save();
        return coordinates;


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('[updateLocation] Internal error:', error.message || error);
        return null;
    }
}

export default updateLocation;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidCoordinates(coord: any): coord is Coordinates {
    return (
        coord &&
        typeof coord.lat === 'number' &&
        typeof coord.lon === 'number'
    );
}