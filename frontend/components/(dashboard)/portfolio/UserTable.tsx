'use client'

import { cn } from '@/utils/nextui/cn'
import { Icon, InlineIcon } from '@iconify/react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
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
import { IPortfolioParams } from '@/components/(dashboard)/portfolio/types'
import WatchListModal from '@/components/(dashboard)/portfolio/WatchListModal'
import { useUser } from '@/features/user/hooks/use-user'
import { getCookie, setCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useRefreshLimit } from './hooks/useRefreshLimit'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'

const colDefs: agGrid.ColDef[] = [
  { field: 'symbol', minWidth: 100 },
  { field: 'last_price', headerName: 'Recent Price', minWidth: 100 },
  {
    field: 'buy_price',
    headerName: 'Buy Price',
    flex: 1,
    minWidth: 100,
  },
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
  const { profile, user, refetchProfile, openModalConvertUser } = useUser()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { getPortfolio, portfolio, loading } = usePortfolio()
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const { watchlists, getWatchlists, loading: loadingWatclist } = useWatchlist()
  const [value, setValue] = useState<string>('')
  const { decrementRefreshLimit, getRefreshLimit } = useRefreshLimit()

  const getData = useCallback(async () => {
    const params: IPortfolioParams = {
      symbols: '',
      membership: profile?.membership!,
    }

    if (value) {
      const symbols = watchlists.find((watchlist) => watchlist.id === +value)
      localStorage.setItem('selectedWatchlistId', value)

      if (!params.membership) return
      if (!symbols) return
      if (symbols) {
        if (symbols.watchlist_symbols.length === 0) return
        params.symbols = symbols.watchlist_symbols
          .map((ticker) => ticker.symbol)
          .join(',')
        params.membership = profile?.membership!
      }

      await getPortfolio(params, shouldRefresh)
    }
  }, [value, watchlists, shouldRefresh, profile?.membership])

  const handleRefreshWatchlist = useCallback(async () => {
    if (user.is_anonymous) {
      toast.warning(
        "You're account membership is Anonymous please upgrade your account"
      )
      openModalConvertUser()
      return
    }

    const limitCookie = await getRefreshLimit(user?.id)

    if (!limitCookie) {
      toast.error('Something went wrong please refresh the page and try again')
      return
    }

    if (limitCookie.refresh_limit === 0) {
      toast.warning(
        'You have used all your free data for the day, please come back tommorow or upgrade your account'
      )
      openModalConvertUser()
      return
    }

    setShouldRefresh(() => true)
    await getData()
    await decrementRefreshLimit(profile?.id!)
    setShouldRefresh(() => false)
  }, [portfolio, watchlists])

  useEffect(() => {
    const fetch = async () => {
      const dataWatchlist = await getWatchlists()
      setCookie(
        'pathname',
        watchlists
          ?.filter((id: any) => id.is_default === true)[0]
          ?.id?.toString()
      )

      if (dataWatchlist) {
        let savedValue =
          localStorage.getItem('selectedWatchlistId') ??
          dataWatchlist
            ?.filter((id: any) => id.is_default === true)[0]
            ?.id?.toString()

        setValue(savedValue)
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    getData()
  }, [value])

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <Select
          id='select-watchlist'
          aria-label="Select Sectore"
          placeholder={
            watchlists.length === 0 ? 'No Watchlist' : 'Select Watchlist'
          }
          className="max-w-xs"
          scrollShadowProps={{
            isEnabled: false,
          }}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          selectedKeys={[value]}
        >
          {watchlists &&
            watchlists.map((watchlist) => (
              <SelectItem key={watchlist.id}>{watchlist.name}</SelectItem>
            ))}
        </Select>
        <Tooltip color={`default`} content={`Add Watchlist`}>
          <Button
            isLoading={loading || loadingWatclist}
            id="add-watchlist"
            className="bg-clip text-white-500 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"
            style={{
              opacity: 1,
            }}
            onPress={onOpen}
            endContent={<InlineIcon icon={'mdi:gear'} fontSize={28} />}
          >
            <div className="hidden lg:block">Add</div>
          </Button>
        </Tooltip>
        <Tooltip color={`default`} content={`Refresh Watchlist`}>
          <Button
            isLoading={loading || loadingWatclist}
            id="refresh-watchlist"
            className="bg-clip text-white-500 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"
            style={{
              opacity: 1,
            }}
            onPress={handleRefreshWatchlist}
            endContent={<Icon icon="oui:refresh" fontSize={28} />}
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
          loading={loading}
          loadingOverlayComponent={() => <Spinner size="lg" />}
        />
      </div>
      <WatchListModal isOpen={isOpen} onOpenChange={onOpenChange} />
      {/* <Modal
        isOpen={loading || loadingWatclist}
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
