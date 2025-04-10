'use client'

//import testSync from "@/actions/woocommerce/testSync";
import { Button } from "@/components/shadcn/button";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { CloudDownload } from "lucide-react";
import { useState } from "react";

function SyncBtn() {
    //const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);

    // handle sync with woo confirmation modal
    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleClick = async () => {
        // const toastId = toast.loading('Syncing orders...');
        // // const res = await syncWithWoo();

        // // //const res = await testSync();

        // // if (res) {
        // //     toast.success(res.message, { id: toastId });
        // // }

        // router.refresh();
    }
    return (
        <ConfirmationDialog open={modalOpen} onOpenChange={handleModal} trigger={<Button variant="outline" size="sm">
            <CloudDownload className="h-4 w-4" />
        </Button>} title="Sync orders with Woocommerce" description="Are you sure? It can remove the current orders and it's data." onConfirm={handleClick} />
    )
}

export default SyncBtn