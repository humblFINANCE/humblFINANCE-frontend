import { create } from 'zustand'
import {
  IPortfolio,
  IPortfolioAction,
  IPortfolioParams,
  IPortfolioState,
} from '@/components/(dashboard)/portfolio/types'
import { ENDPOINTS } from '@/components/(dashboard)/portfolio/constants'
import { createClient } from '@/utils/supabase/client'
const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL

export const usePortfolio = create<IPortfolioState & IPortfolioAction>(
  (set, get) => ({
    portfolio: [],
    loading: false,
    getPortfolio: async (params) => {
      try {
        set(() => ({ loading: true }))
        const param = new URLSearchParams(params).toString()
        const url = new URL(FASTAPI_URL + ENDPOINTS.USERTABLE)
        const response = await fetch(url + '?' + param, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'cache-control': 'no-store',
          },
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
