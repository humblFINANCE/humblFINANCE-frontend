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

export default function LoginPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const inputClasses: InputProps["classNames"] = {
    inputWrapper:
      "border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20",
  };

  const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";

  const handleLoginWithOauth = useCallback( (provider: "google" | "github") => {
    return async function() {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.origin + '/auth/callback/social-login'
        }
      })

      if (error) {
        router.replace("/login?message=" + "menyala")
      }
    }
  }, [router])


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
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <form className="flex flex-col gap-2">
          <Button className={buttonClasses} onClick={handleLoginWithOauth('google')} startContent={<Icon icon="fe:google" width={24} />}>
            Continue with Google
          </Button>
          <Button type="submit" onClick={handleLoginWithOauth('github')} className={buttonClasses} startContent={<Icon icon="fe:github" width={24} />}>
            Continue with Github
          </Button>
        </form>
        <p className="text-center text-small text-foreground/50">
          Need to create an account?&nbsp;
          <Link color="foreground" href="#" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
