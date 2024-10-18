'use client'

import React, { useState, useMemo } from 'react'
import HumblCompassPlotly from '@/features/dashboard/humblCOMPASS/components/HumblCompassPlotly'
import {
  CompassCountry,
  getDisplayName,
} from '@/features/dashboard/humblCOMPASS/constants/compass_countries'

export function HumblCompassPage() {
  const [selectedCountry, setSelectedCountry] =
    useState<CompassCountry>('united_states')

  const selectedCountryDisplayName = useMemo(
    () => getDisplayName(selectedCountry),
    [selectedCountry]
  )

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        humblCOMPASS for {selectedCountryDisplayName}
      </h2>
      <HumblCompassPlotly
        initialCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />
    </div>
  )
}
