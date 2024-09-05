'use client'

import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardProps,
  Chip,
  Link,
  Tooltip,
} from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { cn } from '@/utils/cn'
import { useUser } from '@/features/user/hooks/use-user'
import { toast } from 'react-toastify'
import { OpenBBTokenModal } from '@/features/profile/components/modal/OpenBBTokenModal'
import { useTheme } from 'next-themes'

const CellWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'block lg:flex items-center justify-between gap-2 rounded-medium bg-content2 p-4',
      className
    )}
    {...props}
  >
    {children}
  </div>
))

CellWrapper.displayName = 'CellWrapper'

export function FinancialServiceSetting(props: CardProps) {
  const [openBB, setOpenBB] = React.useState(false)
  const { profile } = useUser()
  const { theme } = useTheme()

  return (
    <>
      <Card className="w-full max-w-lg p-2" {...props}>
        <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
          <p className="text-large">Financial Services</p>
          <p className="text-small text-default-500">
            Manage your financial preferences
          </p>
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
          {/* Email */}
          <CellWrapper>
            <div>
              <p>OpenBB Personal Access Token</p>
              <p className="text-small text-default-500">
                Enter your own OpenBB token to get access to all of your
                personal data vendors compiled by OpenBB.&nbsp;
                <Tooltip
                  content={
                    <div className="px-1 py-2">
                      <div className="text-small">
                        Create an OpenBB Account to Generate an Access Token
                      </div>
                    </div>
                  }
                  placement="top"
                >
                  <Link
                    isExternal
                    href="https://my.openbb.co/app/platform/examples"
                    showAnchorIcon
                  >
                    See Documentation
                  </Link>
                </Tooltip>
              </p>
            </div>
            <div className="hidden lg:flex w-full flex-wrap items-center justify-end gap-6">
              <div className="flex mr-2 flex-col items-end">
                {profile?.openbb_token && profile?.openbb_token_status ? (
                  <p className="text-small text-success">Activated</p>
                ) : null}

                {profile?.openbb_token && !profile?.openbb_token_status ? (
                  <p className="text-small text-warning">Not Activated</p>
                ) : null}

                {!profile?.openbb_token && !profile?.openbb_token_status ? (
                  <p className="text-small text-danger">Not Configured</p>
                ) : null}
              </div>
              <Button
                endContent={<Icon icon="hugeicons:setup-01" width={20} />}
                radius="full"
                variant="bordered"
                isDisabled={false}
                onClick={() => setOpenBB(!openBB)}
              >
                Configure
              </Button>
            </div>
            <div className="lg:hidden flex w-full flex-wrap items-center justify-start mt-4 gap-6">
              <Button
                endContent={<Icon icon="hugeicons:setup-01" width={20} />}
                radius="full"
                variant="bordered"
                isDisabled={false}
                onClick={() => setOpenBB(!openBB)}
              >
                Configure
              </Button>
              <div className="flex ml-2 mr-2 flex-col items-end">
                {profile?.openbb_token && profile?.openbb_token_status ? (
                  <p className="text-small text-success">Activated</p>
                ) : null}

                {profile?.openbb_token && !profile?.openbb_token_status ? (
                  <p className="text-small text-warning">Not Activated</p>
                ) : null}

                {!profile?.openbb_token && !profile?.openbb_token_status ? (
                  <p className="text-small text-danger">Not Configured</p>
                ) : null}
              </div>
            </div>
          </CellWrapper>
          <CellWrapper className="bg-content1">
            <div>
              <p>
                InteractiveBroker API Key{' '}
                <Chip
                  radius="md"
                  size="sm"
                  color="warning"
                  className="ml-0 lg:ml-4"
                  variant="flat"
                >
                  Coming Soon
                </Chip>
              </p>
              <p className="text-small text-default-500">
                Enter your Interactive Broker token to view live account data
                and start implementing strategies
              </p>
            </div>
            <div className="hidden lg:flex w-full flex-wrap items-center justify-end gap-6">
              <div className="flex mr-2 flex-col items-end">
                {/*<p>duwqh9d918d9b1398dh913d8</p>*/}
                <p className="text-small text-danger">Not Configured</p>
              </div>
              <Button
                endContent={<Icon icon="hugeicons:setup-01" width={20} />}
                radius="full"
                variant="bordered"
                isDisabled={true}
              >
                Configure
              </Button>
            </div>
            <div className="lg:hidden flex w-full flex-wrap items-center justify-start gap-6">
              <Button
                endContent={<Icon icon="hugeicons:setup-01" width={20} />}
                radius="full"
                variant="bordered"
                isDisabled={true}
              >
                Configure
              </Button>
              <div className="flex ml-2 mr-2 flex-col items-end">
                {/*<p>duwqh9d918d9b1398dh913d8</p>*/}
                <p className="text-small text-danger">Not Configured</p>
              </div>
            </div>
          </CellWrapper>
        </CardBody>
      </Card>

      {/* Phone Modal */}
      <OpenBBTokenModal
        toast={toast}
        openBBAction={openBB}
        setOpenBBAction={setOpenBB}
      />
    </>
  )
}
