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
