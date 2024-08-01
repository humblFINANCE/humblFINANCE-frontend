import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { kv } from '@vercel/kv'
interface IRefreshLimit {
  refresh_limit: number
  updated_at: number
}

// next cookies
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const userId = params.get('user_id')
  const supabase = createClient()

  if (!userId) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
  }

  const data = await supabase.from('profiles').select('*').eq('id', userId)

  if (!data.data) {
    return NextResponse.json({ error: 'Missing user data' }, { status: 400 })
  }

  const existedRefreshLimit = await kv.get<IRefreshLimit>(
    userId + '_refresh_limit'
  )
  if (!existedRefreshLimit || existedRefreshLimit.updated_at < Date.now()) {
    await kv.set(userId + '_refresh_limit', {
      refresh_limit: data.data[0].refresh_limit,
      updated_at: Date.now(),
    })
    return NextResponse.json({
      refresh_limit: data.data[0].refresh_limit,
      updated_at: Date.now(),
    })
  }

  return NextResponse.json(existedRefreshLimit)
}

export async function PATCH(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const userId = params.get('user_id')

  if (!userId) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
  }

  const existedCookie = await kv.get<IRefreshLimit>(userId + '_refresh_limit')
  if (!existedCookie) {
    return NextResponse.json({ error: 'Missing user data' }, { status: 400 })
  }

  await kv.set(
    userId + '_refresh_limit',
    JSON.stringify({
      refresh_limit: existedCookie.refresh_limit - 1,
      updated_at: existedCookie.updated_at,
    })
  )

  return NextResponse.json({ message: 'success' })
}
