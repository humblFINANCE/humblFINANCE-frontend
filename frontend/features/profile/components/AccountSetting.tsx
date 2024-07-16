'use client'

import type {CardProps} from '@nextui-org/react'

import React, {useEffect} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Avatar,
    Badge,
    Input,
    Autocomplete,
    AutocompleteItem,
    CardFooter,
} from '@nextui-org/react'
import {Icon} from '@iconify/react'
import {countries} from '@/features/profile/constants'
import {useUser} from '@/features/user/hooks/use-user'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import {ContentWrapperLoading} from '@/components/shared/ContentWrapperLoading'
import {useUpdateProfile} from '../hooks/use-update-profile'
import {SubmitButton} from '@/components/shared/SubmitButton'
import RenderIf from '@/components/RenderIf'
import UploadAvatarModal from "@/features/profile/components/modal/UploadAvatarModal";
import {toast, ToastContainer} from 'react-toastify';
import {useTheme} from "next-themes";

export function AccountSetting(props: CardProps) {
    const {user, profile, isProfileLoaded, refetchProfile} = useUser()
    const {updateProfile, error, isLoading} = useUpdateProfile()
    const [avatarModal, setAvatarModal] = React.useState(false);
    const {theme} = useTheme()

    const schema = z.object({
        avatar_url: z.string().optional().nullable(),
        username: z.string().optional().nullable(),
        email: z.string().email().optional(),
        first_name: z.string(),
        last_name: z.string().optional().nullable(),
        // phone: z.string().optional().nullable(),
        country: z.string().optional().nullable(),
        state: z.string().optional().nullable(),
        address: z.string().optional().nullable(),
        zip_code: z
            .string()
            .optional()
            .nullable()
            .transform((v) => (v ? parseInt(v) : null)),
    })

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,

        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    })

    const onSave = handleSubmit((data) => {
        async function save() {
            let res: any = await updateProfile(user.id, data)
            if (res?.id) {
                refetchProfile(user.id);  // fetch new profile data
                toast.success("All Changes Saved !");
            }
        }

        save()
    })

    const fullname = ''.concat(
        getValues('first_name') ?? '',
        ' ',
        getValues('last_name') ?? ''
    )

    useEffect(() => {
        if (profile && isProfileLoaded) {
            reset(profile)
        }
    }, [profile, isProfileLoaded, reset])

    return (
        <>
            <ContentWrapperLoading isLoading={!isProfileLoaded || !Boolean(profile)}>
                <Card className="max-w-xl p-2" {...props}>
                    <form onSubmit={handleSubmit((e) => console.log(e))}>
                        <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
                            <p className="text-large">{fullname}</p>
                            <div className="flex gap-4 py-4">
                                <Badge
                                    classNames={{
                                        badge: 'w-5 h-5',
                                    }}
                                    color="primary"
                                    content={
                                        <Button
                                            onClick={() => setAvatarModal(!avatarModal)}
                                            isIconOnly
                                            className="p-0 text-primary-foreground"
                                            radius="full"
                                            size="sm"
                                            variant="light"
                                        >
                                            <Icon icon="solar:pen-2-linear"/>
                                        </Button>
                                    }
                                    placement="bottom-right"
                                    shape="circle"
                                >
                                    <Avatar className="h-14 w-14" src={getValues('avatar_url')}/>
                                </Badge>
                                <div className="flex flex-col items-start justify-center">
                                    <p className="font-medium">{fullname}</p>
                                    <span className="text-small text-default-500">
                  Professional Designer
                </span>
                                </div>
                            </div>
                            <p className="text-small text-default-400">
                                The photo will be used for your profile, and will be visible to
                                other users of the platform.
                            </p>
                        </CardHeader>
                        <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Username */}
                            <Input
                                label="Username"
                                labelPlacement="outside"
                                placeholder="Enter username"
                                {...register('username')}
                            />
                            {/* Email */}
                            <Input
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Enter email"
                                {...register('email')}
                                isDisabled={user.app_metadata.provider === 'google'}
                                endContent={
                                    <>
                                        <RenderIf condition={Boolean(user.user_metadata.email_verified)}>
              <span className="text-success">
                Verified
              </span>
                                        </RenderIf><RenderIf condition={Boolean(!user.user_metadata.email_verified)}>
              <span className="text-warning">
                Email not verified
              </span>
                                    </RenderIf>
                                    </>
                                }
                            />
                            {/* First Name */}
                            <Input
                                label="First Name"
                                labelPlacement="outside"
                                placeholder="Enter first name"
                                {...register('first_name')}
                            />
                            {/* Last Name */}
                            <Input
                                label="Last Name"
                                labelPlacement="outside"
                                placeholder="Enter last name"
                                {...register('last_name')}
                            />
                            <RenderIf condition={Boolean(errors?.last_name)}>
              <span className="text-danger">
                {errors?.last_name?.message as string}
              </span>
                            </RenderIf>
                            {/* Phone Number */}
                            <Input
                                label="Phone Number"
                                labelPlacement="outside"
                                placeholder="Enter phone number"
                                disabled={false}
                            />
                            <RenderIf condition={Boolean(errors?.phone)}>
              <span className="text-danger">
                {errors?.phone?.message as string}
              </span>
                            </RenderIf>

                            {/* Country */}
                            <Autocomplete
                                defaultItems={countries}
                                label="Country"
                                labelPlacement="outside"
                                placeholder="Select country"
                                showScrollIndicators={false}
                                onInputChange={(value) => setValue('country', value)}
                            >
                                {(item) => (
                                    <AutocompleteItem
                                        key={item.code}
                                        startContent={
                                            <Avatar
                                                alt="Country Flag"
                                                className="h-6 w-6"
                                                src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                                            />
                                        }
                                        value={item.code}
                                    >
                                        {item.name}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                            <RenderIf condition={Boolean(errors?.country)}>
              <span className="text-danger">
                {errors?.country?.message as string}
              </span>
                            </RenderIf>

                            {/* State */}
                            <Input
                                label="State"
                                labelPlacement="outside"
                                placeholder="Enter state"
                                {...register('state')}
                            />
                            <RenderIf condition={Boolean(errors?.state)}>
              <span className="text-danger">
                {errors?.state?.message as string}
              </span>
                            </RenderIf>
                            {/* Address */}
                            <Input
                                label="Address"
                                labelPlacement="outside"
                                placeholder="Enter address"
                                {...register('address')}
                            />
                            <RenderIf condition={Boolean(errors?.address)}>
              <span className="text-danger">
                {errors?.address?.message as string}
              </span>
                            </RenderIf>
                            {/* Zip Code */}
                            <Input
                                label="Zip Code"
                                labelPlacement="outside"
                                placeholder="Enter zip code"
                                {...register('zip_code')}
                                type="number"
                            />
                            <RenderIf condition={Boolean(errors?.zip_code)}>
              <span className="text-danger">
                {errors?.zip_code?.message as string}
              </span>
                            </RenderIf>
                        </CardBody>

                        <CardFooter className="mt-4 justify-end gap-2">
                            <Button radius="full" variant="bordered">
                                Cancel
                            </Button>
                            <SubmitButton
                                onClick={onSave}
                                isLoading={isLoading}
                                color="primary"
                                radius="full"
                            >
                                Save Changes
                            </SubmitButton>
                        </CardFooter>
                    </form>
                    <RenderIf condition={Boolean(error)}>
                        <span className="text-danger">{error}</span>
                    </RenderIf>
                </Card>
            </ContentWrapperLoading>

            {/*  Modals Components  */}
            <UploadAvatarModal isOpen={avatarModal} onOpenChange={setAvatarModal}/>



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
                theme={theme === "dark" ? "dark" : "light"}/>
        </>
    )
}
