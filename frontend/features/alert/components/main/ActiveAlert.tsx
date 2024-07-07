'use client'
import { Icon } from '@iconify/react'
import { Spacer, useDisclosure } from '@nextui-org/react'
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react'
import { useTheme } from 'next-themes'
import React from 'react'
import CustomButton from '../active-alert/CustomButton'
import { ColDef } from 'ag-grid-community'
import { cn } from '@/utils/nextui/cn'
import useActiveAlertData from '../../hooks/useActiveAlertData'
import { formatAlert } from '../../helper/helper'
import ModalDelete from '../active-alert/ModalDelete'
import { toast } from 'react-toastify'
import ModalDetail from '../active-alert/ModalDetail'

function ActiveAlert() {
  const { theme } = useTheme()
  const { activeAlert, isLoading, deleteAlert, refetch } = useActiveAlertData()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const detailModal = useDisclosure()
  const [selectedId, setSelectedId] = React.useState<any>({})
  const onConfirmDelete = async () => {
    deleteAlert(selectedId?.alert_id, () => {
      setSelectedId('')
      onClose()
      toast.success('Alert deleted successfully')
    })
  }

  const colDefs: ColDef[] = [
    {
      field: 'symbol',
      minWidth: 100,
      flex: 1,
      cellRenderer: (param: CustomCellRendererProps) => {
        return <div>{formatAlert(param.data)}</div>
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 100,
      type: 'rightAligned',
      cellRenderer: (param: CustomCellRendererProps) => (
        <CustomButton
          params={param}
          index={0}
          onClickDetail={() => {
            setSelectedId(param.data)
            detailModal.onOpen()
          }}
          onClickDelete={() => {
            setSelectedId(param.data)
            onOpen()
          }}
        />
      ),
    },
  ]

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-3xl">Active Alerts</h2>
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
          rowData={activeAlert}
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
      <ModalDelete
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClickDelete={() => onConfirmDelete()}
      />
      <ModalDetail
        isOpen={detailModal.isOpen}
        onOpenChange={() => {
          detailModal.onOpenChange()
          setSelectedId({})
          refetch()
        }}
        data={selectedId}
      />
    </div>
  )
}

export default ActiveAlert
