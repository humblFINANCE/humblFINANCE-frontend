'use client'

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react'
import Upload from "@/features/profile/components/modal/components/Upload";

export default function UploadAvatarModal(props: any) {

    return (
        <>
            <Modal
                backdrop="blur"
                isOpen={props.isOpen}
                onOpenChange={() => props.onOpenChange(!props.isOpen)}
                isDismissable={false}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Upload Avatar
                            </ModalHeader>
                            <ModalBody>
                                <Upload/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light"
                                        onPress={() => props.onOpenChange(!props.isOpen)}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
