import { testWebhook } from "@/actions/test";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    console.log('order updated');

    const res = await testWebhook();

    console.log('res: ', res);

    revalidatePath('/');
    return new Response('Order updated', {
        status: 200,
    })
}