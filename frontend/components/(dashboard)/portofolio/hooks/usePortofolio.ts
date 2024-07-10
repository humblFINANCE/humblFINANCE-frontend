import { create } from 'zustand'
import {
  IPortofolio,
  IPortofolioAction,
  IPortofolioParams,
  IPortofolioState,
} from '../types'
import { ENDPOINTS } from '../constants'

const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL

export const usePortofolio = create<IPortofolioState & IPortofolioAction>(
  (set) => ({
    portofolio: [],
    loading: false,
    getPortofolio: async (params: IPortofolioParams) => {
      try {
        const url = new URL(FASTAPI_URL + ENDPOINTS.USERTABLE)
        set(() => ({ loading: true }))

        for (const item in params) {
          if (!params[item]) continue
          url.searchParams.set(item, params[item])
        }

        const response = await fetch(url.toString())
        const data = await response.json()

        set(() => ({ portofolio: data, loading: false }))
      } catch (err) {
        console.log(err)
        set(() => ({ loading: false }))
      }
    },
  })
)
