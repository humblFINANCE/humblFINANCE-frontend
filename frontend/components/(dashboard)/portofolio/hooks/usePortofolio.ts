import { create } from 'zustand'
import {
  IWatchList,
  IWatchListAction,
  IWatchlistParams,
  IWatchListState,
} from '../types'
import { ENDPOINTS } from '../constants'

const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL

export const usePortofolio = create<IWatchListState & IWatchListAction>(
  (set) => ({
    watchlists: [],
    setWatchlists: (watchlists: IWatchList[]) => set({ watchlists }),
    getWatchlists: async (params: IWatchlistParams) => {
      try {
        const url = new URL(FASTAPI_URL + ENDPOINTS.USERTABLE)
        for (const item in params) {
          if (!params[item]) continue
          url.searchParams.set(item, params[item])
        }

        const response = await fetch(url.toString())
        const data = await response.json()

        set(() => ({ watchlists: data }))
      } catch (err) {
        console.log(err)
      }
    },
  })
)
