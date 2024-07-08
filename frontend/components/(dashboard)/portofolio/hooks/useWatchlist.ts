import { createClient } from '@/utils/supabase/client'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { TABLES } from '../constants'
import { IWatchlistAction, IWatchlistState } from '../types'
import { useTickerStore } from './useTickerStore'

const useWatchlist = create<IWatchlistState & IWatchlistAction>((set, get) => ({
  watchlists: [],
  getWatchlists: async () => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from(TABLES.WATCHLIST)
      .select('*')
      .eq('user_id', user.data.user?.id)

    console.log(data)

    if (error) {
      console.log(error)
    } else {
      set(() => ({ watchlists: data }))
    }
  },

  addWatchlist: async (watchlist: string) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const { error } = await supabase.from(TABLES.WATCHLIST).insert({
      name: watchlist,
      user_id: user.data.user?.id,
      created_at: new Date(),
    })

    if (error) {
      console.log(error)
      return
    }
    await get().getWatchlists()
  },

  removeWatchlist: async (watchlistId: number) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const { error: deleteTickerError } = await supabase
      .from(TABLES.TICKER)
      .delete()
      .eq('watchlist_id', watchlistId)

    if (deleteTickerError) {
      console.log(deleteTickerError)
      return
    }

    const { error } = await supabase
      .from(TABLES.WATCHLIST)
      .delete()
      .eq('watchlist_id', watchlistId)
      .eq('user_id', user.data.user?.id)

    if (error) {
      console.log(error)
      toast.error(error.message)
      return
    }

    await useTickerStore.getState().getTickers(watchlistId)
    await get().getWatchlists()
  },

  updateWatchlist: async (id: number, name: string) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const { error } = await supabase
      .from(TABLES.WATCHLIST)
      .update({ name: name })
      .eq('watchlist_id', id)
      .eq('user_id', user.data.user?.id)

    if (error) {
      console.log(error)
      return
    }

    await get().getWatchlists()
  },
}))

export default useWatchlist
