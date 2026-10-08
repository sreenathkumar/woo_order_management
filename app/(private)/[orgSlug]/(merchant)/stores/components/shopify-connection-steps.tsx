'use client'

import { connectShopifyStore } from "@/actions/integrationActions"
import { Input } from "@/components/shadcn/input"
import { extractDomain } from "@/lib/utils"
import { Button } from "@components/shadcn/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"


function ShopifyConnectionSteps() {
    const [pending, setPending] = useState(false);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setPending(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const url = formData.get('url') as string;
        const shopDomain = extractDomain(url);

        if (!shopDomain) {
            toast.error("Please enter a valid Shopify store URL.");
            return;
        }

        const result = await connectShopifyStore(shopDomain);

        if (!result.success) {
            toast.error(result.message || "Failed to connect to Shopify store.");
            setPending(false);
            return;
        }
    };

    return <>
        <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-woo-100 text-woo-600 rounded-xl flex items-center justify-center font-bold">
                    <i className="fa-brands fa-wordpress"></i>
                </div>
                <div>
                    <h3 className="text-base font-bold text-foreground">Shopify Integration Setup</h3>
                    <p className="text-xs text-muted-foreground">Enter your Shopify store details to establish secure connection</p>
                </div>
            </div>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Shopify Store URL</label>
                    <div className="flex rounded-lg shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border bg-muted text-muted-foreground text-xs font-medium">https://</span>
                        <Input type="text" name="url" placeholder="yourstore.com" className="flex-1 min-w-0 block w-full px-3 py-2.5 rounded-none rounded-r-lg border border-border text-xs focus:ring-primary focus:border-primary focus:border-l-0 focus:ring-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Example: my-fashion-store.myshopify.com</p>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 cursor-pointer text-sm relative z-10" size="lg" disabled={pending}>
                    <span>Connect to Shopify</span>
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </form>
        </div>

        <p className="text-[10px] text-muted-foreground text-center mt-6 uppercase tracking-widest font-semibold relative z-10">
            Encrypted & Secure Connection
        </p>
    </>
}

export default ShopifyConnectionSteps