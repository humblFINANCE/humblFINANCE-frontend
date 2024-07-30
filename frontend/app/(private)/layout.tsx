import DashboardSidebar from '@/components/(dashboard)/sidebar/DashboardSidebar'
import '@/styles/ag-grid-theme-builder.css'
import { UserProvider } from '@/features/user/context/UserContext'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { User } from '@/features/user/types'

export default async function DashboardLayout({
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
    <UserProvider user={data.user as User}>
      <DashboardSidebar>{children}</DashboardSidebar>
    </UserProvider>
  )
}
