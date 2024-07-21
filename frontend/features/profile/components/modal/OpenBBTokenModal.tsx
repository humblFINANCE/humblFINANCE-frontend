'use client'

import React, {useEffect, useState} from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Switch,
    Tooltip,
    Textarea
} from '@nextui-org/react'
import {useUser} from "@/features/user/hooks/use-user";
import {useUpdateProfile} from "@/features/profile/hooks/use-update-profile";

interface OpenBBTokenModalProps {
    openBBAction?: any
    setOpenBBAction?: any
    toast?: any
}

export function OpenBBTokenModal(props: OpenBBTokenModalProps) {
    const {profile, refetchProfile}: any = useUser()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [token, setToken] = useState<string>("")
    const [tokenActivated, setTokenActivated] = useState<boolean>(false)
    const [tokenIsValid, setTokenIsValid] = useState<boolean>(false)
    const {updateProfile} = useUpdateProfile()

    const handleValidateTokenAction = async () => {
        setIsLoading(true)

        if (token.length < 179) {
            setTimeout(() => {
                props.toast.error("Token length must be 180 character's")
                setIsLoading(false)
            }, 1500)
        } else if (token.split('.')?.length !== 3) {
            setTimeout(() => {
                props.toast.error("Token is not valid")
                setTokenIsValid(true)
                setIsLoading(false)
            }, 1500)
        } else {
            setTimeout(() => {
                props.toast.success("Token is is valid")
                setTokenIsValid(true)
                setIsLoading(false)
            }, 1500)
        }
    }

    const handleStoreTokenAction = async () => {
        setIsLoading(true)

        let res: any = await updateProfile(profile?.id, {
            openbb_token: token ? token : profile?.openbb_token,
            openbb_token_status: tokenActivated
        });

        if (res?.id) {
            refetchProfile(profile?.id);  // fetch new profile data

            setTimeout(() => {
                props.toast.success("All Changes Saved !")
                setTokenIsValid(true)
                setIsLoading(false)
            }, 1500)
        }
    }

    const handleCloseModal = () => {
        setToken("")
        setTokenIsValid(false)
        props.setOpenBBAction(!props.openBBAction)
    }

    useEffect(() => {
        if (profile?.openbb_token && profile?.openbb_token_status || profile?.openbb_token && !profile?.openbb_token_status) {
            setTokenIsValid(true)
            setToken(profile?.openbb_token)
            setTokenActivated(profile?.openbb_token_status)
        }

    }, [profile?.openbb_token, profile?.openbb_token_status])
    return (
        <Modal
            backdrop={"blur"}
            isOpen={props.openBBAction}
            onOpenChange={handleCloseModal}
            isDismissable={false}
            isKeyboardDismissDisabled={false}>
            <ModalContent
                className="flex w-full min-w-[340px] flex-col gap-4 rounded-large bg-content1 px-6 pb-6 pt-6 shadow-small">
                <ModalHeader className="p-0">Configure OpenBB PAT</ModalHeader>
                <ModalBody>
                    <Textarea
                        label="Personal Access Token"
                        labelPlacement="outside"
                        placeholder="Enter token"
                        minRows={5}
                        defaultValue={profile?.openbb_token ? profile?.openbb_token : token}
                        onInput={(e: any) => setToken(e?.target?.value)}
                        isDisabled={isLoading}
                        endContent={
                            <Button size="sm" color="primary" isLoading={isLoading} variant="flat" className="p-3"
                                    onClick={() => handleValidateTokenAction()}>
                                Validate
                            </Button>
                        }
                    />

                    <Tooltip
                        content={
                            <div className="px-1 py-2">
                                <div className="text-small">
                                    Token validation required during this changes
                                </div>
                            </div>
                        }
                        placement="left"
                    >
                        <div className="cursor-pointer text-default-500 left pt-2">
                            <Switch isDisabled={!tokenIsValid && !profile?.openbb_token}
                                    defaultSelected={profile?.openbb_token_status ? profile?.openbb_token_status : tokenActivated}
                                    onValueChange={setTokenActivated}>
                                Active?
                            </Switch>
                        </div>
                    </Tooltip>
                </ModalBody>
                <ModalFooter>
                    <Button size="md" color="success" isDisabled={!tokenIsValid && !profile?.openbb_token}
                            isLoading={isLoading} variant="flat"
                            className="p-3"
                            onClick={() => handleStoreTokenAction()}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
