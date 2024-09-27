import { create } from 'zustand'
import {
  IPortfolioAction,
  IPortfolioState,
} from '@/components/(dashboard)/portfolio/types'
import { ENDPOINTS } from '@/components/(dashboard)/portfolio/constants'
const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL

export const usePortfolio = create<IPortfolioState & IPortfolioAction>(
  (set, get) => ({
    portfolio: [],
    loading: false,
    getPortfolio: async (params, shouldRefresh) => {
      try {
        set(() => ({ loading: true }))
        const param = new URLSearchParams(params).toString()
        const url = new URL(FASTAPI_URL + ENDPOINTS.USERTABLE)
        const headers = new Headers()

        if (shouldRefresh) {
          headers.set('Cache-Control', 'no-cache')
          headers.set('Pragma', 'no-cache')
        } else {
          headers.set('Cache-Control', 'max-age=60') // added 1m cache to prevent Safari caching bug
          headers.set('Pragma', 'max-age=60') // added 1m cache to prevent Safari caching bug
        }

        // if (shouldRefresh) {
        //   headers.set('Cache-Control', 'no-cache')
        //   headers.set('Pragma', 'no-cache')
        // } else {
        //   headers.delete('Cache-Control')
        //   headers.delete('Pragma')
        // }

        const response = await fetch(url + '?' + param, {
          method: 'GET',
          cache: 'no-store', // Prevent disk cache. Use caching mechanism from the server instead
          headers,
        })

        const { response_data } = await response.json()
        const { data } = response_data
        if (Array.isArray(data) && data.length === 0) {
          throw new Error('Symbols parameter cannot be empty')
        }

        set(() => ({ portfolio: data, loading: false }))
      } catch (err) {
        console.log(err)
        set(() => ({ portfolio: [], loading: false }))
      }
    },
    clearPortofolio: () => {
      set(() => ({ portfolio: [], loading: false }))
    },
  })
)
