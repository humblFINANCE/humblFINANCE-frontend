import CaptchaModal from '@/components/(landing-page)/login/CaptchaModal'
import PasswordLessLoginModal from '@/components/(landing-page)/login/PasswordlessModal'
import { Icon } from '@iconify/react'
import {
  Button,
  Checkbox,
  Divider,
  Link,
  useDisclosure,
  Tooltip,
  Input,
  type InputProps,
} from '@nextui-org/react'
import React, { useRef } from 'react'
import ForgotPassword from '@/components/(landing-page)/login/ForgotPasswordModal'
import { useRouter } from 'next/router'
import { createClient } from '@/utils/supabase/client'
import { signIn, forgotPassword } from '@/app/(landing-page)/login/action'

export default function LoginForm() {
  const captchaModal = useDisclosure()
  const passwordLessModal = useDisclosure()
  const signInModal = useDisclosure()
  const forgotPasswordModal = useDisclosure()
  const router = useRouter()
  const [isVisible, setIsVisible] = React.useState(false)
  const [passwordLessModalType, setPasswordLessModalType] = React.useState<
    'magicLink' | 'phoneNumber'
  >('magicLink')
  const formRef = useRef(null)
  const captchaInputRef = useRef(null)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const inputClasses: InputProps['classNames'] = {
    inputWrapper:
      'border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20',
  }

  const buttonClasses = 'bg-foreground/10 dark:bg-foreground/20'

  const handleLoginWithOauth = (
    provider:
      | 'google'
      | 'github'
      | 'twitter'
      | 'discord'
      | 'linkedin_oidc'
      | 'apple'
  ) => {
    return async function () {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.origin + '/auth/callback/social-login',
        },
      })

      if (error) {
        router.replace('/login?message=' + error.message)
      }
    }
  }

  const handleLoginPasswordLess = async (
    type: 'magicLink' | 'phoneNumber',
    value: string
  ) => {
    const supabase = createClient()
    const target = type === 'magicLink' ? { email: value } : { phone: value }
    const { error } = await supabase.auth.signInWithOtp({
      ...target,
      options: {
        emailRedirectTo: window.origin + '/auth/callback/social-login',
        shouldCreateUser: true,
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
    <div className=" fixed inset-0 flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-background/60 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <p className="pb-2 text-xl font-medium">Log In</p>
        <form ref={formRef} action={signIn} className="flex flex-col gap-3">
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
        <form className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 justify-center">
            <Button
              className={buttonClasses}
              onClick={handleLoginWithOauth('google')}
              startContent={<Icon icon="fe:google" width={24} />}
            />
            <Button
              type="submit"
              onClick={handleLoginWithOauth('github')}
              className={buttonClasses}
              startContent={<Icon icon="fe:github" width={24} />}
            />
            <Button
              type="submit"
              onClick={handleLoginWithOauth('twitter')}
              className={buttonClasses}
              startContent={<Icon icon="fe:twitter" width={24} />}
            />
          </div>
          <div className="flex flex-row gap-3 justify-center">
            <Button
              type="submit"
              onClick={handleLoginWithOauth('discord')}
              className={buttonClasses}
              startContent={<Icon icon="ic:baseline-discord" width={24} />}
            />
            <Button
              type="submit"
              onClick={handleLoginWithOauth('linkedin_oidc')}
              className={buttonClasses}
              startContent={<Icon icon="mdi:linkedin" width={24} />}
            />
            <Button
              isDisabled
              type="submit"
              onClick={handleLoginWithOauth('apple')}
              className={buttonClasses}
              startContent={<Icon icon="ic:baseline-apple" width={24} />}
            />
          </div>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">PASSWORDLESS</p>
          <Divider className="flex-1" />
        </div>
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
            startContent={
              <Icon icon="fluent:phone-lock-24-regular" width={24} />
            }
          >
            Continue with Phone
          </Button>
        </div>
        <p className="text-center text-small">
          <span className="text-foreground/50">New User?</span>{' '}
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-medium font-bold">First Time User?</div>
                <div className="text-small">
                  If you have not signed up yet, when you sign in for the first
                  time, the password that you enter will be set as your account
                  password.
                </div>
              </div>
            }
            placement="bottom"
            color="foreground"
          >
            <span className="cursor-pointer text-foreground/50 hover:text-foreground/100">
              Hover over me for help!
            </span>
          </Tooltip>
        </p>
      </div>
      <ForgotPassword action={forgotPassword as any} {...forgotPasswordModal} />
      <PasswordLessLoginModal
        onSignIn={handleLoginPasswordLess}
        type={passwordLessModalType}
        onOpenChange={passwordLessModal.onOpenChange}
        isOpen={passwordLessModal.isOpen}
      />
    </div>
  )
}
