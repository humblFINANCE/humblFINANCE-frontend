import { title } from '@/components/Primitives'
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid'
import { cn } from '@/utils/cn'
import { HumblPortfolioThemed } from '@/features/icons/HumblPortfolioThemed'
import { HumblCompassThemed } from '@/features/icons/HumblCompassThemed'
import { HumblChannelThemed } from '@/features/icons/HumblChannelThemed'
import { HumblAlertsThemed } from '@/features/icons/HumblAlertsThemed'
import Globe from '@/components/magicui/globe'
import { HumblPortfolioCloud } from '@/components/(landing-page)/HumblPortfolioCloud'
import { AlertsAnimatedList } from '@/components/(landing-page)/AlertsAnimatedList'
import { AnimatedBeamMultipleInputs } from '@/components/(landing-page)/AnimatedBeamMultipleInputs'

const features = [
  {
    Icon: HumblCompassThemed,
    name: 'humblCOMPASS',
    description: (
      <div className="text-xl">
        A fundamental financial model to MONITOR the health of GLOBAL economies
        to guide investment decisions.
      </div>
    ),
    href: '/',
    cta: 'Learn more',
    className: 'col-span-1 row-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-30" />
    ),
    children: (
      <Globe className="absolute inset-0 opacity-50 pointer-events-none" />
    ),
  },
  {
    Icon: HumblChannelThemed,
    name: 'humblCHANNEL',
    description: (
      <div className="text-xl">
        A quantitative model providing buy/sell suggestions for any asset with
        time series data.
      </div>
    ),
    href: '/',
    cta: 'Learn more',
    className: 'col-span-1 row-span-1',
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-cyan-500 opacity-30" />
        <div className="absolute inset-0 -left-8">
          <AnimatedBeamMultipleInputs className="w-full h-full" />
        </div>
      </>
    ),
  },
  {
    Icon: HumblPortfolioThemed,
    name: 'humblPORTFOLIO',
    description: (
      <div className="text-xl">
        An interactive table tracking your assets with buy/sell prices and
        market position suggestions.
      </div>
    ),
    href: '/',
    cta: 'Learn more',
    className: 'col-span-1 row-span-1',
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-400 to-orange-500 opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <HumblPortfolioCloud />
        </div>
      </>
    ),
  },
  {
    Icon: HumblAlertsThemed,
    name: 'humblALERTS',
    description: (
      <div className="text-xl">
        Instant notifications when your assets reach buy/sell prices for timely
        action.
      </div>
    ),
    href: '/',
    cta: 'Learn more',
    className: 'col-span-1 row-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-30" />
    ),
    children: (
      <div className="absolute inset-0 flex flex-col pt-2">
        <AlertsAnimatedList className="flex-grow overflow-hidden" />
      </div>
    ),
  },
]

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      <h1 className={cn(title(), 'text-center my-8')}>Features</h1>
      <BentoGrid className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  )
}
