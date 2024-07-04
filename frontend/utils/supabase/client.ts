import { createBrowserClient } from '@supabase/ssr'
import { isAnonymouseUser } from './isAnonymouseUser'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

export const isAnonymouseUserClient = () => isAnonymouseUser(createClient())
