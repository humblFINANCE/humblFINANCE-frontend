'use client'
import React, { useEffect, useRef } from 'react'
import { Button, useDisclosure, Divider, Input } from '@nextui-org/react'

import RenderIf from '@/features/shared/RenderIf'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion'
import { Icon } from '@iconify/react'
import { SocialLoginForm } from '@/features/auth/components/SocialLoginForm'
import NewUserTooltip from '@/features/auth/components/NewUserTooltip'
import { signInAnonymously } from '@/features/auth/actions/signIn-anonymously'
import { CaptchaModal } from '@/features/auth/components/CaptchaModal'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { PasswordlessLoginForm } from '@/features/auth/components/PasswordlessForm'
import { useFormState } from 'react-dom'
import { useSignInState } from '@/features/auth/hooks/use-signIn-state'
import { cn } from '@/utils/cn'
import { SubmitButton } from '@/features/shared/SubmitButton'
import { ForgotPasswordModal } from './ForgotPasswordModal'
import Link from 'next/link'

interface LoginFormProps extends React.HTMLProps<HTMLDivElement> {
  linkAccount?: boolean
  onClose?: () => void
}

export function LoginForm({
  className,
  linkAccount = false,
  ...rest
}: LoginFormProps) {
  const [isFormVisible, setIsFormVisible] = React.useState(false)
  const [captchaToken, setCaptchaToken] = React.useState('')
  const captchaModal = useDisclosure()
  const forgotPasswordModal = useDisclosure()

  const anonymouseLoginFormRef = useRef(null)
  const captchaInputRef = useRef(null)
  const signInWithEmailCaptchaRef = useRef(null)

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  }

  const [signInAnonymError, signInAnonymAction] = useFormState(
    signInAnonymously,
    ''
  )

  const { signInWithEmailState, signInAction } = useSignInState({
    captchaToken,
    error: '',
  })

  useEffect(() => {
    if (signInWithEmailState?.error === undefined) {
      if (rest.onClose) rest.onClose?.()
    }
    if (signInWithEmailState?.captchaToken === captchaToken) {
      if (signInWithEmailCaptchaRef) {
        ;(signInWithEmailCaptchaRef as any).current?.resetCaptcha()
      }
    }
  }, [signInWithEmailState, captchaToken, signInWithEmailCaptchaRef, rest])

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  )

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 ',
        className
      )}
      {...rest}
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} mode="popLayout">
          {isFormVisible ? (
            <m.form
              animate="visible"
              className="flex flex-col gap-3 w-[303px]"
              exit="hidden"
              initial="hidden"
              variants={variants}
              action={signInAction}
            >
              <Input
                autoFocus
                isRequired
                label="Email Address"
                name="email"
                type="email"
                variant="bordered"
                required
              />
              <Input
                isRequired
                label="Password"
                name="password"
                type="password"
                variant="bordered"
                required
              />
              <input type="hidden" name="captchaToken" value={captchaToken} />
              <HCaptcha
                id="hcaptcha-comp"
                onVerify={(token) => setCaptchaToken(token)}
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                size="normal"
                theme={'dark'}
                ref={signInWithEmailCaptchaRef}
              />
              <SubmitButton color="primary" type="submit">
                Login
              </SubmitButton>
              <RenderIf condition={Boolean(signInWithEmailState?.error)}>
                <span className="text-danger">
                  {signInWithEmailState?.error}
                </span>
              </RenderIf>
              <Link
                onClick={forgotPasswordModal.onOpenChange}
                className="cursor-pointer text-foreground/50 hover:text-foreground/100 text-center"
                href="#"
              >
                Forgot Password?
              </Link>{' '}
              {orDivider}
              <Button
                fullWidth
                startContent={
                  <Icon
                    className="text-default-500"
                    icon="solar:arrow-left-linear"
                    width={18}
                  />
                }
                variant="flat"
                onPress={() => setIsFormVisible(false)}
              >
                Other Login options
              </Button>
            </m.form>
          ) : (
            <>
              <RenderIf condition={!linkAccount}>
                <form action={signInAnonymAction} ref={anonymouseLoginFormRef}>
                  <input
                    ref={captchaInputRef}
                    type="hidden"
                    name="capchaToken"
                  />
                  <Button
                    fullWidth
                    color="primary"
                    startContent={
                      <Icon
                        className="pointer-events-none text-2xl"
                        icon="majesticons:eye-off"
                      />
                    }
                    onClick={captchaModal.onOpenChange}
                  >
                    Continue Anonymously
                  </Button>
                  <RenderIf condition={Boolean(signInAnonymError)}>
                    <span className="text-danger">{signInAnonymError}</span>
                  </RenderIf>
                </form>
                {orDivider}
              </RenderIf>
              <Button
                fullWidth
                color="primary"
                startContent={
                  <Icon
                    className="pointer-events-none text-2xl"
                    icon="solar:letter-bold"
                  />
                }
                type="button"
                id="continue-with-email"
                onPress={() => setIsFormVisible(true)}
              >
                Continue with Email
              </Button>
              {orDivider}
              <m.div
                animate="visible"
                className="flex flex-col gap-y-2"
                exit="hidden"
                initial="hidden"
                variants={variants}
              >
                <SocialLoginForm />
                <div className="flex items-center gap-4 py-2">
                  <Divider className="flex-1" />
                  <p className="shrink-0 text-tiny text-default-500">
                    PASSWORDLESS
                  </p>
                  <Divider className="flex-1" />
                </div>
                <PasswordlessLoginForm />
              </m.div>
              <CaptchaModal
                {...captchaModal}
                captchaInputRef={captchaInputRef}
                formRef={anonymouseLoginFormRef}
              />
            </>
          )}
        </AnimatePresence>
      </LazyMotion>
      <RenderIf condition={!isFormVisible}>
        <NewUserTooltip />
      </RenderIf>
      <ForgotPasswordModal {...forgotPasswordModal} />
    </div>
  )
}
