import { useUser } from '@/features/user/hooks/use-user'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import AuthTheme from '@/components/ThemeSwitcher/AuthTheme'
import { toast, UpdateOptions } from 'react-toastify'
import { useUpdateProfile } from '@/features/profile/hooks/use-update-profile'
import { useTheme } from 'next-themes'
import React, { useCallback, useEffect } from 'react'

export interface UserDropDownProps {
  openLogoutModal: () => void
}

export function UserDropdown({
  openLogoutModal: openLogouModal,
}: UserDropDownProps) {
  const { user, profile, refetchProfile }: any = useUser()
  const { theme, setTheme } = useTheme()
  const { updateProfile } = useUpdateProfile()

  const handleDefaultTheme = async (val: string) => {
    const toastId = toast.loading('Updating Default Theme...')

    let res: any = await updateProfile(user.id, { default_theme: val })

    const toastOptions: UpdateOptions = {
      isLoading: false,
      autoClose: 3000,
      pauseOnHover: false,
      theme: val,
    }

    if (res?.id) {
      await refetchProfile(profile?.id) // fetch new profile data
      setTheme(profile?.default_theme)
      toastOptions.render = `Default Theme Changed to ${val.charAt(0).toUpperCase() + val.slice(1)}`
      toastOptions.type = 'success'
    } else {
      toastOptions.render = 'Failed to update Default Theme'
      toastOptions.type = 'error'
    }

    toast.update(toastId, toastOptions)
  }

  const fetchDefaulttheme: any = useCallback(() => {
    setTheme(profile?.default_theme)
    // console.log('FETCHED DEFAULT THEME')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.default_theme])

  useEffect(() => {
    fetchDefaulttheme()
  }, [fetchDefaulttheme])

  return (
    <>
      <Dropdown closeOnSelect={false}>
        <DropdownTrigger>
          <Avatar as="button" size="md" src={profile?.avatar_url} />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User menu actions"
          // onAction={(actionKey) => console.log({actionKey})}
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
          <DropdownItem closeOnSelect key="theme-2">
            <div className="flex items-center justify-between">
              <span>Default Theme</span>
              <div className="w-1/3">
                {/*<ThemeSwitcher />*/}
                <AuthTheme
                  handleDefaultTheme={handleDefaultTheme}
                  theme={theme}
                />
              </div>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
