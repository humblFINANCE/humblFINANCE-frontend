import { Profile } from '@/features/user/types/profile'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const updateProfile = async (id: string, data: Profile) => {
    setIsLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('profiles').update(data).eq('id', id)
    if (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  return {
    updateProfile,
    isLoading,
    error,
  }
}
