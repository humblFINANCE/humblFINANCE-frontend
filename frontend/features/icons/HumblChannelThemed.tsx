'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { HumblChannelLight, HumblChannelDark } from './HumblChannel'

export function HumblChannelThemed(props: React.SVGProps<SVGSVGElement>) {
  const { resolvedTheme } = useTheme()

  if (resolvedTheme === 'dark') {
    return <HumblChannelDark {...props} />
  }
  return <HumblChannelLight {...props} />
}
