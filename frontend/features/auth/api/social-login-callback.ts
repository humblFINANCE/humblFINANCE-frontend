import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = request.nextUrl.clone()

  let host = (request.headers.get("host") as string) || request.nextUrl.clone().host
  let protocol = /^localhost(:\d+)?$/.test(host) ? "http:" : "https:";

  if (
    request.headers.get("x-forwarded-host") &&
    typeof request.headers.get("x-forwarded-host") === "string"
  ) {
    host = request.headers.get("x-forwarded-host") as string
  }

  if (
    request.headers.get("x-forwarded-proto") &&
    typeof request.headers.get("x-forwarded-proto") === "string"
  ) {
    protocol = `${request.headers.get("x-forwarded-proto")}:`;
  }

  // if (code) {
  //   const { error } = await supabase.auth.exchangeCodeForSession(code!)
  //   if (!error) {
  //     const from = searchParams.get('from')
  //
  //     redirectTo.searchParams.delete('code')
  //     redirectTo.pathname = '/dashboard/home'
  //     if (redirectTo.searchParams.get('from')) {
  //       redirectTo.searchParams.delete('from')
  //       redirectTo.pathname = '/' + from
  //     }
  //     // return NextResponse.redirect(redirectTo)
  //     return NextResponse.json({
  //       host,
  //       nextHost: redirectTo.host,
  //       protocol: redirectTo.protocol,
  //       redirectTo: redirectTo.toString()
  //     })
  //   }
  // }

  return NextResponse.json({
    host,
    nextHost: redirectTo.host,
    protocol: redirectTo.protocol,
    redirectTo: redirectTo.toString()
  })

  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
