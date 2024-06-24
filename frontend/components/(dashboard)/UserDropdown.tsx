'use server'

import { createClient } from '@/utils/supabase/server'
import { Avatar } from '@nextui-org/react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'

export const UserDropdown = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user?.email) {
    console.error('User could not be found.')
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as="button"
          color="secondary"
          size="md"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{data?.user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Profile Settings</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger ">
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">{/* <ThemeSwitch /> */}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
