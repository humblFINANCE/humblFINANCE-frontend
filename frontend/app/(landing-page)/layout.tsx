import LandingPageNavbar from '@/components/(landing-page)/LandingPageNavBar'
import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'
import clsx from 'clsx'
import type { Viewport } from 'next'
import { Metadata } from 'next'
import { Providers } from '@/app/providers'
import LandingFooter from '@/components/(landing-page)/Footer'

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
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers
          themeProps={{ attribute: 'class', defaultTheme: 'dark', children }}
        >
          <div className="relative flex flex-col h-screen">
            <LandingPageNavbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <LandingFooter />
          </div>
        </Providers>
      </body>
    </html>
  )
}
