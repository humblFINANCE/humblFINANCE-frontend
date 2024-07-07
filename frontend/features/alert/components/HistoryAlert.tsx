'use client'
import { cn } from '@/utils/nextui/cn'
import { Icon } from '@iconify/react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
} from '@nextui-org/react'
import * as agGrid from 'ag-grid-community'
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react'
import { useTheme } from 'next-themes'
import CustomButton from './CustomButton'

const colDefs: agGrid.ColDef[] = [
  { field: 'symbol', minWidth: 100, flex: 1 },
  { field: 'alert', minWidth: 300, flex: 2 },
  {
    field: 'fired_at',
    headerName: 'Fired At',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'action',
    headerName: 'Action',
    minWidth: 100,
    flex: 1,
    type: 'rightAligned',
    cellRenderer: (param: CustomCellRendererProps) => (
      <CustomButton
        params={param}
        index={0}
        onClickDetail={() => {}}
        onClickDelete={() => {}}
      />
    ),
  },
]

function HistoryAlert() {
  const { theme } = useTheme()

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <h2 className="text-3xl">History</h2>
      <Spacer y={3} />
      <div
        className={cn(
          ' bg-green-200 ',
          theme === 'light' ? 'ag-theme-custom-light' : 'ag-theme-custom-dark'
        )}
        style={{
          height: 300,
        }}
      >
        <AgGridReact
          rowData={[
            {
              symbol: 'AAPL',
              alert: 'Price is greater than $100',
              fired_at: '2022-01-01',
            },
          ]}
          columnDefs={colDefs}
          pagination
          defaultColDef={{
            minWidth: 50,
            resizable: true,
          }}
          paginationAutoPageSize
        />
        {/* <p>no history</p> */}
      </div>
    </div>
  )
}

export default HistoryAlert
