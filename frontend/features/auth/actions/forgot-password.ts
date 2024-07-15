'use server'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export interface ForgotPasswordActionReturn {
  msg: string
  status: 'success' | 'failed'
}

export const forgotPassword = async (
  _: any,
  formData: FormData
): Promise<ForgotPasswordActionReturn> => {
  const supabase = createClient()
  const origin = headers().get('origin') as string
  const email = formData.get('email') as string
  const captchaToken = formData.get('captchaToken') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: origin + '/auth/callback/reset-password',
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
