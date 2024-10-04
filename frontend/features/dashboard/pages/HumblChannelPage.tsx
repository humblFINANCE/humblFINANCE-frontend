'use client'

import React, { useState } from 'react'
import HumblChannelPlotly from '@/features/dashboard/humblCHANNEL/components/HumblChannelPlotly'

export function HumblChannelPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('')

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        {selectedSymbol ? `humblCHANNEL for ${selectedSymbol}` : 'humblCHANNEL'}
      </h2>
      <HumblChannelPlotly
        initialSymbol={selectedSymbol}
        onSymbolChange={setSelectedSymbol}
      />
    </div>
  )
}
