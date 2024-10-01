import { create } from 'zustand'
import {
  IPortfolioAction,
  IPortfolioState,
} from '@/features/dashboard/types/types'

export const useTradingViewSPX = create<IPortfolioState & IPortfolioAction>(
  (set, get) => ({
    tradingView: [],
    loading: false,
    getTradingSPX: async ({ params, shouldRefresh }) => {
      try {
        set(() => ({ loading: true }))

        const headers = new Headers()
        headers.set('Content-Type', 'application/json')

        if (shouldRefresh) {
          headers.set('Cache-Control', 'no-cache')
          headers.set('Pragma', 'no-cache')
        } else {
          headers.set('Cache-Control', 'max-age=60') // added 1m cache to prevent Safari caching bug
          headers.set('Pragma', 'max-age=60') // added 1m cache to prevent Safari caching bug
        }

        const response = await fetch(
          '/api/mandelbrot-channel?' + new URLSearchParams(params).toString(),
          { method: 'GET', headers }
        )

        const { data } = await response.json()

        set(() => ({ tradingView: data, loading: false }))
      } catch (err) {
        console.log(err)
        set(() => ({ loading: false }))
      }
    },
  })
)
