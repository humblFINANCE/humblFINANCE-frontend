'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const signOut = async (scope: 'global' | 'local' | 'others') => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    console.log('no user logged in')
    redirect('/login')
  }
  if (data?.user) {
    const { error: signOutError } = await supabase.auth.signOut({ scope })
    revalidatePath('/dashboard', 'layout')

    if (scope !== 'others') {
      redirect('/')
    }
  }
}
