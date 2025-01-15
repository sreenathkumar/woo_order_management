'use client'

import syncWithWoo from "@/actions/woocommerce/syncWithWoo"
import { Button } from "@/components/shadcn/button"
import { CloudDownload } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

function SyncBtn() {
    const [status, setStatus] = useState('');
    const router = useRouter();

    const handleClick = async () => {
        const res = await syncWithWoo();

        setStatus(res.status);
        router.refresh();
    }

    console.log('status: ', status);
    return (
        <Button variant="outline" size="sm" onClick={handleClick}>
            <CloudDownload className="h-4 w-4" />
        </Button>
    )
}

export default SyncBtn