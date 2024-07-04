'use client'

import React from 'react'
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/react'
import {useUser} from "@/features/user/hooks/use-user";

interface ChangeEmailModalProps {
    emailAction?: any
    setEmailAction?: any
    toast?: any
}

export function ChangeEmailModal(props: ChangeEmailModalProps) {
    const {user} = useUser()
    const [loading, setLoading] = React.useState(false)
    const [verifyPassed, setVerifyPassed] = React.useState(false)
    const [timeLeft, setTimeLeft] = React.useState<any>(null)
    const [checkOTPSendManyTime, setCheckOTPSendManyTime] = React.useState(0)
    const [action, setAction] = React.useState({
        type: 'change_email',
        data: {
            email: '',
        }
    })

    const handleCloseModal = () => {
        setCheckOTPSendManyTime(0)
        setVerifyPassed(false)
        setAction({
            type: 'change_email',
            data: {
                email: '',
            }
        })
        props.setEmailAction({...props.emailAction, change: !props.emailAction.change})
    }

    const handleOtpSend = async () => {
        setLoading(true)
        setCheckOTPSendManyTime(checkOTPSendManyTime + 1)
        setTimeLeft(5)
        setAction({
            ...action,
            type: 'change_email'
        })

        setTimeout(() => {
            props.toast.success("Success Send OTP to your email");
            setLoading(false)
        }, 1500)
    }

    const handleVerifyPassed = () => {
        setVerifyPassed(true)
    }

    React.useEffect(() => {
        const timer: any = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);
    return (
        <Modal
            backdrop={"blur"}
            isOpen={props.emailAction.change}
            onOpenChange={handleCloseModal}
            isDismissable={false}
            isKeyboardDismissDisabled={false}>
            <ModalContent
                className="flex w-full min-w-[340px] flex-col gap-4 rounded-large bg-content1 px-6 pb-6 pt-6 shadow-small">
                <ModalHeader className="p-0">Change Email Address</ModalHeader>
                <ModalBody>
                    {
                        !verifyPassed ?
                            <div className="bg-warning-200 border-l-4 p-4" role="alert"
                                 style={{
                                     borderRadius: 10,
                                     backgroundColor: 'rgba(255, 165, 0, 0.2)',
                                     borderColor: 'rgba(255, 170, 0, 0.2)'
                                 }}>
                                <p className="font-bold">OTP Required</p>
                                <p>Confirmaion is required if you made email change.</p>
                            </div> : null
                    }
                    {
                        !verifyPassed ?
                            <Input
                                label="OTP CODE"
                                variant="bordered"
                                placeholder={`Enter code from email`}
                                isDisabled={loading}
                                endContent={
                                    <>
                                        {
                                            checkOTPSendManyTime >= 1 && !loading ?
                                                <Button size="sm" color="primary" isLoading={loading}
                                                        disabled={timeLeft > 0}
                                                        variant={loading || timeLeft > 0 ? "faded" : "bordered"}
                                                        className="p-4"
                                                        onClick={handleOtpSend}>
                                                    Resend OTP {timeLeft ? timeLeft : null}
                                                </Button> :
                                                <Button size="sm" color="success" isLoading={loading} variant="bordered"
                                                        className="p-4"
                                                        onClick={handleOtpSend}>
                                                    Send OTP
                                                </Button>
                                        }
                                    </>
                                }
                                type={"text"}
                                className="mt-2"
                            /> :
                            <>
                                <Input
                                    label="Old Email"
                                    variant="bordered"
                                    placeholder={`old password`}
                                    type={"text"}
                                    readOnly
                                    value={user?.user_metadata?.email}
                                    className="mt-2"
                                />

                                <Input
                                    label="New Email"
                                    variant="bordered"
                                    placeholder={`enter new email`}
                                    type={"text"}
                                    className="mt-2"
                                />

                                <Input
                                    label="Confirm New Email"
                                    variant="bordered"
                                    placeholder={`re enter new email`}
                                    type={"text"}
                                    className="mt-2"
                                />
                            </>
                    }

                </ModalBody>
                <ModalFooter>
                    <Button size="md" color="success" disabled={checkOTPSendManyTime === 0} onClick={handleVerifyPassed}
                            variant="flat"
                            className="p-3">
                        {verifyPassed ? 'Change' : 'Verify OTP'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
