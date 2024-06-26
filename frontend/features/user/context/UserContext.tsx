'use client'
import { createContext } from 'react'
import { User } from '@/features/user/types'
import { LoginModal } from '@/features/login/components/LoginModal'
import { useDisclosure } from '@nextui-org/react'

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
  const loginModalDisclosure = useDisclosure()

  const ctx: UserContextType = {
    user,
    openModalConvertUser: loginModalDisclosure.onOpenChange,
  }

  return (
    <UserContext.Provider value={ctx}>
      <LoginModal {...loginModalDisclosure} />
      {children}
    </UserContext.Provider>
  )
}
