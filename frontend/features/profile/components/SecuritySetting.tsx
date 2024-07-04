'use client'

import {CardProps} from '@nextui-org/react'

import React, {useState} from 'react'
import {Card, CardHeader, CardBody, Button} from '@nextui-org/react'
import {Icon} from '@iconify/react'

import {SwitchCell} from '@/components/shared/SwitchCell'
import {cn} from '@/utils/nextui/cn'

import {motion} from "framer-motion";
import {useUser} from "@/features/user/hooks/use-user";
import {ChangeEmailModal} from "@/features/profile/components/modal/ChangeEmailModal";
import {toast, ToastContainer} from 'react-toastify';
import {VerifyPhoneModal} from "@/features/profile/components/modal/VerifyPhoneModal";
import {ChangePasswordModal} from "@/features/profile/components/modal/ChangePasswordModal";

const CellWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({children, className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex items-center justify-between gap-2 rounded-medium bg-content2 p-4',
            className
        )}
        {...props}
    >
        {children}
    </div>
))

CellWrapper.displayName = 'CellWrapper'

interface ICardProps extends CardProps {
    activeAction?: any;
}

export function SecuritySetting(props: ICardProps) {
    const {user} = useUser()
    const [emailAction, setEmailAction] = useState({
        change: false,
        verify: false
    });
    const [phoneAction, setPhoneAction] = useState({
        change: false,
        verify: false
    });
    const [passwordAction, setPasswordAction] = useState(false);
    return (
        <>
            <Card className="w-full max-w-lg p-2" {...props}>
                <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                    <p className="text-large">Security Settings</p>
                    <p className="text-small text-default-500">
                        Manage your security preferences
                    </p>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: props.activeAction.type === 'email' ? [1, 1.04, 1] : 1}}
                        transition={{duration: 1.2}}>
                        {/* Email */}
                        <CellWrapper className="shadow-amber-500">
                            <div>
                                <p>Email Address</p>
                                <p className="text-small text-default-500">
                                    The email address associated with your account.
                                </p>
                            </div>
                            <div
                                className="flex w-full flex-wrap items-center justify-end gap-6 sm:w-auto sm:flex-nowrap">
                                <div className="flex flex-col items-end mr-2">
                                    <p>{user?.email}</p>
                                    {
                                        user?.user_metadata?.email_verified ?
                                            <p className="text-small text-success">{user?.user_metadata?.email_verified ? 'Verified' : 'Not Verified'}</p> :
                                            <p className="text-small text-danger">{user?.user_metadata?.email_verified ? 'Verified' : 'Not Verified'}</p>
                                    }
                                </div>
                                <Button
                                    endContent={<Icon icon="solar:pen-2-linear"/>}
                                    radius="full"
                                    variant="bordered"
                                    onClick={() => setEmailAction({...emailAction, change: !emailAction.change})}
                                >
                                    Change
                                </Button>
                            </div>
                        </CellWrapper>
                    </motion.div>

                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: props.activeAction.type === 'phone' ? [1, 1.04, 1] : 1}}
                        transition={{duration: 1.2}}>
                        {/* Phone Number */}
                        <CellWrapper className="shadow-amber-500">
                            <div>
                                <p>Phone Number</p>
                                <p className="text-small text-default-500">
                                    The phone number associated with your account.
                                </p>
                            </div>
                            <div
                                className="flex w-full flex-wrap items-center justify-end gap-6 sm:w-auto sm:flex-nowrap">
                                <div className="flex flex-col items-end mr-2">
                                    <p>{user?.phone}</p>
                                    {
                                        user?.user_metadata?.phone_verified ?
                                            <p className="text-small text-success">{user?.user_metadata?.phone_verified ? 'Verified' : 'Not Verified'}</p> :
                                            <p className="text-small text-danger">{user?.user_metadata?.phone_verified ? 'Verified' : 'Not Verified'}</p>
                                    }
                                </div>
                                {
                                    user?.user_metadata?.phone_verified ?
                                        <Button
                                            endContent={<Icon icon="solar:pen-2-linear"/>}
                                            radius="full"
                                            variant="bordered"
                                            onClick={() => setPhoneAction({
                                                ...phoneAction,
                                                change: !phoneAction.change
                                            })}
                                        >
                                            Change
                                        </Button> :
                                        <Button
                                            endContent={<Icon icon="solar:pen-2-linear"/>}
                                            radius="full"
                                            variant="flat"
                                            onClick={() => setPhoneAction({
                                                ...phoneAction,
                                                verify: !phoneAction.verify
                                            })}
                                        >
                                            Verify
                                        </Button>
                                }
                            </div>
                        </CellWrapper>
                    </motion.div>

                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: 1}}
                        transition={{duration: 1.2}}>
                        {/* Password */}
                        <CellWrapper>
                            <div>
                                <p>Password</p>
                                <p className="text-small text-default-500">
                                    Set a unique password to protect your account.
                                </p>
                            </div>
                            <Button
                                endContent={<Icon icon="solar:pen-2-linear"/>}
                                radius="full"
                                variant="bordered"
                                onClick={() => setPasswordAction(!passwordAction)}
                            >
                                Change
                            </Button>
                        </CellWrapper>
                    </motion.div>

                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: 1}}
                        transition={{duration: 1.2}}>
                        {/* Two-Factor Authentication */}
                        <SwitchCell
                            defaultSelected
                            description="Add an extra layer of security to your account."
                            label="Two-Factor Authentication"
                        />
                    </motion.div>

                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: 1}}
                        transition={{duration: 1.2}}>
                        {/* Password Reset Protection */}
                        <SwitchCell
                            description="Require additional information to reset your password."
                            label="Password Reset Protection"
                        />
                    </motion.div>

                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: 1}}
                        transition={{duration: 1.2}}>
                        {/* Require Pin */}
                        <SwitchCell
                            defaultSelected
                            description="Require a pin to access your account."
                            label="Require Pin"
                        />
                    </motion.div>

                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: 1}}
                        transition={{duration: 1.2}}>
                        {/* Deactivate Account */}
                        <CellWrapper>
                            <div>
                                <p>Deactivate Account</p>
                                <p className="text-small text-default-500">
                                    Deactivate your account and delete all your data.
                                </p>
                            </div>
                            <Button radius="full" variant="bordered">
                                Deactivate
                            </Button>
                        </CellWrapper>
                    </motion.div>

                    <motion.div
                        initial={{scale: 1}}
                        animate={{scale: 1}}
                        transition={{duration: 1.2}}>
                        {/* Delete Account */}
                        <CellWrapper>
                            <div>
                                <p>Delete Account</p>
                                <p className="text-small text-default-500">
                                    Delete your account and all your data.
                                </p>
                            </div>
                            <Button color="danger" radius="full" variant="flat">
                                Delete
                            </Button>
                        </CellWrapper>
                    </motion.div>
                </CardBody>
            </Card>

            {/* Email Modal */}
            <ChangeEmailModal toast={toast} emailAction={emailAction} setEmailAction={setEmailAction}/>

            {/* Phone Modal */}
            <VerifyPhoneModal toast={toast} phoneAction={phoneAction} setPhoneAction={setPhoneAction}/>

            {/* Password Modal */}
            <ChangePasswordModal toast={toast} passwordAction={passwordAction} setPasswordAction={setPasswordAction}/>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"/>
        </>
    )
}
