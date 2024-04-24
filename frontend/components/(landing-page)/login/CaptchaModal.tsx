import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button"
import HCaptcha from '@hcaptcha/react-hcaptcha'

type ModalProps = {
  isOpen: boolean;
  onOpen?: () => void;
  onOpenChange: (open: boolean) => void
  formRef: React.MutableRefObject<HTMLFormElement | null>
};

export default function PasswordLessLoginModal({
  isOpen,
  onOpenChange,
  formRef,
}: ModalProps) {

  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha | undefined>()

  useEffect(() => {
    if (captchaToken && formRef.current && captchaRef.current) {
      captchaRef.current.resetCaptcha()
      formRef.current?.submit()
    }
  }, [captchaToken, formRef, captchaRef])

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
                  onVerify={(token) => {
                    setCaptchaToken(token)
                  }}
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
