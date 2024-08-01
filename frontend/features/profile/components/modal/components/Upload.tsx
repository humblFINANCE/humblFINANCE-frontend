'use client'

import React from 'react';
import {Button, Card, CardBody, Image, Progress} from "@nextui-org/react";
import ImageUploading, {ImageListType} from "react-images-uploading";
import {toast} from "react-toastify";
import {useUser} from "@/features/user/hooks/use-user";
import {useUpdateAvatar} from "@/features/profile/hooks/use-update-avatar";
import {useTheme} from "next-themes";

export default function Upload(props?: any) {
    const {user, profile, refetchProfile} = useUser()
    const {theme} = useTheme()
    const {updateProfileAvatar, isLoading} = useUpdateAvatar()
    const [images, setImages] = React.useState<any>([]);
    const [value, setValue] = React.useState<any>(0);
    const maxNumber = 69;

    const handleError = (param: any) => {
        if (param?.acceptType) {
            toast.error("Image Accepted is JPG, JPEG or PNG");
        } else if (param.maxFileSize) {
            toast.error("Image Size Max 15MB or 15728640 Bytes");
        } else {
            toast.success("Image Uploaded To Server");
        }
    }

    // console.log(user, profile)

    const onChange = async (imageList: ImageListType, addUpdateIndex?: number[] | undefined) => {
        setImages(imageList as never[]);  // set image to preview

        if (imageList?.length > 0) {
            const interval = setInterval((count: any) => {
                setValue((v: any) => (v >= count ? 0 : v + Math.floor(Math.random() * (50 - 25 + 1) + 25)));
            }, 1000);

            const file: any = imageList[0]
            const fileExt = file?.file?.name?.split('.').pop()
            // const filePath = `${profile?.first_name}-${profile?.id}/${new Date().toLocaleTimeString()}.${fileExt}`
            const filePath = `${profile?.first_name}-${profile?.id}/${new Date().toLocaleString()}.${fileExt}`
            let getPublicAvatarUrl: any = await updateProfileAvatar(user.id, {file: file?.file, filePath: filePath})

            if (!getPublicAvatarUrl) {
                toast.error("Image Upload Failed");
            } else {
                refetchProfile(user.id);  // fetch new profile data
                toast.success("Image Uploaded To Server");
                setValue(100);
                clearInterval(interval);
            }
        }
    };

    React.useEffect(() => {
        if (profile?.avatar_url) {
            setImages([{dataURL: profile.avatar_url}])
        }
    }, [profile?.avatar_url])

    return (
        <>
            <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                acceptType={['jpg', 'jpeg', 'png']}
                maxFileSize={15728640}  // 15 MB
                maxNumber={maxNumber}
                onError={handleError}
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageUpdate,
                      isDragging,
                      dragProps
                  }) => (
                    <div className="upload__image-wrapper">
                        {
                            imageList?.length < 1 ?
                                <Card>
                                    <CardBody className="p-6 text-center"
                                              style={isDragging ? {color: "red"} : undefined}
                                              onClick={onImageUpload}
                                              {...dragProps}>
                                        Click or Drop Image here
                                    </CardBody>
                                </Card> : null
                        }
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <div className="flex justify-center">
                                    <Image
                                        alt="NextUI hero Image with delay"
                                        src={image.dataURL}
                                    />
                                </div>
                                {
                                    isLoading ?
                                        <Progress
                                            aria-label="Uploading..."
                                            size="sm"
                                            value={value}
                                            color="primary"
                                            showValueLabel={true}
                                            className="max-w-full mt-4"
                                        /> : null
                                }
                                <div className="image-item__btn-wrapper">
                                    <Button
                                        className="mt-4"
                                        variant="flat"
                                        isLoading={isLoading}
                                        color="primary"
                                        fullWidth={true}
                                        onClick={() => onImageUpdate(index)}>
                                        {isLoading ? 'Uploading...' : 'Change Avatar'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </>
    )
}
