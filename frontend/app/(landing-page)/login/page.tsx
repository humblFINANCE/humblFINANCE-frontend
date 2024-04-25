"use client";

import type { InputProps } from "@nextui-org/input";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useRouter } from 'next/navigation'
import { signIn } from './action'
import { createClient } from '@/utils/supabase/client'
import React, { useCallback } from "react";
import { useDisclosure } from "@nextui-org/modal";
import PasswordLessLoginModal from "@/components/(landing-page)/login/PasswordlessModal";

export default function LoginPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = React.useState(false);
  const [passwordLessModalType, setPasswordLessModalType] = React.useState<"magicLink" | "phoneNumber">("magicLink")
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const toggleVisibility = () => setIsVisible(!isVisible);

  const inputClasses: InputProps["classNames"] = {
    inputWrapper:
      "border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20",
  };

  const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";

  const handleLoginWithOauth = useCallback((provider: "google" | "github" | "twitter" | "discord" | "linkedin_oidc" | "apple") => {
    return async function() {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.origin + '/auth/callback/social-login'
        }
      })


      if (error) {
        router.replace("/login?message=" + error.message)
      }
    }
  }, [router])

  const handleLoginPasswordLess = useCallback(async (type: "magicLink" | "phoneNumber", value: string) => {
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
  }, [])

  const handleOpenPasswordLessModal = useCallback((type: "magicLink" | "phoneNumber") => {
    return function() {
      setPasswordLessModalType(type)
      onOpen()
    }

  }, [onOpen])

  return (
    <div className=" fixed inset-0 flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-background/60 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <p className="pb-2 text-xl font-medium">Log In</p>
        <form className="flex flex-col gap-3">
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
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox
              classNames={{
                wrapper: "before:border-foreground/50",
              }}
              name="remember"
              size="sm"
            >
              Remember me
            </Checkbox>
            <Link className="text-foreground/50" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button formAction={signIn} className={buttonClasses} type="submit">
            Log In
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">SOCIAL LOGIN</p>
          <Divider className="flex-1" />
        </div>
        <form className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 justify-center">
            <Button className={buttonClasses} onClick={handleLoginWithOauth('google')} startContent={<Icon icon="fe:google" width={24} />} />
            <Button type="submit" onClick={handleLoginWithOauth('github')} className={buttonClasses} startContent={<Icon icon="fe:github" width={24} />} />
            <Button type="submit" onClick={handleLoginWithOauth('twitter')} className={buttonClasses} startContent={<Icon icon="fe:twitter" width={24} />} />
          </div>
          <div className="flex flex-row gap-3 justify-center">
            <Button type="submit" onClick={handleLoginWithOauth('discord')} className={buttonClasses} startContent={<Icon icon="ic:baseline-discord" width={24} />} />
            <Button type="submit" onClick={handleLoginWithOauth('linkedin_oidc')} className={buttonClasses} startContent={<Icon icon="mdi:linkedin" width={24} />} />
            <Button type="submit" onClick={handleLoginWithOauth('apple')} className={buttonClasses} startContent={<Icon icon="ic:baseline-apple" width={24} />} />
          </div>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={handleOpenPasswordLessModal('magicLink')} className={buttonClasses} startContent={<Icon icon="fe:link" width={24} />}>
            Continue with Link
          </Button>
          <Button type="submit" onClick={handleOpenPasswordLessModal('phoneNumber')} className={buttonClasses} startContent={<Icon icon="fe:phone" width={24} />}>
            Continue with Phone
          </Button>
        </div>
        <p className="text-center text-small text-foreground/50">
          Need to create an account?&nbsp;
          <Link color="foreground" href="#" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
      <PasswordLessLoginModal onSignIn={handleLoginPasswordLess} type={passwordLessModalType} onOpenChange={onOpenChange} isOpen={isOpen} />
    </div>
  );
}

