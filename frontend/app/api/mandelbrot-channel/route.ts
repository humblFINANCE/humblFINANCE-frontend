import { NextRequest, NextResponse } from 'next/server'
import { ENDPOINTS } from '@/components/(dashboard)/portfolio/constants'
const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const url = new URL(FASTAPI_URL + ENDPOINTS.MANDELBROT)
    const headers = new Headers()
    const requestHeaders = request.headers

    if (requestHeaders.has('cache-control')) {
      headers.set('cache-control', requestHeaders.get('cache-control')!)
    }

    if (requestHeaders.has('pragma')) {
      headers.set('pragma', requestHeaders.get('pragma')!)
    }

    const response = await fetch(url + '?' + params.toString(), {
      cache: 'no-store',
      headers,
    })

    const responseHeaders = {
      'x-fastapi-cache': response.headers.get('x-fastapi-cache') ?? 'MISS',
    }

    const { response_data, message, status_code } = await response.json()

    return NextResponse.json(
      { response_data, message, status_code },
      { headers: responseHeaders }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
