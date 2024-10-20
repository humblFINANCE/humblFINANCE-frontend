'use client'
import { useRefreshLimit } from '@/components/(dashboard)/portfolio/hooks/useRefreshLimit'
import { User } from '@/features/user/types'
import { createClient } from '@/utils/supabase/client'
import { useDisclosure } from '@nextui-org/react'
import { createContext, useEffect, useState } from 'react'
import { UpgradeUserModal } from '../components/UpgradeUserModal'
import { Profile } from '../types/profile'
import { initializeOneSignal } from '@/utils/onesignal/init-one-signal'

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
  const { getRefreshLimit } = useRefreshLimit()
  const upgradeUserModalDisclosure = useDisclosure()
  const [info, setInfo] = useState<string>('to access this feature')
  const fetchProfile = async (userId: string) => {
    const supabase = createClient()
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)

    if (Array.isArray(data) && data.length) {
      getRefreshLimit(data[0].id)
      await initializeOneSignal(data[0].id)

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
