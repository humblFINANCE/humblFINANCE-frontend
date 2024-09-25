'use client'
import { title } from '@/components/Primitives'
import { cn } from '@/utils/cn'
import React, { useState } from 'react'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import { IconSquareRoundedX } from '@tabler/icons-react'
import ShimmerButton from '@/components/magicui/shimmer-button'
import { CoolMode } from '@/components/magicui/cool-mode'
import { Timeline } from '@/components/ui/timeline'

// Component to render text with specific parts in bold
const BoldedText = ({
  text,
  boldParts,
}: {
  text: string
  boldParts: string[]
}) => {
  // Create a regex to match bold parts, escaping special characters
  const regex = new RegExp(
    `(${boldParts.map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g'
  )
  // Split the text into parts based on the regex
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, index) =>
        boldParts.includes(part) ? <strong key={index}>{part}</strong> : part
      )}
    </>
  )
}

// Define the loading states for the multi-step loader
const loadingStates = [
  // Each state contains the text to display and the parts to be bolded
  {
    text: '1. humblCOMPASS: Analyze global economies 🌍',
    boldParts: ['humblCOMPASS'],
  },
  {
    text: '2. humblREGIME: Assign humblBOOM, humblBOUNCE, humblBLOAT, or humblBUST to the economy 🪣',
    boldParts: [
      'humblREGIME',
      'humblBOOM',
      'humblBOUNCE',
      'humblBLOAT',
      'humblBUST',
    ],
  },
  {
    text: '3. humblSELECT: Select assets that outperform in that regime 📈',
    boldParts: ['humblSELECT'],
  },
  {
    text: '4. humblCHANNEL: Time your entries and exits 📡',
    boldParts: ['humblCHANNEL'],
  },
  {
    text: '5. humblPORTFOLIO: Manage your assets 💼',
    boldParts: ['humblPORTFOLIO'],
  },
  {
    text: '6. humblALERTS: Receive optimal buy and sell opportunities 🔔',
    boldParts: ['humblALERTS'],
  },
]

export default function InvestingFrameworkPage() {
  // State to control the visibility of the loader
  const [loading, setLoading] = useState(false)

  const timelineData = [
    {
      title: 'humblCOMPASS',
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          A fundamental financial model that tracks the health of the US economy
          using Growth and Inflation data. These data points are known to have
          the most significant impact on how the "MARKETS" move and whether it
          is an excellent time to be dumping money into them or taking your
          money out. We use this to guide our investment decisions because it
          tells us where the economy is heading and if it is healthy or hurting.
          The assets we invest in change dramatically in those two scenarios.
        </p>
      ),
    },
    {
      title: 'humblCHANNEL',
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          A quantitative financial model that tracks the health of individual
          assets. The beauty of the humblCHANNEL is that it can be used on any
          asset as long as there is a time series of data available for it. It
          spits out a suggested buy/sell price for any asset and is built upon
          robust mathematics. No opinions. It can be used to help investors
          judge the best time to buy or sell an asset on any time frame that
          they choose. Want to do some day trading, shrink the window and get a
          narrower price channel? Do you like to make some swing trades and only
          look at your portfolio every couple of weeks or months? Adjust the
          parameters accordingly, and the price channel will widen to
          accommodate a longer-term outlook. Our humblSTRATEGY has suggested
          time frames to consider, but your money is yours so we allow you from
          changing the algorithm to suit your needs.
        </p>
      ),
    },
    {
      title: 'humblPORTFOLIO',
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          An interactive table that tracks the assets that you own. It shows you
          the humblCHANNEL prices to buy/sell, and tells you if the{' '}
          <strong>humblCOMPASS</strong> suggests you should be long or short.
        </p>
      ),
    },
    {
      title: 'humblALERTS',
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Get notified instantly when an asset in your portfolio reaches a
          buy/sell price so you can take action only when you need to, and can
          feel comfortable walking away from your portfolio.
        </p>
      ),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <h1 className={cn(title(), 'text-center mb-8')}>Investing Framework</h1>

        <div className="w-full mb-8">
          <Loader
            loadingStates={loadingStates.map((state) => ({
              text: (
                <BoldedText text={state.text} boldParts={state.boldParts} />
              ),
            }))}
            loading={loading}
            duration={3700}
          />

          <div className="mt-4 flex justify-center">
            <CoolMode
              options={{
                particle: '/money-bag-emoji.svg',
                particleCount: 20,
                size: 30,
              }}
            >
              <ShimmerButton
                onClick={() => setLoading(true)}
                className="shadow-xl"
                shimmerColor="#8B5CF6"
                shimmerSize="0.15em"
                shimmerDuration="3s"
                background="hsl(var(--background))"
              >
                <span className="text-sm md:text-base font-medium text-black dark:text-white">
                  Framework Overview 🚀
                </span>
              </ShimmerButton>
            </CoolMode>
          </div>

          {loading && (
            <button
              className="fixed top-4 right-4 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white z-[120] transition-colors duration-200"
              onClick={() => setLoading(false)}
            >
              <IconSquareRoundedX className="h-12 w-12" />
            </button>
          )}
        </div>
      </div>

      <div className="w-full">
        <Timeline data={timelineData} />
      </div>
    </div>
  )
}
