import { create } from 'zustand'
import React from 'react'
import {
  ISymbolAction,
  ISymbolState,
} from '@/components/(dashboard)/portfolio/types'
import { createClient } from '@/utils/supabase/client'
import { TABLES } from '@/components/(dashboard)/portfolio/constants'

export const useTickerStore = create<ISymbolState & ISymbolAction>(
  (set, get) => ({
    symbols: [],
    error: '',
    getSymbols: async (watchlist_id: number) => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from(TABLES.WATCHLIST_SYMBOLS)
        .select('*')
        .eq('watchlist_id', watchlist_id)

      if (error) {
        console.log(error)
      } else {
        set(() => ({ symbols: data }))
      }
    },

    addTicker: async (symbol: string, watchlist_id: number) => {
      const supabase = createClient()
      set(() => ({ error: '' }))

      const allSymbols = await supabase
        .from(TABLES.ALL_SYMBOLS)
        .select('*')
        .eq('symbol', symbol)

      if (allSymbols.data?.length === 0) {
        set(() => ({ error: 'Ticker not found' }))
        return
      }

      if (get().symbols.find((item) => item.symbol === symbol)) {
        set(() => ({ error: 'Ticker already added' }))
        return
      }

      const { error } = await supabase
        .from(TABLES.WATCHLIST_SYMBOLS)
        .insert({ symbol: symbol, watchlist_id: watchlist_id })

      if (error) {
        console.log(error)
        return
      }

      await get().getSymbols(watchlist_id)
    },
    deleteTicker: async (symbol_id: number, watchlist_id: number) => {
      const supabase = createClient()

      const { error } = await supabase
        .from(TABLES.WATCHLIST_SYMBOLS)
        .delete()
        .eq('symbol_id', symbol_id)
        .eq('watchlist_id', watchlist_id)

      if (error) {
        console.log(error)
        return
      }

      await get().getSymbols(watchlist_id)
    },
  })
)
