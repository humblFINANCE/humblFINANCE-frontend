'use client'

import React, { useState, useCallback } from 'react'
import HumblChannelPlotly from '@/features/dashboard/humblCHANNEL/components/HumblChannelPlotly'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useTickerStore } from '@/components/(dashboard)/portfolio/hooks/useTickerStore'
import { useDebouncedCallback } from 'use-debounce'

export function HumblChannelPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL')
  const { all_symbols, findSymbols, loading: loadingSymbols } = useTickerStore()

  const debounced = useDebouncedCallback((value) => {
    findSymbols(value)
  }, 300)

  const handleSelectionChange = useCallback((key: React.Key) => {
    setSelectedSymbol(key as string)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">humblCHANNEL</h1>
      <div className="w-full max-w-md">
        <Autocomplete
          label="Select Symbol"
          placeholder="Type to search..."
          className="w-full"
          defaultItems={all_symbols}
          isLoading={loadingSymbols}
          selectedKey={selectedSymbol}
          onSelectionChange={handleSelectionChange}
          onInputChange={debounced}
          allowsCustomValue={true}
        >
          {(item) => (
            <AutocompleteItem key={item.symbol} textValue={item.symbol}>
              {item.symbol} : {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <HumblChannelPlotly symbol={selectedSymbol} />
    </div>
  )
}
