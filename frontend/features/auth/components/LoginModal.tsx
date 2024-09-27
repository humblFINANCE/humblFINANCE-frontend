'use client'

import React from 'react'
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'
import { UseDisclosureReturn } from '@nextui-org/use-disclosure'
import { LoginForm } from '@/features/auth/components/LoginForm'

interface LoginModalProps extends UseDisclosureReturn {
  linkAccount?: boolean
}

export function LoginModal(props: LoginModalProps) {
  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent className="flex w-full min-w-[340px] flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <ModalHeader className="p-0">Login</ModalHeader>
        <LoginForm linkAccount={props.linkAccount} onClose={props.onClose} />
      </ModalContent>
    </Modal>
  )
}
