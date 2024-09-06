'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { HumblAlertsLight, HumblAlertsDark } from './HumblAlerts'

export function HumblAlertsThemed(props: React.SVGProps<SVGSVGElement>) {
  const { resolvedTheme } = useTheme()

  if (resolvedTheme === 'dark') {
    return <HumblAlertsDark {...props} />
  }
  return <HumblAlertsLight {...props} />
}
