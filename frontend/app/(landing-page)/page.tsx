import HumblFinanceHeading from '@/components/(landing-page)/HumblFinanceHeading'
import { title } from '@/components/Primitives'
import { MacbookScroll } from '@/components/(landing-page)/MacbookScroll'
import { CoolMode } from '@/components/magicui/cool-mode'
import ShimmerButton from '@/components/magicui/shimmer-button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <section className="flex flex-col items-center justify-start mb-12">
        <HumblFinanceHeading />
        <h3 className={`${title({ size: 'xs' })} text-center`}>
          the modern investing framework built for everyone
        </h3>
      </section>

      {/* MacbookScroll in its own section */}
      <section className="relative md:mb-16">
        <MacbookScroll
          src="/humblFINANCE-dashboard.png"
          title={
            <span className="font-semibold text-xl">
              a dashboard built for simplicity
            </span>
          }
        />
      </section>

      {/* New section for the button */}
      <section className="flex justify-center mb-10">
        <CoolMode
          options={{
            particle: '/money-bag-emoji.svg',
            particleCount: 20,
            size: 30,
          }}
        >
          <Link href="/features">
            <ShimmerButton
              className="mt-1 shadow-xl"
              shimmerColor="#8B5CF6"
              shimmerSize="0.15em"
              shimmerDuration="3s"
              background="hsl(var(--background))"
            >
              <span className="text-sm md:text-base font-medium text-black dark:text-white">
                take me to the features
              </span>
            </ShimmerButton>
          </Link>
        </CoolMode>
      </section>

      {/* Additional content below */}
      <section>{/* Your additional content goes here */}</section>
    </>
  )
}
