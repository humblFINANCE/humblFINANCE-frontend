import {create} from 'zustand'
import {
    IPortfolioAction,
    IPortfolioState,
} from '@/features/dashboard/types/types'

export const useTradingViewSPX = create<IPortfolioState & IPortfolioAction>(
    (set, get) => ({
        portfolio: [],
        tradingView: [],
        loading: false,
        getTradingSPX: async (params?: any) => {
            try {
                set(() => ({loading: true}))

                const response = await fetch(
                    '/api/mandelbrot-channel?' + new URLSearchParams(params).toString(),
                    {
                        method: 'GET',
                    }
                )

                const data = await response.json()

                set(() => ({tradingView: data, loading: false}))
            } catch (err) {
                console.log(err)
                set(() => ({loading: false}))
            }
        },
    })
)
