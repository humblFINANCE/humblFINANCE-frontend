'use server'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServiceRoleClient } from '@/utils/supabase/serviceRole'

export const signIn = async (formData: FormData) => {
  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const captchaToken = formData.get('captchaToken') as string
  const supabase = createClient()
  const serviceRoleClient = createServiceRoleClient()

  const throwError = (msg: string) => {
    return redirect('/login?message=' + msg)
  }

  let { data: userId, error: checkUserError } = await serviceRoleClient.rpc(
    'get_user_id_by_email',
    { user_email: email }
  )
  if (checkUserError) return throwError(checkUserError.message)

  const userAlreadyRegistered = Boolean(userId)
  if (userAlreadyRegistered) {
    let { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken,
      },
    })

    if (loginError) return throwError(loginError.message)
    return redirect('/dashboard/home')
  }

  let { error: registerError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback/confirm`,
      captchaToken,
    },
  })

  if (registerError) return throwError(registerError.message)
  //TODO: add emai confirmation page
  return redirect('/email-confirmation')
}

export const signUp = async (formData: FormData) => {
  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback/confirm`,
    },
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/login?message=Check email to continue sign in process')
}

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
