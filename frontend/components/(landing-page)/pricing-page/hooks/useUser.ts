import { create } from 'zustand'

import { createClient } from '@/utils/supabase/client'
import { User } from '@/features/user/types'
import { Profile } from '@/features/user/types/profile'

interface UserState {
  profile: Profile | null
}

interface UserActions {
  getProfile: (user: User) => Promise<void>
}

const useProfile = create<UserState & UserActions>((set) => ({
  profile: null,
  getProfile: async (user) => {
    const supabase = createClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    set({ profile })
  },
}))

export default useProfile
