'use client'
import { useUser } from '@/features/user/hooks/use-user'

export default function Page() {
  const user = useUser()
  return (
    <>
      <p>Hello </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}
