'use client'
import { UserContext } from '@/features/user/context/UserContext'
import React, { useContext } from 'react'

export function useUser() {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
