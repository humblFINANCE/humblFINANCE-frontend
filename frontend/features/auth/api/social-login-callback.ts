import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const redirectTo = request.nextUrl.clone()

    const host = request.headers.get('host')
    if (host) {
      redirectTo.host = request.headers.get('host') as string
    }

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code!)
      if (!error) {
        const from = searchParams.get('from')
        console.log(from)

        redirectTo.searchParams.delete('code')
        redirectTo.pathname = '/dashboard/home'
        if (redirectTo.searchParams.get('from')) {
          redirectTo.searchParams.delete('from')
          redirectTo.pathname = '/' + from
        }
        return NextResponse.redirect(redirectTo)
      }
    }

    redirectTo.pathname = '/error'
    return NextResponse.redirect(redirectTo)
  } catch (e: any) {
    return NextResponse.json({
      message: e?.message,
    })
  }
}
