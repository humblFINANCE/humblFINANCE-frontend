'use client'
import { createContext, useEffect, useState } from 'react'
import { User } from '@/features/user/types'
import { useDisclosure } from '@nextui-org/react'
import { UpgradeUserModal } from '../components/UpgradeUserModal'
import { Profile } from '../types/profile'
import { createClient } from '@/utils/supabase/client'

interface UserContextType {
  user: User
  profile?: Profile
  isProfileLoaded: boolean
  openModalConvertUser: (text?: string) => void
  refetchProfile: any
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) {
  const upgradeUserModalDisclosure = useDisclosure()
  const [info, setInfo] = useState<string>('to access this feature')
  const fetchProfile = async (userId: string) => {
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)

    if (Array.isArray(data) && data.length) {
      setCtx((prev) => ({
        ...prev,
        isProfileLoaded: true,
        profile: data[0],
      }))
    }
  }

  const [ctx, setCtx] = useState<UserContextType>({
    user,
    isProfileLoaded: false,
    openModalConvertUser: (text) => {
      setInfo(text ?? 'to access this feature')
      upgradeUserModalDisclosure.onOpenChange()
    },
    refetchProfile: fetchProfile,
  })

  useEffect(() => {
    fetchProfile(user.id)
  }, [])

  return (
    <UserContext.Provider value={ctx}>
      <UpgradeUserModal {...upgradeUserModalDisclosure} msg={info} />
      {children}
    </UserContext.Provider>
  )
}
