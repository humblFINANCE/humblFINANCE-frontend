'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { HumblPortfolioLight, HumblPortfolioDark } from './HumblPortfolio'

export function HumblPortfolioThemed(props: React.SVGProps<SVGSVGElement>) {
  const { resolvedTheme } = useTheme()

  if (resolvedTheme === 'dark') {
    return <HumblPortfolioDark {...props} />
  }
  return <HumblPortfolioLight {...props} />
}
