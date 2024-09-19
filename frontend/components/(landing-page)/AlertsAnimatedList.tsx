'use client'

import { cn } from '@/utils/cn'
import { AnimatedList } from '@/components/magicui/animated-list'

interface Alert {
  type: 'Buy' | 'Sell'
  asset: string
  price: string
  time: string
}

const alerts: Alert[] = [
  { type: 'Buy', asset: 'BTC', price: '$45,000', time: '2m ago' },
  { type: 'Sell', asset: 'ETH', price: '$3,200', time: '5m ago' },
  { type: 'Buy', asset: 'AAPL', price: '$220', time: '10m ago' },
  { type: 'Sell', asset: 'GOOGL', price: '$160', time: '15m ago' },
  { type: 'Buy', asset: 'TSLA', price: '$2270', time: '20m ago' },
  { type: 'Sell', asset: 'AMZN', price: '$3,500', time: '25m ago' },
  { type: 'Buy', asset: 'NVDA', price: '$780', time: '30m ago' },
  { type: 'Sell', asset: 'MSFT', price: '$340', time: '35m ago' },
  { type: 'Sell', asset: 'FB', price: '$330', time: '40m ago' },
]

// Repeat the alerts to create a longer list
const extendedAlerts = Array.from({ length: 10 }, () => alerts).flat()

const AlertNotification = ({ type, asset, price, time }: Alert) => {
  const icon = type === 'Buy' ? '🟢' : '🔴'
  const color = type === 'Buy' ? '#00C9A7' : '#FF3D71'

  return (
    <figure
      className={cn(
        'relative w-full cursor-pointer overflow-hidden rounded-lg p-2',
        'transition-all duration-200 ease-in-out hover:scale-[102%]',
        'bg-white/50 dark:bg-black/50',
        'transform-gpu backdrop-blur-sm dark:[border:1px_solid_rgba(255,255,255,.1)]'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div
          className="flex size-6 items-center justify-center rounded-full"
          style={{ backgroundColor: color }}
        >
          <span className="text-xs">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-xs font-medium dark:text-white">
            <span className="truncate">
              {type} Alert: {asset}
            </span>
            <span className="mx-1 flex-shrink-0">·</span>
            <span className="text-2xs text-gray-500 flex-shrink-0">{time}</span>
          </figcaption>
          <p className="text-2xs font-normal dark:text-white/60 truncate">
            Price: {price}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function AlertsAnimatedList({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-transparent px-2',
        className
      )}
    >
      <AnimatedList delay={2000} className="gap-[0.84rem]">
        {extendedAlerts.map((alert, idx) => (
          <AlertNotification {...alert} key={idx} />
        ))}
      </AnimatedList>
    </div>
  )
}
