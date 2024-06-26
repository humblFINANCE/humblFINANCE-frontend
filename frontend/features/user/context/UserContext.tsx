'use client'
import { createContext } from 'react'
import { User } from '@/features/user/types'

interface UserContextType {
  user: User
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
