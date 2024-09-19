import LandingPageNavbar from '@/components/(landing-page)/LandingPageNavBar'
import LandingFooter from '@/components/(landing-page)/Footer'

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LandingPageNavbar />
      <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
        {children}
      </main>
      <LandingFooter />
    </>
  )
}
