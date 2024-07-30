import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINTS } from '@/components/(dashboard)/portfolio/constants'
const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  // console.log(params)
  const url = new URL(FASTAPI_URL + ENDPOINTS.USERTABLE)

  const response = await (
    await fetch(url.toString() + '?' + params.toString(), {})
  ).json()

  return NextResponse.json({ data: response })
}
