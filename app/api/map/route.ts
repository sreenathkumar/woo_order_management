export async function GET() {

    const response = await fetch("https://api.maptiler.com/maps/streets-v2/style.json?key=S0vZGdA9TzFBnE80Ry14", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch map style");
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}