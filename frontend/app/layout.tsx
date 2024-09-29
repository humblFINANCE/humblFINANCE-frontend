import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'
import clsx from 'clsx'
import type { Viewport } from 'next'
import { Metadata } from 'next'
import { Providers } from '@/app/providers'
import ToastProvider from '@/features/ToastProvider'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers attribute="class" defaultTheme="dark">
          <ToastProvider>
            <div className="relative flex flex-col min-h-dvh">
              <Suspense>{children}</Suspense>
            </div>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
