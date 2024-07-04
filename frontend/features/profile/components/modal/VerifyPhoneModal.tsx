'use client'

import React from 'react'
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react'

interface VerifyPhoneModalProps {
    phoneAction?: any
    setPhoneAction?: any
    toast?: any
}

export function VerifyPhoneModal(props: VerifyPhoneModalProps) {
    const [action, setAction] = React.useState({
        type: 'phone_verify',
        data: {
            email: '',
        }
    })

    const handleCloseModal = () => {
        setAction({
            type: 'phone_verify',
            data: {
                email: '',
            }
        })
        props.setPhoneAction({...props.phoneAction, verify: !props.phoneAction.verify})
    }
    return (
        <Modal
            backdrop={"blur"}
            isOpen={props.phoneAction.verify}
            onOpenChange={handleCloseModal}
            isDismissable={false}
            isKeyboardDismissDisabled={false}>
            <ModalContent
                className="flex w-full min-w-[340px] flex-col gap-4 rounded-large bg-content1 px-6 pb-6 pt-6 shadow-small">
                <ModalHeader className="p-0">Verify Phone Number</ModalHeader>
                <ModalBody>
                    <Input
                        label="Phone Number"
                        variant="bordered"
                        placeholder={`Enter your phone number`}
                        type={"text"}
                        className="mt-2"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button size="md" color="success" variant="flat" className="p-3">
                        Verify
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
