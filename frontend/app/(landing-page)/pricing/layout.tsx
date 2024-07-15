import { UserProvider } from '@/features/user/context/UserContext'
import { User } from '@/features/user/types'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function PricingLayout({
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
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full   text-center justify-center">
        <UserProvider user={data.user as User}>{children}</UserProvider>
      </div>
    </section>
  )
}
