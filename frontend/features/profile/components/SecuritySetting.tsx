'use client'

import type { CardProps } from '@nextui-org/react'

import React from 'react'
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { SwitchCell } from '@/features/shared/SwitchCell'
import { cn } from '@/utils/cn'
import { useUser } from '@/features/user/hooks/use-user'
import { DeleteAccountModal } from '@/features/profile/components/modal/DeleteAccountModal'
import { toast } from 'react-toastify'
import { useTheme } from 'next-themes'
import RenderIf from '@/features/shared/RenderIf'

const CellWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-between gap-2 rounded-medium bg-content2 p-4',
      className
    )}
    {...props}
  >
    {children}
  </div>
))

CellWrapper.displayName = 'CellWrapper'

export function SecuritySetting(props: CardProps) {
  const [deleteAccount, setDeleteAccount] = React.useState(false)
  const { user, profile } = useUser()
  const { theme } = useTheme()

  return (
    <>
      <Card className="w-full max-w-lg p-2" {...props}>
        <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
          <p className="text-large">Security Settings</p>
          <p className="text-small text-default-500">
            Manage your security preferences
          </p>
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
          {/* Email */}
          <CellWrapper className="block lg:flex">
            <div>
              <p className="flex">
                Email Address
                <RenderIf
                  condition={Boolean(user.user_metadata.email_verified)}
                >
                  <p className="lg:hidden ml-2 text-success">Verified</p>
                </RenderIf>
              </p>
              <p className="text-small text-default-500">
                The email address associated with your account.
              </p>
            </div>
            <div className="hidden lg:flex w-full flex-wrap items-center justify-end gap-6">
              <div className="flex mr-2 flex-col items-end">
                <p>{profile?.email}</p>
                <p className="text-small text-success">Verified</p>
              </div>
              {user.app_metadata.provider === 'google' ? (
                <Button
                  endContent={
                    <Icon icon="flat-color-icons:google" width={24} />
                  }
                  radius="full"
                  variant="bordered"
                  isDisabled
                >
                  Linked with
                </Button>
              ) : (
                <Button
                  endContent={<Icon icon="solar:pen-2-linear" />}
                  radius="full"
                  variant="bordered"
                >
                  Edit
                </Button>
              )}
            </div>
            <div className="lg:hidden flex w-full flex-wrap items-center justify-start gap-6 mt-4">
              {user.app_metadata.provider === 'google' ? (
                <Button
                  endContent={
                    <Icon icon="flat-color-icons:google" width={24} />
                  }
                  radius="full"
                  variant="bordered"
                  isDisabled
                >
                  Linked with
                </Button>
              ) : (
                <Button
                  endContent={<Icon icon="solar:pen-2-linear" />}
                  radius="full"
                  variant="bordered"
                >
                  Edit
                </Button>
              )}
            </div>
          </CellWrapper>
          {user.app_metadata.provider === 'google' ? null : (
            <CellWrapper>
              <div>
                <p>Password</p>
                <p className="text-small text-default-500">
                  Set a unique password to protect your account.
                </p>
              </div>
              <Button radius="full" variant="bordered">
                Change
              </Button>
            </CellWrapper>
          )}
          {/* Two-Factor Authentication */}
          <SwitchCell
            defaultSelected
            description="Add an extra layer of security to your account."
            label="Two-Factor Authentication"
          />
          {/* Password Reset Protection */}
          <SwitchCell
            description="Require additional information to reset your password."
            label="Password Reset Protection"
          />
          {/* Require Pin */}
          <SwitchCell
            defaultSelected
            description="Require a pin to access your account."
            label="Require Pin"
          />
          {/* Deactivate Account */}
          <CellWrapper>
            <div>
              <p>Deactivate Account</p>
              <p className="text-small text-default-500">
                Deactivate your account and delete all your data.
              </p>
            </div>
            <Button radius="full" variant="bordered">
              Deactivate
            </Button>
          </CellWrapper>
          {/* Delete Account */}
          <CellWrapper>
            <div>
              <p>Delete Account</p>
              <p className="text-small text-default-500">
                Delete your account and all your data.
              </p>
            </div>
            <Button
              color="danger"
              radius="full"
              variant="flat"
              onClick={() => setDeleteAccount(!deleteAccount)}
            >
              Delete
            </Button>
          </CellWrapper>
        </CardBody>
      </Card>

      {/* Phone Modal */}
      <DeleteAccountModal
        toast={toast}
        deleteAction={deleteAccount}
        setDeleteAction={setDeleteAccount}
      />
    </>
  )
}
