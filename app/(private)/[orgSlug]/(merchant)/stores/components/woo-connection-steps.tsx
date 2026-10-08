import { Button } from "@/components/shadcn/button"
import { Download } from "lucide-react"


function WooConnectionSteps() {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-woo-100 text-woo-600 rounded-xl flex items-center justify-center font-bold">
                    <i className="fa-brands fa-wordpress"></i>
                </div>
                <div>
                    <h3 className="text-base font-bold text-foreground">WooCommerce Integration Setup</h3>
                    <p className="text-xs text-muted-foreground">Complete the steps below to connect your WordPress shop</p>
                </div>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary">

                <div className="relative flex items-start space-x-4">
                    <div className="absolute -left-6 w-5 h-5 rounded-full bg-primary text-foreground text-xs flex items-center justify-center font-semibold ring-4 ring-primary">1</div>
                    <div className="w-full bg-card ml-2 p-4 rounded-xl border border-border ml-2">
                        <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Step 1: Install our plugin</label>
                        <p className="text-xs text-muted-foreground mb-3">Download our official companion plugin and install it inside your WordPress dashboard under Plugins &gt; Add New.</p>
                        <Button className="inline-flex items-center space-x-2 text-foreground text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm">
                            <Download className="w-4 h-4" />
                            <span>Download Plugin (.zip)</span>
                        </Button>
                    </div>
                </div>


                <div className="relative flex items-start space-x-4">
                    <div className="absolute -left-6 w-5 h-5 rounded-full bg-primary text-foreground text-xs flex items-center justify-center font-semibold ring-4 ring-primary">2</div>
                    <div className="w-full bg-card ml-2 p-4 rounded-xl border border-border ml-2">
                        <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Step 2: Click the &quot;Connect to Dashboard&quot; button</label>
                        <p className="text-xs text-muted-foreground">Go to WordPress &gt; OpsCommerce &gt; Click the connect button follow the further instructions.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WooConnectionSteps