import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Received webhook:", await req.text());
    //console.log('json data ', JSON.parse(await req.text()));
    return new Response("Webhook received", { status: 200 });
}