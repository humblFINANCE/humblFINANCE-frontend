'use client'

import { cn } from '@/utils/nextui/cn'
import { InlineIcon } from '@iconify/react'
import { Button, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import * as agGrid from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import WatchList from './WatchListModal'
import dataTable from './data'
import { IDataWatchList } from './types'

const colDefs: agGrid.ColDef[] = [
  { field: 'symbol', minWidth: 100 },
  { field: 'last_close', headerName: 'Last Close', minWidth: 100 },
  {
    field: 'mandelbrot_channel_buy',
    headerName: 'Buy Price',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'mandelbrot_channel_sell',
    headerName: 'Sell Price',
    flex: 1,
    minWidth: 100,
  },
  { field: 'up_down', headerName: 'Up/Down' },
  { field: 'risk_reward', headerName: 'Risk Reward', flex: 1, minWidth: 120 },
  { field: 'asset_class', headerName: 'Asset Class', flex: 1, minWidth: 120 },
  { field: 'sector', headerName: 'Sector', flex: 2, minWidth: 150 },
  {
    field: 'humbl_suggestion',
    headerName: 'Humbl Suggestion',
    flex: 2,
    minWidth: 150,
  },
]

const defaultColDef: agGrid.ColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
}

const UserTable = () => {
  const { theme } = useTheme()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [watchlists, setWatchlists] = useState<string[]>([])

  return (
    <div className="h-full flex flex-col">
      <div className=" flex items-center gap-2 mb-2">
        <Select
          aria-label="Select Sectore"
          placeholder={
            watchlists.length === 0 ? 'No Watchlist' : 'Select watclist'
          }
          defaultSelectedKeys={['healthcare']}
          className="max-w-xs"
          scrollShadowProps={{
            isEnabled: false,
          }}
        >
          {watchlists &&
            watchlists.map((watchlist) => (
              <SelectItem key={watchlist}>{watchlist}</SelectItem>
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
          rowData={dataTable as IDataWatchList[]}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      <WatchList
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setWatchlists={setWatchlists}
        watchlists={watchlists}
      />
    </div>
  )
}

export default UserTable
