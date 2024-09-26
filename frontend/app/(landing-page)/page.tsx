import HumblFinanceHeading from '@/components/(landing-page)/HumblFinanceHeading'
import { title } from '@/components/Primitives'
import { MacbookScroll } from '@/components/(landing-page)/MacbookScroll'

export default function HomePage() {
  return (
    <section className="flex flex-col items-center">
      <HumblFinanceHeading />
      <h3 className={`${title({ size: 'xs' })} text-center`}>
        the modern investing framework built for everyone
      </h3>
      <MacbookScroll
        src="/humblFINANCE-dashboard.png"
        title={
          <span className="font-semibold text-xl">
            a dashboard built for simplicity
          </span>
        }
      />
      {/* Divider for medium screens and above */}
      <div className="w-full max-w-4xl mx-auto mt-8 mb-10 hidden md:block">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
      </div>
    </section>
  )
}
