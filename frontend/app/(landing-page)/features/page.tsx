import { title } from '@/components/Primitives'
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid'
import { cn } from '@/utils/cn'
import { HumblPortoflio } from '@/components/icons/HumblPortoflio'
import { HumblCompass } from '@/components/icons/HumblCompass'
import { HumblChannel } from '@/components/icons/HumblChannel'
import { HumblAlerts } from '@/components/icons/HumblAlerts'

const features = [
  {
    Icon: HumblCompass,
    name: 'humblCOMPASS',
    description:
      'A fundamental financial model tracking US economy health to guide investment decisions.',
    href: '/',
    cta: 'Learn more',
    className: 'col-span-1 row-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-30" />
    ),
  },
  {
    Icon: HumblChannel,
    name: 'humblCHANNEL',
    description:
      'A quantitative model providing buy/sell suggestions for any asset with time series data.',
    href: '/',
    cta: 'Learn more',
    className: 'col-span-1 row-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-cyan-500 opacity-30" />
    ),
  },
  {
    Icon: HumblPortoflio,
    name: 'humblPORTFOLIO',
    description:
      'An interactive table tracking your assets with buy/sell prices and market position suggestions.',
    href: '/',
    cta: 'Learn more',
    className: 'col-span-1 row-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-bl from-yellow-400 to-orange-500 opacity-30" />
    ),
  },
  {
    Icon: HumblAlerts,
    name: 'humblALERTS',
    description:
      'Instant notifications when your assets reach buy/sell prices for timely action.',
    href: '/',
    cta: 'Learn more',
    className: 'col-span-1 row-span-1',
    background: (
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-30" />
    ),
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className={cn(title(), 'text-center my-8')}>Features</h1>
      <BentoGrid className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  )
}
