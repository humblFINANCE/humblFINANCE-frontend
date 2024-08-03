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
    getPortfolio: async (params, refresh) => {
      try {
        set(() => ({ loading: true }))

        const response = await fetch(
          '/api/user-table?' + new URLSearchParams(params).toString(),
          {
            method: 'GET',
            next: { tags: ['portfolio'] },
            cache: refresh ? 'no-store' : 'force-cache',
          }
        )

        const { data } = await response.json()
        if (Array.isArray(data) && data.length === 0) {
          throw new Error('Symbols parameter cannot be empty')
        }

        set(() => ({ portfolio: data, loading: false }))
      } catch (err) {
        console.log(err)
        set(() => ({ portfolio: [], loading: false }))
      }
    },
  })
)
