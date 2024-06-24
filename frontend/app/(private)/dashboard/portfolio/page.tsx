"use client";

// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import dataTable from "./data";
import { IDataWatchList } from "./types";

const colDefs: agGrid.ColDef[] = [
   { field: "symbol" },
   { field: "last_close", headerName: "Last Close" },
   {
      field: "mandelbrot_channel_buy",
      headerName: "Mandelbrot Channel Buy",
      flex: 1.5,
   },
   {
      field: "mandelbrot_channel_sell",
      headerName: "Mandelbrot Channel Sell",
      flex: 1.5,
   },
   { field: "up_down", headerName: "Up/Down" },
   { field: "risk_reward", headerName: "Risk Reward" },
   { field: "asset_class", headerName: "Asset Class" },
   { field: "sector", headerName: "Sector", flex: 2 },
   { field: "humbl_suggestion", headerName: "Humbl Suggestion" },
];

const defaultColDef: agGrid.ColDef = {
   flex: 1,
   minWidth: 50,
   resizable: true,
};

export default function PrivateTestPage() {
   // const supabase = createClient();

   // const { data, error } = await supabase.auth.getUser();
   // if (error || !data?.user) {
   //    console.log("i made it");
   //    redirect("/login");
   // }

   return (
      <div className="ag-theme-custom h-full p-2 ">
         <AgGridReact
            rowData={dataTable as IDataWatchList[]}
            columnDefs={colDefs}
            pagination
            paginationPageSize={20}
            paginationPageSizeSelector={[20, 50, 100]}
            defaultColDef={defaultColDef}
         />
      </div>
   );
}
