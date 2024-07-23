'use client'

import React, {useState} from 'react'
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react'
import {createClient} from "@/utils/supabase/client";
import {useUser} from "@/features/user/hooks/use-user";
import { useRouter } from "next/navigation";

interface DeleteAccountModalProps {
    deleteAction?: any
    setDeleteAction?: any
    toast?: any
}

export function DeleteAccountModal(props: DeleteAccountModalProps) {
    const supabase = createClient()
    const {profile} = useUser()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteAction = async () => {
        setIsLoading(true)

        const { data, error }: any = await supabase
            .from('profiles')
            .delete()
            .eq('id', profile?.id)
            .select()

        if (data[0]?.id) {
            props.toast.success("Success Delete Profile Data ! you will be redirecting to login page.")
            const { error: err } = await supabase.auth.signOut()
            router.refresh();
            props.setDeleteAction(!props.deleteAction)
        } else {
            props.toast.error(error?.message)
        }
        console.log(data, error)
        setIsLoading(false)
    }

    const handleCloseModal = () => {
        props.setDeleteAction(!props.deleteAction)
    }
    return (
        <Modal
            backdrop={"blur"}
            isOpen={props.deleteAction}
            onOpenChange={handleCloseModal}
            isDismissable={false}
            isKeyboardDismissDisabled={false}>
            <ModalContent
                className="flex w-full min-w-[340px] flex-col gap-4 rounded-large bg-content1 px-6 pb-6 pt-6 shadow-small">
                <ModalHeader className="p-0">Delete Account</ModalHeader>
                <ModalBody>
                    {JSON.stringify(profile, null, 2)}
                </ModalBody>
                <ModalFooter>
                    <Button size="md" color="danger" isLoading={isLoading} variant="flat" className="p-3" onClick={() => handleDeleteAction()}>
                        DELETE
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
