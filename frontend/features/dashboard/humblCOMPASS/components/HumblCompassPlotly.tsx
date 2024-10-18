'use client'

import React, { useEffect, useCallback, useState } from 'react'
import { useHumblCompass } from '@/features/dashboard/humblCOMPASS/hooks/useHumblCompass'
import {
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Button,
  Tooltip,
  useDisclosure,
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
import { HumblCompassParameterModal } from './HumblCompassParameterModal'
import { today, CalendarDate } from '@internationalized/date'

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
  const { user, profile, openModalConvertUser } = useUser()
  const { decrementRefreshLimit, getRefreshLimit } = useRefreshLimit()
  const [isLoadingRefreshLimit, setIsLoadingRefreshLimit] = useState(false)
  const defaultStartDate = useCallback(() => {
    const oneYearAgo = today('UTC').subtract({ years: 1 })
    return oneYearAgo.toString()
  }, [])

  const [startDate, setStartDate] = useState(defaultStartDate())
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // Function to get the correct membership
  const getMembership = useCallback(() => {
    return user.is_anonymous ? 'anonymous' : profile?.membership
  }, [user.is_anonymous, profile?.membership])

  // Add console logs here
  useEffect(() => {
    console.log('User ID:', user.id)
    console.log('Membership:', getMembership())
    console.log('Is Anonymous:', user.is_anonymous)
  }, [user, profile, getMembership])

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
      const membership = getMembership()
      console.log('getData called with membership:', membership)
      await getHumblCompass({
        country: selectedCountry,
        shouldRefresh: props?.shouldRefresh,
        membership: membership,
        startDate: startDate, // Add this line
      })
    },
    [getHumblCompass, selectedCountry, getMembership, startDate] // Add startDate to dependencies
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

  // Determine the color based on the theme
  const themeColor = theme === 'dark' ? 'white' : 'black'

  // Update the plot data to change line and text colors
  const updatedPlotData = plotData.map((trace: any) => ({
    ...trace,
    line: { ...trace.line, color: themeColor },
    textfont: { ...trace.textfont, color: themeColor },
  }))

  // Update the shapes to change their line colors
  const updatedShapes =
    plotLayout.shapes?.map((shape: any) => ({
      ...shape,
      line: { ...shape.line, color: themeColor },
    })) || []

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
            onPress={onOpen} // Add this line
            endContent={
              <InlineIcon
                icon="solar:settings-line-duotone"
                className="text-3xl"
              />
            }
          />
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
              data={updatedPlotData}
              layout={{
                ...plotLayout,
                autosize: true,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: { color: themeColor },
                xaxis: {
                  ...plotLayout.xaxis,
                  color: themeColor,
                  zerolinecolor: themeColor,
                  gridcolor: 'rgba(0,0,0,0.1)',
                },
                yaxis: {
                  ...plotLayout.yaxis,
                  color: themeColor,
                  zerolinecolor: themeColor,
                  gridcolor: 'rgba(0,0,0,0.1)',
                },
                shapes: updatedShapes,
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
      <HumblCompassParameterModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onStartDateChange={(date) => {
          setStartDate(date)
          getData({ shouldRefresh: true })
        }}
        currentStartDate={startDate}
      />
    </div>
  )
}

export default HumblCompassPlotly
