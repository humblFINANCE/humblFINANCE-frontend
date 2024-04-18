import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


export default async function PrivateTestPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log("i made it")
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}

