'use server'
import { createClient } from '@/utils/supabase/server'

export const forgotPassword = async (_: any, formData: FormData) => {
  const supabase = createClient()
  const email = formData.get('email') as string
  const captchaToken = formData.get('captchaToken') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/auth/callback/reset-password',
    captchaToken,
  })

  if (error) {
    return { msg: error.message, status: 'failed' }
  }

  return {
    msg: 'email sent. please check your email ' + email,
    status: 'success',
  }
}
