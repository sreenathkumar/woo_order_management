'use server'

import { getRequiredSessionContext } from "@/lib/auth-context";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function connectShopifyStore(shopDomain: string) {
    if (!shopDomain) {
        console.log("Missing parameters:", { shopDomain });
        return {
            success: false,
            message: "Shop domain is required.",
        }
    }

    const { organizationId } = await getRequiredSessionContext({
        allowedRoles: ['owner', 'manager']
    });

    if (!organizationId) {
        console.error('Unauthorized access: organizationId is missing in the session context');
        return {
            success: false,
            message: "Unauthorized access. Please log in again.",
        }
    }

    //check if the shop is already connected
    const isConnected = await prisma.shop.findFirst({
        where: {
            domain: shopDomain,
        }
    });

    if (isConnected) {
        return {
            success: false,
            message: "Shop is already connected.",
        }
    }


    if (!process.env.SHOPIFY_CLIENT_ID) {
        console.error('SHOPIFY_CLIENT_SECRET is not defined in the environment variables');
        return {
            success: false,
            message: "Some went wrong in the backend. Please try again later.",
        }
    }

    if (!process.env.SHOPIFY_CLIENT_SECRET) {
        console.error('SHOPIFY_CLIENT_SECRET is not defined in the environment variables');
        return {
            success: false,
            message: "Some went wrong in the backend. Please try again later.",
        }
    }

    const nonce = crypto.randomUUID();

    //save the nonce in the database with the shop domain and expiration time
    await prisma.shopifyNonce.upsert({
        where: {
            shop: shopDomain
        },
        update: {
            nonce,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiration
        },
        create: {
            nonce,
            organizationId,
            shop: shopDomain,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiration
        }
    });

    // Construct the Shopify OAuth URL
    const params = new URLSearchParams({
        nonce,
        shop: shopDomain,
    });

    redirect(`https://${process.env.NEXT_PUBLIC_SHOPIFY_HOST}/api/connect?${params.toString()}`);
}