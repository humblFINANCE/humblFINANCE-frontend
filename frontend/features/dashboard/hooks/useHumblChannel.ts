import { create } from 'zustand'
import {
  IPortfolioAction,
  IPortfolioState,
} from '@/features/dashboard/types/types'

export const useHumblChannel = create<IPortfolioState & IPortfolioAction>(
  (set, get) => ({
    humblChannel: null,
    loading: false,
    getHumblChannel: async ({ params, shouldRefresh }) => {
      try {
        set(() => ({ loading: true }))

        const headers = new Headers()
        headers.set('Content-Type', 'application/json')

        if (shouldRefresh) {
          headers.set('Cache-Control', 'no-cache')
          headers.set('Pragma', 'no-cache')
        } else {
          headers.set('Cache-Control', 'max-age=60')
          headers.set('Pragma', 'max-age=60')
        }

        const response = await fetch(
          '/api/mandelbrot-channel?' + new URLSearchParams(params).toString(),
          { method: 'GET', headers }
        )

        const { response_data, message, status_code } = await response.json()

        if (status_code === 200) {
          set(() => ({ humblChannel: response_data, loading: false }))
        } else {
          console.error('Error fetching data:', message)
          set(() => ({ loading: false }))
        }
      } catch (err) {
        console.error('Error in getHumblChannel:', err)
        set(() => ({ loading: false }))
      }
    },
  })
)
