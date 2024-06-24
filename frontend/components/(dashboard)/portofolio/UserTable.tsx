"use client"


import { cn } from "@/utils/nextui/cn";
import * as agGrid from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import dataTable from "./data";
import { IDataWatchList } from "./types";

const colDefs: agGrid.ColDef[] = [
   { field: "symbol", minWidth: 100,},
   { field: "last_close", headerName: "Last Close", minWidth: 100 },
   {
      field: "mandelbrot_channel_buy",
      headerName: "Buy Price",
      flex: 1,
      minWidth: 100
   },
   {
      field: "mandelbrot_channel_sell",
      headerName: "Sell Price",
      flex: 1,
      minWidth: 100
   },
   { field: "up_down", headerName: "Up/Down" },
   { field: "risk_reward", headerName: "Risk Reward", flex: 1, minWidth: 120 },
   { field: "asset_class", headerName: "Asset Class", flex: 1, minWidth: 120 },
   { field: "sector", headerName: "Sector", flex: 2, minWidth: 150 },
   { field: "humbl_suggestion", headerName: "Humbl Suggestion", flex: 2, minWidth: 150 },
];

const defaultColDef: agGrid.ColDef = {
   flex: 1,
   minWidth: 100,
   resizable: true,
};

const UserTable = () => {
     const { theme } = useTheme()

  return (
    <div className={cn("h-full p-2", theme === "light" ? "ag-theme-custom-light" : "ag-theme-custom-dark")}>
         <AgGridReact
            rowData={dataTable as IDataWatchList[]}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
         />
      </div>
  )
}

export default UserTable