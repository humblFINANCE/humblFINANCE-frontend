'use client'

import { cn } from '@/utils/cn'
import { InlineIcon } from '@iconify/react'
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import * as agGrid from '@ag-grid-community/core'
import { AgGridReact } from '@ag-grid-community/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState, useCallback } from 'react'
import { usePortfolio } from '@/components/(dashboard)/portfolio/hooks/usePortfolio'
import useWatchlist from '@/components/(dashboard)/portfolio/hooks/useWatchlist'
import {
  IPortfolioParams,
  IWatchlist,
} from '@/components/(dashboard)/portfolio/types'
import WatchListModal from '@/components/(dashboard)/portfolio/WatchListModal'
import { useUser } from '@/features/user/hooks/use-user'
import { setCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useRefreshLimit } from '@/components/(dashboard)/portfolio/hooks/useRefreshLimit'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

const colDefs: agGrid.ColDef[] = [
  { field: 'symbol', minWidth: 100 },
  {
    field: 'buy_price',
    headerName: 'Buy Price',
    flex: 1,
    minWidth: 100,
  },
  { field: 'last_price', headerName: 'Recent Price', minWidth: 100 },
  {
    field: 'sell_price',
    headerName: 'Sell Price',
    flex: 1,
    minWidth: 100,
  },
  { field: 'ud_pct', headerName: 'Down/Up (%)' },
  { field: 'ud_ratio', headerName: 'Down/Up Ratio', flex: 1, minWidth: 120 },
  { field: 'asset_class', headerName: 'Asset Class', flex: 1, minWidth: 120 },
  { field: 'sector', headerName: 'Sector', flex: 2, minWidth: 150 },
]

const defaultColDef: agGrid.ColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
}

agGrid.ModuleRegistry.registerModules([ClientSideRowModelModule])

const UserTable = () => {
  const { theme } = useTheme()
  const { profile, user, openModalConvertUser } = useUser()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const getPortfolio = usePortfolio((store) => store.getPortfolio)
  const portfolio = usePortfolio((store) => store.portfolio)
  const loading = usePortfolio((store) => store.loading)
  const clearPortofolio = usePortfolio((store) => store.clearPortofolio)

  const watchlists = useWatchlist((store) => store.watchlists)
  const getWatchlists = useWatchlist((store) => store.getWatchlists)
  const loadingWatchlist = useWatchlist((store) => store.loading)
  const setDefaultWatchlist = useWatchlist((store) => store.setDefaultWatchlist)

  const [isLoadingRefreshLimit, setIsLoadingRefreshLimit] = useState(false)
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>('')
  const { decrementRefreshLimit, getRefreshLimit } = useRefreshLimit()

  const getData = useCallback(
    async (props?: { withRefresh?: boolean }) => {
      const params: IPortfolioParams = {
        symbols: '',
        membership: profile?.membership!,
      }

      if (selectedWatchlist) {
        const currentWatchlists = props?.withRefresh
          ? ((await getWatchlists()) as IWatchlist[])
          : watchlists

        const symbols = currentWatchlists.find(
          (watchlist) => watchlist.id === +selectedWatchlist
        )

        localStorage.setItem('selectedWatchlistId', selectedWatchlist)

        if (!params.membership) return
        if (!symbols) return
        if (symbols) {
          toast.dismiss()
          if (symbols.watchlist_symbols.length === 0) {
            clearPortofolio()
            toast.warning('Selected Watchlist is Empty')
            return
          }
          params.symbols = symbols.watchlist_symbols
            .map((ticker) => ticker.symbol)
            .join(',')
          params.membership = profile?.membership!
        }

        await getPortfolio(params, props?.withRefresh)
      }
    },
    [selectedWatchlist, watchlists, profile?.membership]
  )

  const handleRefreshWatchlist = useCallback(async () => {
    if (user.is_anonymous) {
      toast.warning(
        "You're account membership is Anonymous please upgrade your account"
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

    if (limitCookie.refresh_limit === 0) {
      toast.warning(
        'You have used all your free data for the day, please come back tomorrow or upgrade your account'
      )
      openModalConvertUser()
      return
    }

    await getData({ withRefresh: true })
    await decrementRefreshLimit(profile?.id!)
  }, [portfolio, watchlists])

  useEffect(() => {
    const fetch = async () => {
      const dataWatchlist = await getWatchlists()
      const savedWatchlistId = localStorage.getItem('selectedWatchlistId')
      const defaultWatchlists = dataWatchlist?.filter(
        (watchlist) => watchlist.is_default === true
      )

      // If there are multiple default watchlists, select the first one
      if (!!defaultWatchlists && defaultWatchlists.length > 1) {
        setDefaultWatchlist(defaultWatchlists[0].id)
      }

      if (savedWatchlistId || !!defaultWatchlists) {
        setSelectedWatchlist(
          savedWatchlistId
            ? savedWatchlistId
            : defaultWatchlists?.[0]?.id.toString() ?? ''
        )
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    getData()
  }, [selectedWatchlist, profile?.membership])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <Select
          id="select-watchlist"
          aria-label="Select Watchlist"
          placeholder={
            watchlists.length === 0
              ? 'Please Create a Watchlist'
              : 'Select Watchlist'
          }
          className="max-w-xs"
          scrollShadowProps={{
            isEnabled: false,
          }}
          onChange={(e) => {
            setSelectedWatchlist(e.target.value)
          }}
          selectedKeys={[selectedWatchlist]}
        >
          {watchlists &&
            watchlists.map((watchlist) => (
              <SelectItem key={watchlist.id}>{watchlist.name}</SelectItem>
            ))}
        </Select>
        <Tooltip color={`default`} content={`Manage Watchlists`}>
          <Button
            isLoading={isLoadingRefreshLimit || loading || loadingWatchlist}
            id="add-watchlist"
            className="bg-clip text-white-500 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"
            style={{
              opacity: 1,
            }}
            onPress={onOpen}
            endContent={
              <InlineIcon
                icon={'solar:folder-with-files-linear'}
                fontSize={28}
              />
            }
          >
            <div className="hidden lg:block">Add</div>
          </Button>
        </Tooltip>
        <Tooltip color={`default`} content={`Refresh Watchlist`}>
          <Button
            isLoading={isLoadingRefreshLimit || loading || loadingWatchlist}
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
          rowData={portfolio ?? []}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          noRowsOverlayComponent={() => (
            <div>Watchlist is Empty. Please add Symbols.</div>
          )}
          loading={loading}
          loadingOverlayComponent={() => <Spinner size="lg" />}
        />
      </div>
      <WatchListModal isOpen={isOpen} onOpenChange={onOpenChange} />
      {/* <Modal
        isOpen={loading || loadingWatchlist}
        size="sm"
        isDismissable={false}
        hideCloseButton={true}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalBody>
            <Spinner size="lg" />
            <p className="text-center">
              {loading ? 'Processing...' : 'Saving watchlist'}
            </p>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </div>
  )
}

export default UserTable
