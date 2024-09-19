import HumblFinanceHeading from '@/components/(landing-page)/HumblFinanceHeading'
import { title } from '@/components/Primitives'
import { MacbookScroll } from '@/components/(landing-page)/MacbookScroll'
import Image from 'next/image'
export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center gap-1">
      <HumblFinanceHeading />
      <br />
      <div className="inline-block w-full text-center">
        <h2 className={title({ size: 'xs' })}>
          a modern investing framework built for everyone
        </h2>

        <MacbookScroll
          src="/humblFINANCE-dashboard.png"
          // badge={
          //   <Image
          //     src="/humblfinance.svg"
          //     alt="HumblFinance Logo"
          //     width={32}
          //     height={32}
          //   />
          // }
        />
      </div>
    </section>
  )
}
