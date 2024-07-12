import { create } from 'zustand'
import React from 'react'
import { ITickerAction, ITickerState } from '../types'
import { createClient } from '@/utils/supabase/client'
import { TABLES } from '../constants'

export const useTickerStore = create<ITickerState & ITickerAction>(
  (set, get) => ({
    tickers: [],
    error: '',
    getTickers: async (watchlist_id: number) => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from(TABLES.WATCHLIST_SYMBOLS)
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
      set(() => ({ error: '' }))

      const allSymbols = await supabase
        .from(TABLES.ALL_SYMBOLS)
        .select('*')
        .eq('symbol', ticker)

      if (allSymbols.data?.length === 0) {
        set(() => ({ error: 'Ticker not found' }))
        return
      }

      if (get().tickers.find((item) => item.ticker_symbol === ticker)) {
        set(() => ({ error: 'Ticker already added' }))
        return
      }

      const { error } = await supabase
        .from(TABLES.WATCHLIST_SYMBOLS)
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
        .from(TABLES.WATCHLIST_SYMBOLS)
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
