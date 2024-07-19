import { UserProvider } from '@/features/user/context/UserContext'
import { User } from '@/features/user/types'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full   text-center justify-center">
        {children}
      </div>
    </section>
  )
}
