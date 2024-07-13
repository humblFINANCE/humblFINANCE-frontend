'use client'

import { cn } from '@/utils/nextui/cn'
import { InlineIcon } from '@iconify/react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from '@nextui-org/react'
import * as agGrid from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useTheme } from 'next-themes'
import { useEffect, useState, useCallback } from 'react'
import { usePortfolio } from '@/components/(dashboard)/portfolio/hooks/usePortfolio'
import { useTickerStore } from '@/components/(dashboard)/portfolio/hooks/useTickerStore'
import useWatchlist from '@/components/(dashboard)/portfolio/hooks/useWatchlist'
import { IPortfolioParams } from '@/components/(dashboard)/portfolio/types'
import WatchListModal from '@/components/(dashboard)/portfolio/WatchListModal'

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
  // {
  //   field: 'humbl_suggestion',
  //   headerName: 'Humbl Suggestion',
  //   flex: 2,
  //   minWidth: 150,
  // },
]

const defaultColDef: agGrid.ColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
}

const UserTable = () => {
  const { theme } = useTheme()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { getPortfolio, portfolio, loading } = usePortfolio()
  const { watchlists, getWatchlists } = useWatchlist()
  const [value, setValue] = useState<string>('')

  const getData = useCallback(async () => {
    const params: IPortfolioParams = {
      symbols: '',
      membership: '',
    }

    if (value === '') {
      await getPortfolio(params)
    }

    if (value) {
      const symbols = watchlists.find((watchlist) => watchlist.id === +value)

      if (symbols) {
        params.symbols = symbols.watchlist_symbols
          .map((ticker) => ticker.ticker_symbol)
          .join(',')
        params.membership = ''
      }

      await getPortfolio(params)
    }
  }, [value, watchlists, getPortfolio])

  useEffect(() => {
    getWatchlists()
    getData()
  }, [getWatchlists, getData])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="h-full flex flex-col">
      <div className=" flex items-center gap-2 mb-2">
        <Select
          aria-label="Select Sectore"
          placeholder={
            watchlists.length === 0 ? 'No Watchlist' : 'Select watclist'
          }
          className="max-w-xs"
          scrollShadowProps={{
            isEnabled: false,
          }}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        >
          {watchlists &&
            watchlists.map((watchlist) => (
              <SelectItem key={watchlist.id}>{watchlist.name}</SelectItem>
            ))}
        </Select>
        <Button
          id="watchlist-setting"
          className="bg-transparent"
          isIconOnly
          onPress={onOpen}
        >
          <InlineIcon icon={'mdi:gear'} fontSize={28} />
        </Button>
      </div>
      <div
        className={cn(
          'h-full ',
          theme === 'light' ? 'ag-theme-custom-light' : 'ag-theme-custom-dark'
        )}
      >
        <AgGridReact
          rowData={portfolio}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      <WatchListModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <Modal
        isOpen={loading}
        size="sm"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <Spinner size="lg" />
              <p className="text-center">Please wait</p>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UserTable
