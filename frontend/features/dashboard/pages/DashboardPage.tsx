'use client'

import React from 'react'
import TradingViewWidget from "@/features/dashboard/components/TradingViewWidget";
import TableDashboard from "@/features/dashboard/components/Table";

export function DashboardPage() {
    return (
        <>
            <TradingViewWidget/>
            <TableDashboard/>

            {/* OLD COMPONENTS */}
            {/*// < className="h-full overflow-scroll">*/}
            {/*<div className="mx-4 mt-6 text-medium min-w-screen block lg:flex">*/}
            {/*<p>Hello </p>*/}
            {/*<pre>{JSON.stringify(user, null, 2)}</pre>*/}
            {/*</div>*/}
            {/*</div>*/}
        </>
    )
}
