import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { kv } from '@vercel/kv'
interface IRefreshLimit {
  refresh_limit: number
  updated_at: number
  expired_at: number
}

const initRefreshLimit = async (userId: string, refresh_limit: number) => {
  const payload = {
    refresh_limit: refresh_limit,
    // updated_at: Date.now(),
    // expired_at: Date.now() + 86400,
  }

  await kv.set(userId + '_refresh_limit', payload, { ex: 86400, nx: true })
  return payload
}

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  try {
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

    if (!existedRefreshLimit) {
      const newRefreshLimit = await initRefreshLimit(
        userId,
        parseInt(data.data[0].refresh_limit)
      )
      return NextResponse.json(newRefreshLimit)
    }

    return NextResponse.json(existedRefreshLimit)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const userId = params.get('user_id')

    if (!userId) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
    }

    const existedRefreshLimit = await kv.get<IRefreshLimit>(
      userId + '_refresh_limit'
    )

    if (!existedRefreshLimit) {
      const supabase = createClient()
      const data = await supabase.from('profiles').select('*').eq('id', userId)

      if (!data.data) {
        return NextResponse.json(
          { error: 'Missing user data' },
          { status: 400 }
        )
      }

      await initRefreshLimit(userId, parseInt(data.data[0].refresh_limit))

      return NextResponse.json({ message: 'success' })
    }

    await kv.set(
      userId + '_refresh_limit',
      JSON.stringify({
        refresh_limit: existedRefreshLimit.refresh_limit - 1,
        updated_at: Date.now(),
        expired_at: existedRefreshLimit.expired_at,
      })
    )

    return NextResponse.json({ message: 'success' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
