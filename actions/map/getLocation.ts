'use server'

async function getLocation({ block, city }: { block?: string, city?: string }) {
    try {
        if (!block || !city) {
            console.error('Block or city is missing');
            return null;
        }
        // Construct the address string from the block and city
        const address = `block:${block}, ${city},`;

        // Convert to lowercase and replace spaces with underscores
        const formattedAddress = address.toLocaleLowerCase().replace(/[ :]/g, '+');

        // call api for the coordinates
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${formattedAddress}&format=json`);

        if (!response.ok) {
            console.error('Failed to fetch location:', response.statusText);
            return null;
        }

        const data = await response.json();

        return {
            lat: data[0]?.lat ? parseFloat(data[0].lat) : null,
            lon: data[0]?.lon ? parseFloat(data[0].lon) : null,
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        return null;
    }

}

export default getLocation;