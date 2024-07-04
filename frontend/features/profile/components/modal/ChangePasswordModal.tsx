'use client'

import React from 'react'
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react'

interface ChangePasswordModalProps {
    passwordAction?: boolean
    setPasswordAction?: any
    toast?: any
}

export function ChangePasswordModal(props: ChangePasswordModalProps) {
    const [action, setAction] = React.useState({
        type: 'change_password',
        data: {
            email: '',
        }
    })

    const handleCloseModal = () => {
        setAction({
            type: 'change_password',
            data: {
                email: '',
            }
        })
        props.setPasswordAction(!props.passwordAction)
    }
    return (
        <Modal
            backdrop={"blur"}
            isOpen={props.passwordAction}
            onOpenChange={handleCloseModal}
            isDismissable={false}
            isKeyboardDismissDisabled={false}>
            <ModalContent
                className="flex w-full min-w-[340px] flex-col gap-4 rounded-large bg-content1 px-6 pb-6 pt-6 shadow-small">
                <ModalHeader className="p-0">Change Password</ModalHeader>
                <ModalBody>
                    <Input
                        label="Old Password"
                        variant="bordered"
                        placeholder={`old password`}
                        type={"text"}
                        className="mt-2"
                    />
                    <Input
                        label="New Password"
                        variant="bordered"
                        placeholder={`new password`}
                        type={"text"}
                        className="mt-2"
                    />
                    <Input
                        label="Confirm New Password"
                        variant="bordered"
                        placeholder={`re enter new password`}
                        type={"text"}
                        className="mt-2"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button size="md" color="success" variant="flat" className="p-3">
                        Change
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
