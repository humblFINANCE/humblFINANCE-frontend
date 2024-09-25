import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { deleteCookie } from 'cookies-next'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createClient()

    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    console.log(error?.code, data)

    if (!error) {
      if (data?.user) {
        const { error } = await supabase
          .from('profiles')
          .update({ email: data.user.email })
          .eq('id', data.user.id)

        if (error) {
          console.log('error update user', error)
        }
      }

      redirectTo.searchParams.delete('next')
      redirectTo.searchParams.append('success', 'true')
      return NextResponse.redirect(redirectTo)
    }

    if (error?.code === 'otp_expired') {
      redirectTo.searchParams.append('error', error?.code)

      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
