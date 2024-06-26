'use client'
import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { LoginForm } from './LoginForm'
export function LoginModal(props: ReturnType<typeof useDisclosure>) {
  const { onOpenChange, isOpen } = props
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <ModalHeader className="p-0">Login</ModalHeader>
        <LoginForm />
      </ModalContent>
    </Modal>
  )
}
