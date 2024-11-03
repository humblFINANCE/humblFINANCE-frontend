'use client'
import { cn } from '@/utils/cn'
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
import CustomButton from '@/features/alert/components/active-alert/CustomButton'
import { createClient } from '@/utils/supabase/client'
import { EffectCallback, useEffect, useState } from 'react'
import { useUser } from '@/features/user/hooks/use-user'
import { formatAlertNotification } from '../../helper/helper'

const colDefs: agGrid.ColDef[] = [
  { field: 'symbol', minWidth: 100, flex: 1 },
  { field: 'alert', headerName: 'Alert', minWidth: 300, flex: 2 },
  {
    field: 'fired_at',
    headerName: 'Fired At',
    minWidth: 100,
    flex: 1,
    cellRenderer: (param: CustomCellRendererProps) => {
      const date = new Date(param.data.fired_at)

      return <div>{date.toLocaleString()}</div>
    },
  },
  // {
  //   field: 'action',
  //   headerName: 'Action',
  //   minWidth: 100,
  //   flex: 1,
  //   type: 'rightAligned',
  //   cellRenderer: (param: CustomCellRendererProps) => (
  //     <CustomButton
  //       params={param}
  //       index={0}
  //       onClickDetail={() => {}}
  //       onClickDelete={() => {}}
  //     />
  //   ),
  // },
]

interface IHistoryAlert {
  symbol: string
  alert: string
  fired_at: string
  action: string
}

function HistoryAlert() {
  const { theme } = useTheme()
  const supabase = createClient()
  const { user } = useUser()
  const [data, setData] = useState<any>([])

  const getHistoryAlert = async () => {
    const { data, error } = await supabase
      .from('alerts')
      .select(
        `
             alert_id,
              user_id,
              symbol_id,
              indicator_id,
              logic_id,
              value,
              created_at,
              updated_at,
              is_active,
              alert_type,
              all_symbols:all_symbols(symbol),
              indicators:indicators(name),
              logic_conditions:logic_conditions(condition),
              alert_actions(actions(action_id,name)),
              alert_history(*)
        `
      )
      .eq('user_id', user.id)
      .is('is_active', true)
      .not('alert_history.fired_at', 'is', null)

    if (error) return console.log(error)

    const alertHistory = []

    for (const alert of data) {
      alertHistory.push(
        ...alert.alert_history.map((history) => ({
          id: history.history_id,
          alert: formatAlertNotification(alert),
          fired_at: history.fired_at,
          // @ts-ignore
          symbol: alert.all_symbols.symbol,
        }))
      )
    }

    console.log(alertHistory)

    setData(alertHistory)
  }

  useEffect(() => {
    getHistoryAlert()
  }, [])

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
          rowData={data}
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
