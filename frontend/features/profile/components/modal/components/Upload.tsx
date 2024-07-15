'use client'

import React from 'react';
import {Button, ButtonGroup, Card, CardBody, Image} from "@nextui-org/react";
import ImageUploading, {ImageListType} from "react-images-uploading";
import {toast, ToastContainer} from "react-toastify";

export default function Upload(props: any) {
    const [images, setImages] = React.useState([]);
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

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // todo store in supabase bucket
        setImages(imageList as never[]);
        console.log(imageList, addUpdateIndex);
    };

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
                      onImageRemove,
                      isDragging,
                      dragProps
                  }) => (
                    // write your building UI
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
                                <Image
                                    alt="NextUI hero Image with delay"
                                    src={image.dataURL}
                                />
                                <div className="image-item__btn-wrapper">
                                    <ButtonGroup className="mt-4" fullWidth={true}>
                                        <Button variant="flat" color="primary" onClick={() => onImageUpdate(index)}>Change Iamge</Button>
                                        <Button variant="flat" color="danger" onClick={() => onImageRemove(index)}>Remove</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"/>
        </>
    )
}
