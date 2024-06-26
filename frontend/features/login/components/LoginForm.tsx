'use client'
import React, { useEffect, useRef } from 'react'
import { Button, useDisclosure, Divider, Input } from '@nextui-org/react'

import RenderIf from '@/components/RenderIf'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion'
import { Icon } from '@iconify/react'
import { SocialLoginForm } from './SocialLoginForm'
import NewUserTooltip from './NewUserTooltip'
import { signInAnonymously } from '../actions/signIn-anonymously'
import { CaptchaModal } from './CaptchaModal'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { PasswordlessLoginForm } from './PasswordlessForm'
import { useFormState } from 'react-dom'
import { useSignInState } from '../hooks/use-signIn-state'
import { cn } from '@/utils/nextui/cn'

interface LoginFormProps extends React.HTMLProps<HTMLDivElement> {}

export function LoginForm({ className, ...rest }: LoginFormProps) {
  const [isFormVisible, setIsFormVisible] = React.useState(false)
  const [captchaToken, setCaptchaToken] = React.useState('')
  const captchaModal = useDisclosure()

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
    if (signInWithEmailState.captchaToken === captchaToken) {
      if (signInWithEmailCaptchaRef) {
        console.log('reset captcha')
        ;(signInWithEmailCaptchaRef as any).current?.resetCaptcha()
      }
    }
  }, [signInWithEmailState, captchaToken, signInWithEmailCaptchaRef])

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
        'flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 ',
        className
      )}
      {...rest}
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} mode="popLayout">
          {isFormVisible ? (
            <m.form
              animate="visible"
              className="flex flex-col gap-3"
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
              />
              <Input
                isRequired
                label="Password"
                name="password"
                type="password"
                variant="bordered"
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
              <Button color="primary" type="submit">
                Login
              </Button>
              <RenderIf condition={Boolean(signInWithEmailState.error)}>
                <span className="text-danger">
                  {signInWithEmailState.error}
                </span>
              </RenderIf>
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
              <form action={signInAnonymAction} ref={anonymouseLoginFormRef}>
                <input ref={captchaInputRef} type="hidden" name="capchaToken" />
                <Button
                  fullWidth
                  color="primary"
                  startContent={
                    <Icon
                      className="pointer-events-none text-2xl"
                      icon="majesticons:eye-off"
                    />
                  }
                  type="submit"
                  onClick={captchaModal.onOpenChange}
                >
                  Continue Anonymously
                </Button>
                <RenderIf condition={Boolean(signInAnonymError)}>
                  <span className="text-danger">{signInAnonymError}</span>
                </RenderIf>
              </form>

              {orDivider}

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
      <NewUserTooltip />
    </div>
  )
}
