import { create } from 'zustand'
import {
  IPortfolio,
  IPortfolioAction,
  IPortfolioParams,
  IPortfolioState,
} from '@/components/(dashboard)/portfolio/types'
import { ENDPOINTS } from '@/components/(dashboard)/portfolio/constants'

const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL

export const usePortfolio = create<IPortfolioState & IPortfolioAction>(
  (set) => ({
    portfolio: [],
    loading: false,
    getPortfolio: async (params: IPortfolioParams) => {
      try {
        const url = new URL(FASTAPI_URL + ENDPOINTS.USERTABLE)
        set(() => ({ loading: true }))

        for (const item in params) {
          if (!params[item]) continue
          url.searchParams.set(item, params[item])
        }

        const response = await fetch(url.toString(), {
          next: { tags: ['portfolio'] },
        })

        const data = await response.json()

        set(() => ({ portfolio: data, loading: false }))
      } catch (err) {
        console.log(err)
        set(() => ({ loading: false }))
      }
    },
  })
)
