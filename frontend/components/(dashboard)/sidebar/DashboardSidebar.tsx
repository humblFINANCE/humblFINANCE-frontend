'use client'

import LogoutModal from '@/components/(landing-page)/logout/LogoutModal'
import { Icon } from '@iconify/react'
import {
  Avatar,
  Button,
  useDisclosure,
  ScrollShadow,
  Spacer,
  Tooltip,
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import Link from 'next/link'

import { cn } from '@/utils/nextui/cn'
import { sectionItemsWithTeams } from './sidebar-items'

import Sidebar from '@/components/(dashboard)/sidebar/Sidebar'
import { UserDropdown } from '../UserDropdown'
import { NotificationsDropdown } from '../NotificationDropdown'
import { HumblFinanceIcon } from '@/components/icons/Brands'

export default function DashboardSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  // Sidebar Collapse Control
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isCompact = isCollapsed || isMobile

  // Dashboard Header Name
  const pathname = usePathname()
  const currentTab = pathname.split('/')?.[1]
  const currentPath = pathname.split('/')[pathname.split('/').length - 1]
  const capitalizedCurrentPath = currentPath
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Logout Modal Control
  const logoutModalDisclosure = useDisclosure()

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  return (
    <div className="flex h-dvh w-full">
      <div
        className={cn(
          'relative flex h-full w-72 flex-col !border-r-small border-divider p-6 transition-width',
          {
            'w-16 items-center px-2 py-6': isCompact,
          }
        )}
      >
        <div
          className={cn(
            'flex items-center gap-3 px-3',

            {
              'justify-center gap-0': isCompact,
            }
          )}
        >
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground relative"
          >
            <div className="absolute -ml-0.25">
              <HumblFinanceIcon />
            </div>
          </Link>
          <span
            className={cn('text-small font-bold uppercase opacity-100', {
              'w-0 opacity-0': isCompact,
            })}
          >
            humblFINANCE
          </span>
        </div>
        <Spacer y={1} />
        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar
            defaultSelectedKey="home"
            selectedKeys={[currentTab]}
            isCompact={isCompact}
            items={sectionItemsWithTeams}
          />
        </ScrollShadow>
        <Spacer y={0.5} />
        <div
          className={cn('mt-auto flex flex-col', {
            'items-center': isCompact,
          })}
        >
          <Tooltip
            content="Help & Feedback"
            isDisabled={!isCompact}
            placement="right"
          >
            <Button
              fullWidth
              className={cn(
                'justify-start truncate text-default-500 data-[hover=true]:text-foreground',
                {
                  'justify-center': isCompact,
                }
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="flex-none text-default-500"
                    icon="solar:info-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCompact ? (
                <Icon
                  className="text-default-500"
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              ) : (
                'Help & Feedback'
              )}
            </Button>
          </Tooltip>
          <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
            <Button
              onPress={logoutModalDisclosure.onOpenChange}
              className={cn(
                'justify-start text-default-500 data-[hover=true]:bg-red-500 data-[hover=true]:text-red-100',
                {
                  'justify-center': isCompact,
                }
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="flex-none rotate-180 text-default-500"
                    icon="solar:minus-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCompact ? (
                <Icon
                  className="rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              ) : (
                'Log Out'
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="w-full flex-1 flex-col p-4">
        <header className="flex justify-between items-center gap-3 rounded-medium border-small border-divider p-4">
          <div className="flex items-center gap-x-4 flex-row">
            <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
              <Icon
                className="text-default-500"
                height={24}
                icon="solar:sidebar-minimalistic-outline"
                width={24}
              />
            </Button>
            <h2 className="text-medium font-medium text-default-700">
              {capitalizedCurrentPath}
            </h2>
          </div>
          <div className="flex items-center gap-x-4 flex-row">
            <NotificationsDropdown />
            <UserDropdown
              openLogoutModal={logoutModalDisclosure.onOpenChange}
            />
          </div>
        </header>
        <main className="mt-4 h-[90%] w-full overflow-visible">
          <div className="flex h-full w-full flex-col gap-4 rounded-medium border-small border-divider overflow-hidden p-4">
            {children}
          </div>
        </main>
      </div>
      <LogoutModal {...logoutModalDisclosure} />
    </div>
  )
}
