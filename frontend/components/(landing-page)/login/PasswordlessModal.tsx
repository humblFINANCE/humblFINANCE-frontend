import React from "react";
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

type ModalProps = {
	isOpen: boolean;
	onOpen?: () => void;
	onOpenChange: (open: boolean) => void
  type: "magicLink" | "phoneNumber"
};

export default function PasswordLessLoginModal({
  isOpen,
  onOpenChange,
  type,
}: ModalProps) {

  const inputProps = type === 'magicLink' ? ({
    label: "Email",
    placeHolder: "Enter your email"
  }) : ({
    label: "Phone Number",
    placeHolder: "Enter your phone number"
  })

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Continue with {type === "magicLink" ? "Magic Link" : "Phone"}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  variant="bordered"
                  {...inputProps}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => { console.log("continue") }}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

