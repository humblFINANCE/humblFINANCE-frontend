import { UserProvider } from '@/features/user/context/UserContext'
import { createClient } from '@/utils/supabase/server'
import { User } from '@/features/user/types'
import { redirect } from 'next/navigation'
import A from './a'

export default async function PrivateTestPage() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log('i made it')
    redirect('/login')
  }

  return (
    <UserProvider user={data.user as User}>
      <A />
    </UserProvider>
  )
}
