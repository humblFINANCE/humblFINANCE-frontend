import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import RenderIf from '@/components/RenderIf'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from '@nextui-org/react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { SubmitButton } from '@/features/shared/SubmitButton'
import { forgotPassword } from '../actions'

type ModalProps = {
  isOpen: boolean
  onOpen?: () => void
  onOpenChange: (open: boolean) => void
}

export function ForgotPasswordModal({ isOpen, onOpenChange }: ModalProps) {
  const [captchaToken, setCaptchaToken] = useState('')
  const [state, formAction] = useFormState(forgotPassword, {
    status: '',
    msg: '',
  })
  const submited = Boolean(state.status)

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose: () => void) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">
                Forgot Passowrd
              </ModalHeader>
              <ModalBody className="flex justify-center items-center">
                <RenderIf condition={submited}>
                  <RenderIf condition={state.status === 'success'}>
                    <span className="text-success">{state.msg}</span>
                  </RenderIf>
                  <RenderIf condition={state.status !== 'success'}>
                    <span className="text-danger">{state.msg} </span>
                  </RenderIf>
                </RenderIf>
                <RenderIf condition={!Boolean(state.status)}>
                  <Input
                    name="email"
                    type="email"
                    placeholder="youremail@example.com"
                  />
                  <input
                    name="captchaToken"
                    type="hidden"
                    value={captchaToken}
                  />
                  <RenderIf condition={!submited || state.status == 'failed'}>
                    <HCaptcha
                      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                      onVerify={setCaptchaToken}
                      theme={'dark'}
                    />
                  </RenderIf>
                </RenderIf>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <RenderIf condition={!submited}>
                  <SubmitButton color="primary" type="submit">
                    Send
                  </SubmitButton>
                </RenderIf>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
