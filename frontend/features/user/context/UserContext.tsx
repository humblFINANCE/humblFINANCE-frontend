'use client'
import { createContext } from 'react'
import { User } from '@/features/user/types'
import { LoginModal } from '@/features/login/components/LoginModal'
import { useDisclosure } from '@nextui-org/react'
import { UpgradeUserModal } from '../components/UpgradeUserModal'

interface UserContextType {
  user: User
  openModalConvertUser: () => void
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

  const ctx: UserContextType = {
    user,
    openModalConvertUser: upgradeUserModalDisclosure.onOpenChange,
  }

  return (
    <UserContext.Provider value={ctx}>
      <UpgradeUserModal {...upgradeUserModalDisclosure} role={user.role} />
      {children}
    </UserContext.Provider>
  )
}
