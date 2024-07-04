import RenderIf from '@/components/RenderIf'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

type ModalProps = {
  isOpen: boolean
  onOpen?: () => void
  onOpenChange: (open: boolean) => void
  action: <State, Payload>(prevState: Awaited<State>, data: Payload) => State
}

export default function ForgotPassword({
  isOpen,
  onOpenChange,
  action,
}: ModalProps) {
  const [captchaToken, setCaptchaToken] = useState('')
  const [state, formAction] = useFormState(action, { status: '', msg: '' })
  const submited = Boolean(state.status)

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose: () => void) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">
                Reset Password
              </ModalHeader>
              <ModalBody>
                <RenderIf condition={submited}>
                  <RenderIf condition={state.status === 'success'}>
                    <span className="text-lime-500">{state.msg}</span>
                  </RenderIf>
                  <RenderIf condition={state.status !== 'success'}>
                    <span className="text-danger-500">{state.msg} </span>
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
                  <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                    onVerify={setCaptchaToken}
                    theme={'dark'}
                  />
                </RenderIf>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <RenderIf condition={!submited}>
                  <Submit />
                </RenderIf>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button
      color="primary"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? 'Loading...' : 'Submit'}
    </Button>
  )
}
