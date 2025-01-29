/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

const clients: Set<ReadableStreamDefaultController> = new Set()

export async function GET() {
    const stream = new ReadableStream({
        start(controller) {
            clients.add(controller)

            // Cleanup when the stream is canceled (client disconnects)
            return () => {
                clients.delete(controller);
            };
        },

        cancel() {
            // Cleanup when the stream is canceled (client disconnects)
            clients.forEach(client => clients.delete(client));
        }
    })

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    })
}

export async function POST(request: Request) {
    const data = await request.json();

    clients.forEach((client) => {
        try {
            client.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        } catch (error) {
            console.warn("Skipping closed SSE client:", error);
            clients.delete(client);
        }
    })

    return NextResponse.json({ success: true })
}

