'use client'
import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  Button,
  useDisclosure,
  Divider,
  Input,
} from '@nextui-org/react'

import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion'
import { Icon } from '@iconify/react'
import SocialLoginForm from './social-login-form'
import { signIn } from '../actions'

export default function LoginModal(props: ReturnType<typeof useDisclosure>) {
  const { onOpenChange, isOpen } = props
  const [isFormVisible, setIsFormVisible] = React.useState(false)

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  }

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  )

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <ModalHeader className="p-0">Login</ModalHeader>
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false} mode="popLayout">
            {isFormVisible ? (
              <m.form
                animate="visible"
                className="flex flex-col gap-y-3"
                exit="hidden"
                initial="hidden"
                variants={variants}
                action={signIn}
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
                <Button color="primary" type="submit">
                  Login
                </Button>
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
                  Continue Anonymously
                </Button>
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
                  <p className="mt-3 text-center text-small">
                    If is this your first time, your account will automatically
                    created?&nbsp;
                  </p>
                </m.div>
              </>
            )}
          </AnimatePresence>
        </LazyMotion>
      </ModalContent>
    </Modal>
  )
}
