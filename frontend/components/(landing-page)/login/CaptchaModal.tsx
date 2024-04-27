
import React, { useCallback, useEffect, useRef } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button"
import HCaptcha from '@hcaptcha/react-hcaptcha'

type ModalProps = {
  isOpen: boolean;
  onOpen?: () => void;
  onOpenChange: (open: boolean) => void
  onClose: () => void
  formRef: React.MutableRefObject<HTMLFormElement | null>
  captchaInputRef: React.MutableRefObject<HTMLInputElement | null>
};

export default function PasswordLessLoginModal({
  isOpen,
  onOpenChange,
  onClose,
  formRef,
  captchaInputRef
}: ModalProps) {

  const captchaRef = useRef<HCaptcha | undefined>()

  const onVerify = useCallback((token: string) => {
    if (formRef.current && captchaRef.current && captchaInputRef.current) {
      captchaInputRef.current.value = token 
      formRef.current?.requestSubmit()
      setTimeout(onClose, 1000)
    }
  }, [captchaInputRef, formRef, captchaRef, onClose])


  useEffect(() => {
    if (isOpen) {
      captchaRef.current?.resetCaptcha()
    }
  }, [isOpen])


  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose: () => void) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">Are you human ?</ModalHeader>
              <ModalBody className="flex flex-row justify-center">
                <HCaptcha
                  ref={captchaRef as any}
                  onVerify={onVerify}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                  theme={"dark"}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
