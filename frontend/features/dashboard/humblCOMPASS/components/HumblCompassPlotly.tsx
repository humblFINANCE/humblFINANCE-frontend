'use client'

import React, { useEffect, useCallback, useState } from 'react'
import { useHumblCompass } from '@/features/dashboard/humblCOMPASS/hooks/useHumblCompass'
import {
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Button,
  Tooltip,
} from '@nextui-org/react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { InlineIcon } from '@iconify/react'
import { useUser } from '@/features/user/hooks/use-user'
import { useRefreshLimit } from '@/components/(dashboard)/portfolio/hooks/useRefreshLimit'
import { toast } from 'react-toastify'
import {
  COMPASS_COUNTRIES,
  CompassCountry,
  getDisplayName,
  getCountryValue,
} from '@/features/dashboard/humblCOMPASS/constants/compass_countries'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface HumblCompassPlotlyProps {
  initialCountry: CompassCountry
  onCountryChange: (country: CompassCountry) => void
}

export function HumblCompassPlotly({
  initialCountry,
  onCountryChange,
}: HumblCompassPlotlyProps) {
  const [selectedCountry, setSelectedCountry] =
    useState<CompassCountry>(initialCountry)
  const getHumblCompass = useHumblCompass((store) => store.getHumblCompass)
  const humblCompass = useHumblCompass((store) => store.humblCompass)
  const loading = useHumblCompass((store) => store.loading)
  const { theme } = useTheme()
  const { user, openModalConvertUser } = useUser()
  const { decrementRefreshLimit, getRefreshLimit } = useRefreshLimit()
  const [isLoadingRefreshLimit, setIsLoadingRefreshLimit] = useState(false)

  const handleSelectionChange = useCallback(
    (key: React.Key | null) => {
      if (key) {
        const countryValue = getCountryValue(key as string)
        if (countryValue) {
          setSelectedCountry(countryValue)
          onCountryChange(countryValue)
        }
      }
    },
    [onCountryChange]
  )

  const getData = useCallback(
    async (props?: { shouldRefresh?: boolean }) => {
      await getHumblCompass({
        country: selectedCountry,
        shouldRefresh: props?.shouldRefresh,
        membership: user.profile?.membership,
      })
    },
    [getHumblCompass, selectedCountry, user.profile?.membership]
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
    user.profile?.membership,
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

  const plotData = humblCompass?.data || []
  const plotLayout = humblCompass?.layout || { autosize: true }

  // Add custom annotations
  const customAnnotations = [
    {
      x: (plotLayout.xaxis?.range?.[0] || 0) / 2,
      y: (plotLayout.yaxis?.range?.[1] || 0) / 2,
      text: 'humblBOOM',
      showarrow: false,
      font: { size: 20, color: 'rgba(144, 238, 144, 0.5)' },
      opacity: 0.5,
    },
    {
      x: (plotLayout.xaxis?.range?.[1] || 0) / 2,
      y: (plotLayout.yaxis?.range?.[1] || 0) / 2,
      text: 'humblBOUNCE',
      showarrow: false,
      font: { size: 20, color: 'rgba(173, 216, 230, 0.5)' },
      opacity: 0.5,
    },
    {
      x: (plotLayout.xaxis?.range?.[1] || 0) / 2,
      y: (plotLayout.yaxis?.range?.[0] || 0) / 2,
      text: 'humblBLOAT',
      showarrow: false,
      font: { size: 20, color: 'rgba(255, 165, 0, 0.5)' },
      opacity: 0.5,
    },
    {
      x: (plotLayout.xaxis?.range?.[0] || 0) / 2,
      y: (plotLayout.yaxis?.range?.[0] || 0) / 2,
      text: 'humblBUST',
      showarrow: false,
      font: { size: 20, color: 'rgba(255, 99, 71, 0.5)' },
      opacity: 0.5,
    },
  ]

  return (
    <div className="h-full flex flex-col gap-4 pt-4">
      <div className="flex items-center gap-4 w-full bg-gray-800 rounded-lg">
        <div className="flex-grow">
          <Autocomplete
            label="Select Country"
            placeholder="Type to search..."
            className="w-full"
            size="sm"
            radius="lg"
            isClearable={true}
            defaultItems={COMPASS_COUNTRIES}
            selectedKey={getDisplayName(selectedCountry)}
            onSelectionChange={handleSelectionChange}
          >
            {(item) => (
              <AutocompleteItem key={item.display} textValue={item.display}>
                {item.display}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <Tooltip color="default" content="humblCOMPASS Parameters">
          <Button
            id="settings-humblcompass"
            className="bg-clip text-white-500 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"
            style={{ opacity: 1 }}
            size="lg"
            isIconOnly
            endContent={
              <InlineIcon
                icon="solar:settings-line-duotone"
                className="text-3xl"
              />
            }
          ></Button>
        </Tooltip>
        <Tooltip color="default" content="Refresh humblCOMPASS">
          <Button
            id="refresh-humblcompass"
            className="bg-clip text-white-500 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"
            style={{ opacity: 1 }}
            onPress={handleRefresh}
            size="lg"
            isLoading={isLoadingRefreshLimit}
            isIconOnly
            endContent={
              <InlineIcon
                icon="solar:refresh-circle-line-duotone"
                className="text-3xl"
              />
            }
          ></Button>
        </Tooltip>
      </div>
      {humblCompass ? (
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
                title: {}, // This will remove the title from the plot
                annotations: [
                  ...(plotLayout.annotations || []),
                  ...customAnnotations,
                ],
              }}
              config={{
                responsive: true,
                displaylogo: false, // Remove the Plotly logo
                modeBarButtonsToRemove: [
                  'autoScale2d',
                  'lasso2d',
                  'select2d',
                  'zoom2d',
                  'zoomIn2d',
                  'zoomOut2d',
                ],
                modeBarButtonsToAdd: ['pan2d', 'resetScale2d'],
                toImageButtonOptions: {
                  format: 'png',
                  filename: 'humblCOMPASS',
                  height: 600,
                  width: 800,
                  scale: 2, // Increase this for higher resolution
                },
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <div>No chart data available</div>
        )
      ) : (
        <div>No data available. Please select a country.</div>
      )}
    </div>
  )
}

export default HumblCompassPlotly
