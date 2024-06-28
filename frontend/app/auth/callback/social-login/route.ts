import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = request.nextUrl.clone()
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code!)
    if (!error) {
      const from = searchParams.get('from')
      console.log(from)

      redirectTo.searchParams.delete('code')
      redirectTo.pathname = '/dashboard/home'
      if (redirectTo.searchParams.get('from')) {
        redirectTo.pathname = '/pricing'
      }
      return NextResponse.redirect(redirectTo)
    }
  }

  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
