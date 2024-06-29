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

export function UserDropdown() {
  const { user } = useUser()
  const themeRef = useRef<{ onChange: () => void }>()

  const handleChangeTheme = () => {
    if (themeRef.current) {
      themeRef.current.onChange()
    }
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
          <p>{user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Profile Settings</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger ">
          Log Out
        </DropdownItem>
        <DropdownItem
          closeOnSelect={false}
          onClick={handleChangeTheme}
          key="theme"
        >
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <ThemeSwitch ref={themeRef} />
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
