'use client'

import {cn} from '@/utils/nextui/cn'
import * as agGrid from 'ag-grid-community'
import {AgGridReact} from 'ag-grid-react'
import {useTheme} from 'next-themes'
import React, {useEffect, useState, useCallback} from 'react'
import {useTradingViewSPX} from '@/features/dashboard/hooks/useTradingViewSPX'
import useWatchlist from '@/components/(dashboard)/portfolio/hooks/useWatchlist'
import {ITradingViewParams} from '@/features/dashboard/types/types'
import {useUser} from '@/features/user/hooks/use-user'
import {setCookie} from "cookies-next";
import {ToastContainer} from "react-toastify";

const colDefs: agGrid.ColDef[] = [
    {field: 'symbol', minWidth: 100},
    {field: 'last_price', headerName: 'Recent Price', minWidth: 100},
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
]

const defaultColDef: agGrid.ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
}

const TableDashboard = () => {
    const {theme} = useTheme()
    const {profile} = useUser()
    const {getTradingSPX, portfolio} = useTradingViewSPX()
    const {watchlists, getWatchlists} = useWatchlist()
    const [value, setValue] = useState<string>(
        () => localStorage.getItem('selectedWatchlistId') || ''
    )

    const getData = useCallback(async () => {
        const params: ITradingViewParams = {
            chart: 'True',
        }

        if (value === '') {
            await getTradingSPX(params)
        }

        if (value) {
            params.chart = 'True'
            await getTradingSPX(params)
        }
    }, [value, watchlists])

    useEffect(() => {
        getWatchlists()
    }, [getWatchlists])

    useEffect(() => {
        getData()
        setCookie('pathname', watchlists?.filter((id: any) => id.is_default === true)[0]?.id?.toString())
        setValue(watchlists?.filter((id: any) => id.is_default === true)[0]?.id?.toString())
    }, [value, watchlists?.filter((id: any) => id.is_default === true)[0]?.id?.toString()])

    return (
        <div className="h-full flex flex-col">
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

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
                theme={theme === "dark" ? "dark" : "light"}/>
        </div>
    )
}

export default TableDashboard
