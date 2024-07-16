import { createClient } from '@/utils/supabase/client'
import { create } from 'zustand'
import { TABLES } from '@/components/(dashboard)/portfolio/constants'
import {
  IWatchlistAction,
  IWatchlistState,
} from '@/components/(dashboard)/portfolio/types'
import { useTickerStore } from '@/components/(dashboard)/portfolio/hooks/useTickerStore'
import { useCallback } from 'react'

const useWatchlist = create<IWatchlistState & IWatchlistAction>((set, get) => ({
  watchlists: [],
  loading: false,
  getWatchlists: async () => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from(TABLES.WATCHLIST)
      .select(
        `id,
        user_id,
        name,
        created_at,
        watchlist_symbols(id, watchlist_id, symbol)`
      )
      .eq('user_id', user.data.user?.id)

    if (error) {
      console.log(error)
    } else {
      set(() => ({ watchlists: data }))
    }
  },

  addWatchlist: async (watchlist: string) => {
    set(() => ({ loading: true }))
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const { error } = await supabase.from(TABLES.WATCHLIST).insert({
      name: watchlist,
      user_id: user.data.user?.id,
      created_at: new Date(),
    })

    if (error) {
      console.log(error)
      set(() => ({ loading: false }))
      return
    }
    await get().getWatchlists()
    set(() => ({ loading: false }))
  },

  removeWatchlist: async (watchlistId: number) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const { error: deleteSymbolError } = await supabase
      .from(TABLES.WATCHLIST_SYMBOLS)
      .delete()
      .eq('watchlist_id', watchlistId)

    if (deleteSymbolError) {
      console.log(deleteSymbolError)
      return
    }

    const { error } = await supabase
      .from(TABLES.WATCHLIST)
      .delete()
      .eq('id', watchlistId)
      .eq('user_id', user.data.user?.id)

    if (error) {
      console.log(error)
      return
    }

    await useTickerStore.getState().getSymbols(watchlistId)
    await get().getWatchlists()
  },

  updateWatchlist: async (id: number, name: string) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const { error } = await supabase
      .from(TABLES.WATCHLIST)
      .update({ name: name })
      .eq('id', id)
      .eq('user_id', user.data.user?.id)

    if (error) {
      console.log(error)
      return
    }

    await get().getWatchlists()
  },
}))

export default useWatchlist
