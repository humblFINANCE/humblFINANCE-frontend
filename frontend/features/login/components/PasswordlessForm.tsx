import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { createClient, isAnonymouseUserClient } from '@/utils/supabase/client'
import { Icon } from '@iconify/react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/shared/SubmitButton'
import RenderIf from '@/components/RenderIf'

export function PasswordlessLoginForm() {
  const passwordLessModal = useDisclosure()
  const buttonClasses = 'bg-foreground/10 dark:bg-foreground/20'

  const [passwordLessModalType, setPasswordLessModalType] = React.useState<
    'magicLink' | 'phoneNumber'
  >('magicLink')

  const handleLoginPasswordLess = async (
    type: 'magicLink' | 'phoneNumber',
    value: string,
    captchaToken: string
  ) => {
    const supabase = createClient()
    const target = type === 'magicLink' ? { email: value } : { phone: value }

    if (await isAnonymouseUserClient()) {
      await supabase.auth.updateUser({
        ...target,
      })

      return redirect('/dashboard/home')
    }

    const { error } = await supabase.auth.signInWithOtp({
      ...target,
      options: {
        emailRedirectTo: window.origin + '/auth/callback/social-login',
        shouldCreateUser: true,
        captchaToken,
      },
    })

    if (error) {
      throw new Error(error?.message)
    }
  }

  const handleOpenPasswordLessModal = (type: 'magicLink' | 'phoneNumber') => {
    return function () {
      setPasswordLessModalType(type)
      passwordLessModal.onOpen()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleOpenPasswordLessModal('magicLink')}
        className={buttonClasses}
        startContent={<Icon icon="mdi:email-lock-outline" width={24} />}
      >
        Continue with E-Mail
      </Button>
      <Button
        type="submit"
        onClick={handleOpenPasswordLessModal('phoneNumber')}
        className={buttonClasses}
        startContent={<Icon icon="fluent:phone-lock-24-regular" width={24} />}
      >
        Continue with Phone
      </Button>
      <PasswordLessLoginModal
        onSignIn={handleLoginPasswordLess}
        type={passwordLessModalType}
        onOpenChange={passwordLessModal.onOpenChange}
        isOpen={passwordLessModal.isOpen}
      />
    </div>
  )
}

type ModalProps = {
  isOpen: boolean
  onOpen?: () => void
  onOpenChange: (open: boolean) => void
  onSignIn: (
    type: 'magicLink' | 'phoneNumber',
    input: string,
    captchaToken: string
  ) => Promise<void>
  type: 'magicLink' | 'phoneNumber'
}

export function PasswordLessLoginModal({
  isOpen,
  onOpenChange,
  onSignIn,
  type,
}: ModalProps) {
  const [value, setValue] = useState<null | string>()
  const [captchaToken, setCaptchaToken] = useState('')
  const [result, setResult] = useState({
    error: '',
    submitted: false,
  })
  const [isLoading, setLoading] = useState(false)
  const captchaInputRef = useRef<any>(null)
  const inputProps =
    type === 'magicLink'
      ? {
          label: 'Email',
          placeHolder: 'Enter your email',
        }
      : {
          label: 'Phone Number',
          placeHolder: 'Enter your phone number',
        }

  useEffect(() => {
    if (!isOpen) {
      setResult({
        error: '',
        submitted: false,
      })
    }
  }, [isOpen])
  const handleSignIn = async () => {
    setLoading(true)
    try {
      await onSignIn(type, value as string, captchaToken)
      setResult({
        submitted: true,
        error: '',
      })
    } catch (e: any) {
      setResult({
        submitted: true,
        error: e.message,
      })
    }

    captchaInputRef.current?.resetCaptcha()
    setLoading(false)
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose: () => void) => (
            <form onSubmit={(e) => e.preventDefault()}>
              <ModalHeader className="flex flex-col gap-1">
                Continue with {type === 'magicLink' ? 'Magic Link' : 'Phone'}
              </ModalHeader>
              <ModalBody className="flex items-center">
                <Input
                  name="input"
                  autoFocus
                  variant="bordered"
                  isRequired={true}
                  onChange={(e) => setValue(e.target.value)}
                  value={value as string}
                  {...inputProps}
                />
                {Boolean(result.error) && (
                  <div className="text-danger">{result.error}</div>
                )}
                {result.submitted && !Boolean(result.error) && (
                  <div className="text-success">
                    Check your {type === 'magicLink' ? 'email' : 'phone'}
                  </div>
                )}
                <RenderIf
                  condition={Boolean(!result.submitted || result.error)}
                >
                  <HCaptcha
                    ref={captchaInputRef}
                    onVerify={(token) => setCaptchaToken(token)}
                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                    theme={'dark'}
                  />
                </RenderIf>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  disabled={isLoading}
                  onPress={onClose}
                >
                  Close
                </Button>
                <SubmitButton
                  color="primary"
                  disabled={isLoading}
                  onClick={handleSignIn}
                  type="submit"
                  isLoading={isLoading}
                >
                  Sign in
                </SubmitButton>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
