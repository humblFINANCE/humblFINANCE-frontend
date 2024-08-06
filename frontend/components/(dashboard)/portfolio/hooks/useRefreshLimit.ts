import { createClient } from '@/utils/supabase/client'

export const useRefreshLimit = () => {
  const getRefreshLimit = async (userId: string) => {
    const res = await fetch(`/api/refresh-limit?user_id=${userId}`)
    const data = await res.json()

    return data
  }

  const decrementRefreshLimit = async (userId: string) => {
    const res = await fetch(`/api/refresh-limit?user_id=${userId}`, {
      method: 'PATCH',
    })
    const data = await res.json()
    return data
  }

  return {
    getRefreshLimit,
    decrementRefreshLimit,
  }
}
