import { addListener } from "../order_created/route";

export async function GET() {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
        start(controller) {
            const listener = (data: unknown) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
            }
            const cleanup = addListener(listener)

            return () => cleanup()
        }
    })

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    })
}
