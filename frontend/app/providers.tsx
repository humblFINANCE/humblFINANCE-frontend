'use client'

import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export function Providers({ children, ...themeProps }: ThemeProviderProps) {
  const router = useRouter()

  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/OneSignalSDKWorker.js')
        .then((registration) => console.log('scope is: ', registration))
    }
  }, [])

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  )
}
