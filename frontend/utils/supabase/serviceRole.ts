import { createClient } from '@supabase/supabase-js'

export const createServiceRoleClient = () => {
  if (typeof window !== 'undefined') {
    throw new Error('you cannot initiate serviceRoleClient at browser')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
