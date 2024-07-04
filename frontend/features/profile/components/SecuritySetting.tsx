'use client'

import type {CardProps} from '@nextui-org/react'

import React from 'react'
import {Card, CardHeader, CardBody, Button} from '@nextui-org/react'
import {Icon} from '@iconify/react'

import {SwitchCell} from '@/components/shared/SwitchCell'
import {cn} from '@/utils/nextui/cn'

import {motion} from "framer-motion";

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
    return (
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
                        <div className="flex w-full flex-wrap items-center justify-end gap-6 sm:w-auto sm:flex-nowrap">
                            <div className="flex flex-col items-end mr-2">
                                <p>john.doe@mail.com</p>
                                <p className="text-small text-success">Verified</p>
                            </div>
                            <Button
                                endContent={<Icon icon="solar:pen-2-linear"/>}
                                radius="full"
                                variant="bordered"
                            >
                                Edit
                            </Button>
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
                        <Button radius="full" variant="bordered">
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
    )
}
