import HumblFinanceHeading from '@/components/(landing-page)/HumblFinanceHeading'
import { title } from '@/components/Primitives'
import { MacbookScroll } from '@/components/(landing-page)/MacbookScroll'

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-start">
      <HumblFinanceHeading />
      <h3 className={`${title({ size: 'xs' })} text-center`}>
        the modern investing framework built for everyone
      </h3>
      <MacbookScroll
        src="/humblFINANCE-dashboard.png"
        title={
          <h4 className="font-semibold text-xl">
            a dashboard built for simplicity
          </h4>
        }
      />
    </section>
  )
}
