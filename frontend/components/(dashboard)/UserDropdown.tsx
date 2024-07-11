import { useUser } from '@/features/user/hooks/use-user'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { ThemeSwitch } from '../ThemeSwitch'
import { useRef } from 'react'
import ThemeSwitcher from '../ThemeSwitcher'

export interface UserDropDownProps {
  openLogoutModal: () => void
}

export function UserDropdown({
  openLogoutModal: openLogouModal,
}: UserDropDownProps) {
  const { user } = useUser()
  const themeRef = useRef<{ onChange: () => void }>()

  const handleChangeTheme = () => {
    if (themeRef.current) {
      themeRef.current.onChange()
    }
  }

  return (
    <Dropdown closeOnSelect={false}>
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
          <p>{user.email}</p>
        </DropdownItem>
        <DropdownItem
          href="/dashboard/profile-settings"
          key="settings"
          closeOnSelect
        >
          Profile Settings
        </DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          onClick={openLogouModal}
          key="logout"
          color="danger"
          className="text-danger "
        >
          Log Out
        </DropdownItem>
        <DropdownItem closeOnSelect={false} key="theme-2">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <div className="w-1/3">
              <ThemeSwitcher />
            </div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
