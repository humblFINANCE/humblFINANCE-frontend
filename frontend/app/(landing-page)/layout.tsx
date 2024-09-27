import LandingPageNavbar from '@/components/(landing-page)/LandingPageNavBar'
import LandingFooter from '@/components/(landing-page)/Footer'
import ErrorAuthModal from '@/components/(landing-page)/ErrorAuthModal'
import { useDisclosure } from '@nextui-org/react'
import SuccessRegisterToast from '@/components/(landing-page)/SuccessRegisterToast'

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
      <ErrorAuthModal />
      <SuccessRegisterToast />
    </div>
  )
}
