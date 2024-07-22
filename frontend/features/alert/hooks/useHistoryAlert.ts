import { createClient } from '@/utils/supabase/client'
import { create } from 'zustand'
import ALERT_TABLES from '@/features/alert/constants/ALERT_TABLES'

export const useHistoryAlert = create((set) => ({
  historyAlert: [],
  getHistoryAlert: async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from(ALERT_TABLES.HISTORY)
      .select('*')
      .order('fired_at', { ascending: false })

    if (error) return console.log(error)

    set(() => ({ historyAlert: data }))
  },
}))
