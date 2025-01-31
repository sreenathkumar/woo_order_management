'use client'

import getClipboardContent from '@/actions/getClipboardContent'
import { Button } from '@/components/shadcn/button'
import { ClipboardCopy } from '@/components/ui/ClipBoardCopy'
import Modal from '@/components/ui/Modal'
import { useSelectedOrder } from '@/context/SelectedOrderCtx'
import { ClipboardList } from 'lucide-react'
import { useEffect, useState } from 'react'

function CopyBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('')
    const { selectedOrder } = useSelectedOrder()
    const openCopyModal = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const fetchClipboardData = async () => {
            const res = await getClipboardContent(selectedOrder)

            if (res) {
                setContent(res)
            }

        }
        fetchClipboardData();

    }, [selectedOrder])
    //prepare the content 
    return (
        <>
            {selectedOrder?.length > 0 &&
                <Button variant='outline' size='sm' onClick={openCopyModal}>
                    <ClipboardList />
                </Button>}
            <Modal isOpen={isOpen} onClose={openCopyModal} title='Copy orders data to clipboard'>
                <ClipboardCopy content={content}>
                    {content}
                </ClipboardCopy>
            </Modal>
        </>
    )
}


export default CopyBtn