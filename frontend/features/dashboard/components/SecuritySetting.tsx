'use client'

import type {CardProps} from '@nextui-org/react'

import React from 'react'
import {Card, CardHeader, CardBody, Button} from '@nextui-org/react'
import {Icon} from '@iconify/react'

import {SwitchCell} from '@/components/shared/SwitchCell'
import {cn} from '@/utils/nextui/cn'
import {useUser} from "@/features/user/hooks/use-user";
import {DeleteAccountModal} from "@/features/profile/components/modal/DeleteAccountModal";
import {toast, ToastContainer} from 'react-toastify';
import {useTheme} from "next-themes";

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

export function SecuritySetting(props: CardProps) {
    const [deleteAccount, setDeleteAccount] = React.useState(false);
    const {user, profile} = useUser()
    const {theme} = useTheme()

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
                    {/* Email */}
                    <CellWrapper>
                        <div>
                            <p>Email Address</p>
                            <p className="text-small text-default-500">
                                The email address associated with your account.
                            </p>
                        </div>
                        <div className="flex w-full flex-wrap items-center justify-end gap-6 sm:w-auto sm:flex-nowrap">
                            <div className="flex mr-2 flex-col items-end">
                                <p>{profile?.email}</p>
                                <p className="text-small text-success">Verified</p>
                            </div>
                            {
                                user.app_metadata.provider === 'google' ?
                                    <Button
                                        endContent={<Icon icon="flat-color-icons:google" width={24}/>}
                                        radius="full"
                                        variant="bordered"
                                        isDisabled
                                    >
                                        Linked with
                                    </Button> :
                                    <Button
                                        endContent={<Icon icon="solar:pen-2-linear"/>}
                                        radius="full"
                                        variant="bordered"
                                    >
                                        Edit
                                    </Button>
                            }
                        </div>
                    </CellWrapper>
                    {
                        user.app_metadata.provider === 'google' ? null :
                            <CellWrapper>
                                <div>
                                    <p>Password</p>
                                    <p className="text-small text-default-500">
                                        Set a unique password to protect your account.
                                    </p>
                                </div>
                                <Button radius="full" variant="bordered">
                                    Change
                                </Button>
                            </CellWrapper>
                    }
                    {/* Two-Factor Authentication */}
                    <SwitchCell
                        defaultSelected
                        description="Add an extra layer of security to your account."
                        label="Two-Factor Authentication"
                    />
                    {/* Password Reset Protection */}
                    <SwitchCell
                        description="Require additional information to reset your password."
                        label="Password Reset Protection"
                    />
                    {/* Require Pin */}
                    <SwitchCell
                        defaultSelected
                        description="Require a pin to access your account."
                        label="Require Pin"
                    />
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
                    {/* Delete Account */}
                    <CellWrapper>
                        <div>
                            <p>Delete Account</p>
                            <p className="text-small text-default-500">
                                Delete your account and all your data.
                            </p>
                        </div>
                        <Button color="danger" radius="full" variant="flat"
                                onClick={() => setDeleteAccount(!deleteAccount)}>
                            Delete
                        </Button>
                    </CellWrapper>
                </CardBody>
            </Card>

            {/* Phone Modal */}
            <DeleteAccountModal toast={toast} deleteAction={deleteAccount} setDeleteAction={setDeleteAccount}/>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
                theme={theme === "dark" ? "dark" : "light"}/>
        </>
    )
}