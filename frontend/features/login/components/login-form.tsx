'use client'
import CaptchaModal from './captcha-modal'
import PasswordlessForm from './passwordless-form'
import { Icon } from '@iconify/react'
import {
  Button,
  Checkbox,
  Divider,
  Link,
  useDisclosure,
  Input,
  type InputProps,
} from '@nextui-org/react'
import React, { useRef } from 'react'
import ForgotPassword from './forgot-password-modal'
import { signIn, forgotPassword } from '../actions'
import SocialLoginForm from './social-login-form'
import NewUserTooltip from './new-user-tooltip'
import RenderIf from '@/components/RenderIf'
import { useSignInState } from '../hooks/use-signIn-state'

export default function LoginForm() {
  const captchaModal = useDisclosure()
  const forgotPasswordModal = useDisclosure()
  const [isVisible, setIsVisible] = React.useState(false)
  const formRef = useRef(null)
  const captchaInputRef = useRef(null)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const buttonClasses = 'bg-foreground/10 dark:bg-foreground/20'
  const inputClasses: InputProps['classNames'] = {
    inputWrapper:
      'border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20',
  }

  const { signInWithEmailState, signInAction } = useSignInState({
    error: '',
    captchaToken: '',
  })

  return (
    <>
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-background/60 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <p className="pb-2 text-xl font-medium">Log In</p>
        <form
          ref={formRef}
          action={signInAction}
          className="flex flex-col gap-3"
        >
          <input type="hidden" ref={captchaInputRef} name="captchaToken" />
          <Input
            classNames={inputClasses}
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            classNames={inputClasses}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-foreground/50"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-foreground/50"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
          />
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox
              classNames={{
                wrapper: 'before:border-foreground/50',
              }}
              name="remember"
              size="sm"
            >
              Remember me
            </Checkbox>
            <Link
              onClick={forgotPasswordModal.onOpenChange}
              className="text-foreground/50"
              href="#"
              size="sm"
            >
              Forgot Password
            </Link>
          </div>
          <Button onClick={captchaModal.onOpenChange} className={buttonClasses}>
            Log In
          </Button>
          <RenderIf condition={Boolean(signInWithEmailState.error)}>
            <span className="text-danger">{signInWithEmailState.error}</span>
          </RenderIf>
          <CaptchaModal
            formRef={formRef}
            captchaInputRef={captchaInputRef}
            {...captchaModal}
          />
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">SOCIAL LOGIN</p>
          <Divider className="flex-1" />
        </div>
        <SocialLoginForm />
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">PASSWORDLESS</p>
          <Divider className="flex-1" />
        </div>
        <PasswordlessForm />
        <NewUserTooltip />
      </div>
      <ForgotPassword action={forgotPassword as any} {...forgotPasswordModal} />
    </>
  )
}
