import { createClient } from '@/utils/supabase/client'
import { create } from 'zustand'
import { TABLES } from '@/components/(dashboard)/portfolio/constants'
import {
  IWatchlistAction,
  IWatchlistState,
} from '@/components/(dashboard)/portfolio/types'
import { useTickerStore } from '@/components/(dashboard)/portfolio/hooks/useTickerStore'

const useWatchlist = create<IWatchlistState & IWatchlistAction>((set, get) => ({
  watchlists: [],
  loading: false,
  getWatchlists: async () => {
    set(() => ({ loading: true }))

    try {
      const supabase = createClient()
      const user = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from(TABLES.WATCHLIST)
        .select(
          `id,
          user_id,
          name,
          is_default,
          created_at,
          watchlist_symbols(id, watchlist_id, symbol)`
        )
        .eq('user_id', user.data.user?.id)
        .order('id', { ascending: true })

      if (error) throw new Error(error.message ?? 'Error getting watchlists')
      set(() => ({ watchlists: data }))
      return data
    } catch (error) {
      console.log(error)
      set(() => ({ watchlists: [] }))
      return []
    } finally {
      set(() => ({ loading: false }))
    }
  },

  addWatchlist: async (watchlist: string) => {
    set(() => ({ loading: true }))

    try {
      const supabase = createClient()
      const user = await supabase.auth.getUser()

      const { data: defaultWatchlists, error: errorCheck } = await supabase
        .from(TABLES.WATCHLIST)
        .select('id')
        .eq('user_id', user.data.user?.id)
        .eq('is_default', true)

      if (errorCheck)
        throw new Error(
          errorCheck.message ?? 'Error checking default watchlist'
        )

      let hasDefaultWatchlist = defaultWatchlists.length > 0

      /* If there are multiple default watchlists, reset all to false.
         Then set the new watchlist as default */
      if (defaultWatchlists.length > 1) {
        const { error: errorReset } = await supabase
          .from(TABLES.WATCHLIST)
          .update({ is_default: false })
          .eq('user_id', user.data.user?.id)
          .eq('is_default', true)

        if (errorReset)
          throw new Error(
            errorReset.message ?? 'Error resetting default watchlist'
          )

        hasDefaultWatchlist = false
      }

      const { error } = await supabase.from(TABLES.WATCHLIST).insert({
        name: watchlist,
        is_default: !hasDefaultWatchlist,
        user_id: user.data.user?.id,
        created_at: new Date(),
      })

      if (error) throw new Error(error.message ?? 'Error adding watchlist')

      await get().getWatchlists()
    } catch (error) {
      console.log(error)
    } finally {
      set(() => ({ loading: false }))
    }
  },

  removeWatchlist: async (watchlistId: number) => {
    set(() => ({ loading: true }))

    try {
      const supabase = createClient()
      const user = await supabase.auth.getUser()

      const { error: errorSymbols } = await supabase
        .from(TABLES.WATCHLIST_SYMBOLS)
        .delete()
        .eq('watchlist_id', watchlistId)

      if (errorSymbols)
        throw new Error(
          errorSymbols.message ?? 'Error deleting watchlist symbols'
        )

      const { data: deletedWatchlist, error: errorWatchlist } = await supabase
        .from(TABLES.WATCHLIST)
        .delete()
        .eq('id', watchlistId)
        .eq('user_id', user.data.user?.id)
        .select()

      if (errorWatchlist)
        throw new Error(errorWatchlist.message ?? 'Error deleting watchlist')

      // If deleted watchlist is default, set the first watchlist as default
      if (deletedWatchlist[0].is_default) {
        const { data: newDefaultWatchlist, error: errorNewDefault } =
          await supabase
            .from(TABLES.WATCHLIST)
            .select('id')
            .eq('user_id', user.data.user?.id)
            .order('id', { ascending: true })
            .single()

        if (errorNewDefault)
          throw new Error(
            errorNewDefault.message ?? 'Error getting new default watchlist'
          )

        const { error: errorSetDefault } = await supabase
          .from(TABLES.WATCHLIST)
          .update({ is_default: true })
          .eq('id', newDefaultWatchlist.id)
          .eq('user_id', user.data.user?.id)

        if (errorSetDefault)
          throw new Error(
            errorSetDefault.message ?? 'Error setting new default watchlist'
          )
      }

      useTickerStore.getState().resetSymbols()
      await get().getWatchlists()
    } catch (error) {
      console.log(error)
    } finally {
      set(() => ({ loading: false }))
    }
  },

  updateWatchlist: async (id: number, name: string) => {
    set(() => ({ loading: true }))

    try {
      const supabase = createClient()
      const user = await supabase.auth.getUser()

      const { error } = await supabase
        .from(TABLES.WATCHLIST)
        .update({ name: name })
        .eq('id', id)
        .eq('user_id', user.data.user?.id)

      if (error) throw new Error(error.message ?? 'Error updating watchlist')
      await get().getWatchlists()
    } catch (error) {
      console.log(error)
    } finally {
      set(() => ({ loading: false }))
    }
  },

  setDefaultWatchlist: async (id: number) => {
    set(() => ({ loading: true }))

    try {
      const supabase = createClient()
      const user = await supabase.auth.getUser()

      const { error: errorReset } = await supabase
        .from(TABLES.WATCHLIST)
        .update({ is_default: false })
        .eq('user_id', user.data.user?.id)

      if (errorReset)
        throw new Error(
          errorReset.message ?? 'Error resetting default watchlist'
        )

      const { error: errorSetDefault } = await supabase
        .from(TABLES.WATCHLIST)
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.data.user?.id)

      if (errorSetDefault)
        throw new Error(
          errorSetDefault.message ?? 'Error setting default watchlist'
        )

      await get().getWatchlists()
    } catch (error) {
      console.log(error)
    } finally {
      set(() => ({ loading: false }))
    }
  },
}))

export default useWatchlist
