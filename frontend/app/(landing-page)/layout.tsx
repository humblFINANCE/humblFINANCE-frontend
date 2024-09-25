import LandingPageNavbar from '@/components/(landing-page)/LandingPageNavBar'
import LandingFooter from '@/components/(landing-page)/Footer'

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <LandingPageNavbar />
      <main className="flex-grow container mx-auto max-w-7xl pt-8 px-6">
        {children}
      </main>
      <LandingFooter />
    </div>
  )
}
