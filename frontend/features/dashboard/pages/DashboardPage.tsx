'use client'

import React from 'react'
import { useUser } from '@/features/user/hooks/use-user'

export function DashboardPage() {
  const { user } = useUser()
  return (
    <div className="h-full m-2">
      <p>Hello </p>
      <pre className="pb-3">{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
