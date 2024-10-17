'use client'

import { cn } from '@/utils/cn'
import * as agGrid from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { useTheme } from 'next-themes'
import React, { useEffect, useState, useCallback } from 'react'
import { useHumblChannel } from '@/features/dashboard/humblCHANNEL/hooks/useHumblChannel'
import { useUser } from '@/features/user/hooks/use-user'
import { Button, Tooltip, Spinner } from '@nextui-org/react'
import { InlineIcon } from '@iconify/react'
import { toast } from 'react-toastify'
import { useRefreshLimit } from '@/components/(dashboard)/portfolio/hooks/useRefreshLimit'

const colDefs: agGrid.ColDef[] = [
  { field: 'symbol', minWidth: 100 },
  {
    field: 'bottom_price',
    headerName: 'Buy Price',
    flex: 1,
    minWidth: 100,
  },
  { field: 'recent_price', headerName: 'Recent Price', minWidth: 100 },
  {
    field: 'top_price',
    headerName: 'Sell Price',
    flex: 1,
    minWidth: 100,
  },
]

const defaultColDef: agGrid.ColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
}

agGrid.ModuleRegistry.registerModules([ClientSideRowModelModule])

const HomeDashboardTable = () => {
  const { theme } = useTheme()
  const { user, openModalConvertUser } = useUser()

  const getHumblChannel = useHumblChannel((store) => store.getHumblChannel)
  const humblChannel = useHumblChannel((store) => store.humblChannel)
  const loading = useHumblChannel((store) => store.loading)

  const { decrementRefreshLimit, getRefreshLimit } = useRefreshLimit()

  const [isLoadingRefreshLimit, setIsLoadingRefreshLimit] = useState(false)

  const getData = useCallback(async (props?: { shouldRefresh?: boolean }) => {
    const symbols = [
      'SPY', // S&P 500 ETF
      '^VIX', // Volatility Index
      'IWM', // Russell 2000 ETF
      'DIA', // Dow Jones Industrial Average ETF
      'QQQ', // Nasdaq 100 ETF
      'UUP', // US Dollar Index
      // 11 Sector ETFs
      'XLY', // Consumer Discretionary
      'XLP', // Consumer Staples
      'XLE', // Energy
      'XLF', // Financials
      'XLV', // Health Care
      'XLI', // Industrials
      'XLB', // Materials
      'XLRE', // Real Estate
      'XLK', // Technology
      'XLC', // Communication Services
      'XLU', // Utilities
      // Additional symbols
      // 'AAPL',
      // 'AMZN',
      // 'MSFT',
      // 'META',
      // 'GOOGL',
      // 'TSLA',
      // 'NVDA',
      // 'UUP',
    ]

    const params = {
      symbols: symbols.join(','),
    }

    await getHumblChannel({ params, shouldRefresh: props?.shouldRefresh })
  }, [])

  const handleRefreshWatchlist = useCallback(async () => {
    if (user.is_anonymous) {
      toast.warning(
        "You're account membership is Anonymous. Please upgrade your account."
      )
      openModalConvertUser()
      return
    }

    setIsLoadingRefreshLimit(true)
    const limitCookie = await getRefreshLimit(user?.id)
    setIsLoadingRefreshLimit(false)

    if (!limitCookie) {
      toast.error('Something went wrong please refresh the page and try again')
      return
    }

    if (limitCookie.refresh_limit <= 0) {
      toast.warning(
        'You have used all your free data for the day, please come back tomorrow or upgrade your account'
      )
      openModalConvertUser()
      return
    }

    await getData({ shouldRefresh: true })
    await decrementRefreshLimit(user?.id!)
  }, [
    decrementRefreshLimit,
    getData,
    getRefreshLimit,
    openModalConvertUser,
    user?.id,
    user.is_anonymous,
  ])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="h-full flex flex-col gap-4 pt-4">
      <div className="flex items-center w-full justify-between">
        <h2 className="text-2xl font-bold">Daily humblCHANNEL Tickers</h2>
        <Tooltip color={`default`} content={`Refresh humblCHANNELS`}>
          <Button
            isLoading={isLoadingRefreshLimit || loading}
            id="refresh-watchlist"
            className="bg-clip text-white-500 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"
            style={{
              opacity: 1,
            }}
            onPress={handleRefreshWatchlist}
            endContent={
              <InlineIcon
                icon={'solar:refresh-circle-line-duotone'}
                fontSize={28}
              />
            }
          >
            <div className="hidden lg:block">Refresh</div>
          </Button>
        </Tooltip>
      </div>
      <div
        className={cn(
          'h-full ',
          theme === 'light' ? 'ag-theme-custom-light' : 'ag-theme-custom-dark'
        )}
      >
        <AgGridReact
          rowData={humblChannel?.data ?? []}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          noRowsOverlayComponent={() => <div>Watchlist is Empty.</div>}
          loading={loading}
          loadingOverlayComponent={() => <Spinner size="lg" />}
        />
      </div>
    </div>
  )
}

export default HomeDashboardTable
