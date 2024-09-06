'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { HumblCompassLight, HumblCompassDark } from './HumblCompass'

export function HumblCompassThemed(props: React.SVGProps<SVGSVGElement>) {
  const { resolvedTheme } = useTheme()

  if (resolvedTheme === 'dark') {
    return <HumblCompassDark {...props} />
  }
  return <HumblCompassLight {...props} />
}
