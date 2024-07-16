import DashboardSidebar from '@/components/(dashboard)/sidebar/DashboardSidebar'
import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'
import '@/styles/ag-grid-theme-builder.css'
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx'
import type { Viewport } from 'next'
import { Metadata } from 'next'
import { Providers } from '@/app/providers'
import { UserProvider } from '@/features/user/context/UserContext'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { User } from '@/features/user/types'

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const client = createClient()
  const { data, error } = await client.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

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
            <UserProvider user={data.user as User}>
              <DashboardSidebar>{children}</DashboardSidebar>
            </UserProvider>
          </div>
        </Providers>
      </body>
    </html>
  )
}
