'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export type resetPasswordData = {
  newPassword: string
  confirmPassword: string
}

export const resetPassword = async (formData: resetPasswordData) => {
  const supabase = createClient()
  const { newPassword } = formData
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return redirect('/reset-password?error=failed: ' + error.message)
  }

  await supabase.auth.signOut()

  return redirect('/login')
}
