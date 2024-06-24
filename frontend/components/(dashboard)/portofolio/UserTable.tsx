"use client"


import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
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
  return (
    <div className="ag-theme-custom h-full p-2">
         <AgGridReact
            rowData={dataTable as IDataWatchList[]}
            columnDefs={colDefs}
            pagination
            paginationPageSize={20}
            paginationPageSizeSelector={[20, 50, 100]}
            defaultColDef={defaultColDef}
         />
      </div>
  )
}

export default UserTable