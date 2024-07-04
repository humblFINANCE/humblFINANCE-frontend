'use client'
import LogoutModalButton from '@/components/(landing-page)/logout/LogoutModalButton'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'

import { UseDisclosureReturn } from '@nextui-org/use-disclosure'

export default function LogoutModal(props: UseDisclosureReturn) {
  const { isOpen, onOpenChange } = props
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Powering Down...
              </ModalHeader>
              <ModalBody>
                <h1>You are about to log out.</h1>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <LogoutModalButton onClose={onClose} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
