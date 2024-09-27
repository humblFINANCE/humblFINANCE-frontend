import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINTS } from '@/components/(dashboard)/portfolio/constants'
const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const url = new URL(FASTAPI_URL + ENDPOINTS.USERTABLE)

  const requestHeaders = request.headers
  const headers = new Headers()

  if (requestHeaders.has('cache-control')) {
    headers.set('cache-control', requestHeaders.get('cache-control')!)
  }

  if (requestHeaders.has('pragma')) {
    headers.set('pragma', requestHeaders.get('pragma')!)
  }

  const response = await (
    await fetch(url + '?' + params.toString(), {
      cache: 'no-store',
      headers,
    })
  ).json()

  return NextResponse.json({ data: response })
}
