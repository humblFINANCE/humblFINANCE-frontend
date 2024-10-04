'use client'

import React, { useEffect, useCallback, useState } from 'react'
import { useHumblChannel } from '@/features/dashboard/hooks/useHumblChannel'
import {
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Button,
  Tooltip,
} from '@nextui-org/react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useTickerStore } from '@/components/(dashboard)/portfolio/hooks/useTickerStore'
import { useDebouncedCallback } from 'use-debounce'
import { InlineIcon } from '@iconify/react'
import { useUser } from '@/features/user/hooks/use-user'
import { useRefreshLimit } from '@/components/(dashboard)/portfolio/hooks/useRefreshLimit'
import { toast } from 'react-toastify'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface HumblChannelPlotlyProps {
  initialSymbol: string
  onSymbolChange: (symbol: string) => void
}

export function HumblChannelPlotly({
  initialSymbol,
  onSymbolChange,
}: HumblChannelPlotlyProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(initialSymbol)
  const getHumblChannel = useHumblChannel((store) => store.getHumblChannel)
  const humblChannel = useHumblChannel((store) => store.humblChannel)
  const loading = useHumblChannel((store) => store.loading)
  const { theme } = useTheme()
  const { all_symbols, findSymbols, loading: loadingSymbols } = useTickerStore()
  const { user, openModalConvertUser } = useUser()
  const { decrementRefreshLimit, getRefreshLimit } = useRefreshLimit()
  const [isLoadingRefreshLimit, setIsLoadingRefreshLimit] = useState(false)

  const debounced = useDebouncedCallback((value) => {
    findSymbols(value)
  }, 300)

  const handleSelectionChange = useCallback(
    (key: React.Key | null) => {
      if (key) {
        setSelectedSymbol(key as string)
        onSymbolChange(key as string)
      }
    },
    [onSymbolChange]
  )

  const getData = useCallback(
    async (props?: { shouldRefresh?: boolean }) => {
      const params = {
        symbols: selectedSymbol,
        chart: 'true',
      }
      await getHumblChannel({ params, shouldRefresh: props?.shouldRefresh })
    },
    [getHumblChannel, selectedSymbol]
  )

  const handleRefresh = useCallback(async () => {
    if (user.is_anonymous) {
      toast.warning(
        'Your account membership is Anonymous. Please upgrade your account.'
      )
      openModalConvertUser()
      return
    }

    setIsLoadingRefreshLimit(true)
    const limitCookie = await getRefreshLimit(user?.id)
    setIsLoadingRefreshLimit(false)

    if (!limitCookie) {
      toast.error(
        'Something went wrong. Please refresh the page and try again.'
      )
      return
    }

    if (limitCookie.refresh_limit <= 0) {
      toast.warning(
        'You have used all your free data for the day. Please come back tomorrow or upgrade your account.'
      )
      openModalConvertUser()
      return
    }

    await getData({ shouldRefresh: true })
    await decrementRefreshLimit(user?.id!)
  }, [
    user.is_anonymous,
    openModalConvertUser,
    getRefreshLimit,
    user?.id,
    getData,
    decrementRefreshLimit,
  ])

  useEffect(() => {
    getData()
  }, [getData])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
      </div>
    )
  }

  const plotData = humblChannel?.data || []
  const plotLayout = humblChannel?.layout || { autosize: true }

  return (
    <div className="h-full flex flex-col gap-4 pt-4">
      <div className="flex items-center gap-4 w-full bg-gray-800 p-4 rounded-lg">
        <div className="flex-grow">
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
        <Tooltip color="default" content="Refresh HumblCHANNEL">
          <Button
            id="refresh-humblchannel"
            className="bg-clip text-white-500 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"
            style={{ opacity: 1 }}
            onPress={handleRefresh}
            isLoading={isLoadingRefreshLimit}
            endContent={
              <InlineIcon
                icon="solar:refresh-circle-line-duotone"
                fontSize={28}
              />
            }
          >
            <div className="hidden lg:block">Refresh</div>
          </Button>
        </Tooltip>
      </div>
      {humblChannel ? (
        plotData.length > 0 ? (
          <div className="flex-grow w-full" style={{ height: '600px' }}>
            <Plot
              data={plotData}
              layout={{
                ...plotLayout,
                autosize: true,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: { color: theme === 'dark' ? 'white' : 'black' },
                xaxis: {
                  ...plotLayout.xaxis,
                  color: theme === 'dark' ? 'white' : 'black',
                },
                yaxis: {
                  ...plotLayout.yaxis,
                  color: theme === 'dark' ? 'white' : 'black',
                },
                title: {
                  text: ``,
                },
              }}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <div>No chart data available</div>
        )
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default HumblChannelPlotly
