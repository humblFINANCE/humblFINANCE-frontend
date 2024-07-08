import { create } from 'zustand'
import React from 'react'
import { ITickerAction, ITickerState } from '../types'
import { createClient } from '@/utils/supabase/client'
import { TABLES } from '../constants'

export const useTickerStore = create<ITickerState & ITickerAction>(
  (set, get) => ({
    tickers: [],
    getTickers: async (watchlist_id: number) => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from(TABLES.TICKER)
        .select('*')
        .eq('watchlist_id', watchlist_id)

      if (error) {
        console.log(error)
      } else {
        set(() => ({ tickers: data }))
      }
    },

    addTicker: async (ticker: string, watchlist_id: number) => {
      const supabase = createClient()

      const { error } = await supabase
        .from(TABLES.TICKER)
        .insert({ ticker_symbol: ticker, watchlist_id: watchlist_id })

      if (error) {
        console.log(error)
        return
      }

      await get().getTickers(watchlist_id)
    },
    deleteTicker: async (ticker_id: number, watchlist_id: number) => {
      const supabase = createClient()

      const { error } = await supabase
        .from(TABLES.TICKER)
        .delete()
        .eq('ticker_id', ticker_id)
        .eq('watchlist_id', watchlist_id)

      if (error) {
        console.log(error)
        return
      }

      await get().getTickers(watchlist_id)
    },
  })
)
