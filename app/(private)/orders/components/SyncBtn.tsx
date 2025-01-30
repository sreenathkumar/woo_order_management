'use client'

//import testSync from "@/actions/woocommerce/testSync";
import syncWithWoo from "@/actions/woocommerce/syncWithWoo"
import { Button } from "@/components/shadcn/button";
import { CloudDownload } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SyncBtn() {
    const router = useRouter();

    const handleClick = async () => {
        const toastId = toast.loading('Syncing orders...');
        const res = await syncWithWoo();

        //const res = await testSync();

        if (res) {
            toast.success(res.message, { id: toastId });
        }

        router.refresh();
    }
    return (
        <Button variant="outline" size="sm" onClick={handleClick}>
            <CloudDownload className="h-4 w-4" />
        </Button>
    )
}

export default SyncBtn