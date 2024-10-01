import { createClient } from '@/utils/supabase/client'
import { Icon } from '@iconify/react'
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import React, { useEffect } from 'react'

export const NotificationsDropdown = () => {
  const supabase = createClient()

  useEffect(() => {
    const historyListener = supabase
      .channel('public:alert_history')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'alert_history' },
        (payload) => {
          console.log('Change received!', payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(historyListener)
    }
  }, [])

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Badge
          content="2"
          className="text-white bg-danger border-danger mr-0.5 mt-1 cursor-pointer"
          size="sm"
        >
          <DropdownTrigger className="cursor-pointer">
            <Icon
              width={20}
              icon="solar:bell-bold"
              className="text-default-400 cursor-pointer"
            />
          </DropdownTrigger>
        </Badge>
      </DropdownTrigger>

      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notificacions">
          <DropdownItem
            classNames={{
              base: 'py-2',
              title: 'text-base font-semibold',
            }}
            key="1"
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            📣 Edit your information
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
