'use client'

import { title } from '@/components/Primitives'
import { cn } from '@/utils/cn'
import React, { useState } from 'react'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import { IconSquareRoundedX } from '@tabler/icons-react'
import ShimmerButton from '@/components/magicui/shimmer-button'
import { CoolMode } from '@/components/magicui/cool-mode'
import { TracingBeam } from '@/components/ui/tracing-beam'

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

const frameworkContent = [
  {
    title: '1. humblCOMPASS',
    description: (
      <>
        <p>
          The <strong>humblCOMPASS</strong> is the center-piece of our
          <strong> humblSTRATEGY</strong>. It is a tool used to assess the
          <strong>current health of the economy</strong> 🤒. It uses{' '}
          <strong>GROWTH</strong> and <strong>INFLATION</strong> data of any
          country to determine the current regime. These two data points have
          the most influence on the economy.
        </p>
        <p>
          Depending on the direction of <strong>GROWTH</strong> and{' '}
          <strong>INFLATION</strong>, the economy is assigned to one of the four
          regimes:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong className="text-green-500 dark:text-green-400">
              humblBOOM
            </strong>
            : Growth <span className="text-green-500">↑</span>, Inflation{' '}
            <span className="text-red-500">↓</span>
          </li>
          <li>
            <strong className="text-blue-300 dark:text-blue-200">
              humblBOUNCE
            </strong>
            : Growth <span className="text-green-500">↑</span>, Inflation{' '}
            <span className="text-green-500">↑</span>
          </li>
          <li>
            <strong className="text-yellow-500 dark:text-yellow-400">
              humblBLOAT
            </strong>
            : Growth <span className="text-red-500">↓</span>, Inflation{' '}
            <span className="text-green-500">↑</span>
          </li>
          <li>
            <strong className="text-red-500 dark:text-red-400">
              humblBUST
            </strong>
            : Growth <span className="text-red-500">↓</span>, Inflation{' '}
            <span className="text-red-500">↓</span>
          </li>
        </ul>
        <br />
        <p>
          The regime is used to select and suggest the most profitable assets to
          invest in.
        </p>
      </>
    ),
  },
  {
    title: '2. humblCHANNEL',
    _description: (
      <>
        <p>
          The <strong>humblCHANNEL</strong> is used as a quantitative signal to
          determine the best time to enter or exit a position. It is not
          guaranteed that assets that have outperformed in a particular regime
          will continue to do so in the future, so we use this signal to ensure
          that the asset we want to invest in is still in a good position to
          buy, or sell.
        </p>
        <br />
        <p>
          {/* reword spitting out buy and sell price */}
          The beauty of the <strong>humblCHANNEL</strong> is that it can be used
          on <strong>any asset</strong> as long as there is a time series
          available for it. It spits out a buy and sell price for any asset and
          is built upon robust mathematics. No opinions. It can be used to help
          investors judge the best time to buy or sell an asset on any time
          frame that they choose. Want to do some day trading? Shrink the
          humblCHANNEL window and get a narrower price channel. Do you like to
          make some swing trades and only look at your portfolio every couple of
          weeks or months? Adjust the parameters accordingly, and the
          humblCHANNEL will widen to accommodate a longer-term outlook.
        </p>
        <br />
        <p>
          Our <strong>humblSTRATEGY</strong> has suggested time frames to
          consider, but your money is yours so we allow you to change the
          algorithm to suit your needs, no questions asked. We provide an
          interactive graph that visually displays how adjusting the time period
          impacts the humblCHANNEL buy and sell prices, allowing you to easily
          understand the effects of your customizations.
        </p>
      </>
    ),
    get description() {
      return this._description
    },
    set description(value) {
      this._description = value
    },
  },
  {
    title: '3. humblPORTFOLIO',
    description: (
      <>
        <p>
          The <strong>humblPORTFOLIO</strong> is an interactive table that shows
          an overview of all the assets you own, and their current{' '}
          <strong>humblCHANNEL</strong> prices. It tells you if the humblCOMPASS
          suggests a buy or sell given the current economic regime.
        </p>
        <p>
          You can visualize your entire investment landscape, make data-driven
          decisions, and optimize your portfolio for long-term success to avoid
          deadly draw-downs in your net worth.
        </p>
      </>
    ),
  },
  {
    title: '4. humblALERTS',
    description: (
      <>
        <p>
          Stay informed with <strong>humblALERTS</strong>. Monitor your
          portfolio remotely. We will send you a notification when it is time to
          buy or sell. This feature provides timely notifications about market
          opportunities, potential risks, and important updates related to your
          portfolio, helping you make informed decisions quickly.
        </p>
        <p>
          <strong>humblALERTS</strong> ensures you never miss a crucial moment
          in the market, keeping you ahead of the curve and ready to act on new
          opportunities or protect yourself from drawdowns and losses in the
          event of a volatile market.
        </p>
      </>
    ),
  },
  {
    title: 'the core of humblSTRATEGY',
    description: (
      <>
        <p>
          The <strong>humblSTRATEGY</strong> is based on a secretive methodology
          used by major Wall Street institutions to navigate the US stock
          market. They do this by measuring and understanding the health of the
          economy and identifying the most profitable assets across all
          identifying the most profitable assets across all economic scenarios.
          This approach goes beyond traditional &quot;stocks vs. cash vs.
          bonds&quot; thinking, allowing investors to optimize their portfolio
          for both growth and protection during all economic conditions.
        </p>
        <br />
        <p>
          After four years of extensive research; reading academic papers and
          sifting through economic data, we&apos;ve developed the humblSTRATEGY
          to make this{' '}
          <strong>
            institutional-level approach accessible to individual investors.
          </strong>{' '}
          Our goal is to provide a simple, user-friendly interface that helps
          you understand and navigate economic health indicators, empowering you
          to make informed investment decisions in any market condition.
        </p>
        <br />
        <p>
          Our strategy provides guidance on what to invest in during different
          economic phases, including periods of expansion (
          <strong className="text-green-500 dark:text-green-400">
            humblBOOM
          </strong>
          ) OR contraction (
          <strong className="text-red-500 dark:text-red-400">humblBUST</strong>
          ), and everything in between. It helps you maintain and monitor the
          value of your investments even when traditional &quot;safe&quot;
          options like bank deposits may be losing purchasing power due to
          inflation.
        </p>
      </>
    ),
  },
]

export default function InvestingFrameworkPage() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className={cn(title(), 'text-center my-8')}>humblSTRATEGY</h1>
      <h2 className="text-center text-md md:text-lg font-light text-gray-700 dark:text-gray-500 mb-4">
        The humblSTRATEGY is a comprehensive framework designed to help you
        learn and navigate how professional asset managers make money in the
        stock market.
      </h2>
      <br />

      {/* Framework Overview button container */}
      <div className="mb-12">
        <CoolMode
          options={{
            particle: '/money-bag-emoji.svg',
            particleCount: 20,
            size: 30,
          }}
        >
          <ShimmerButton
            onClick={() => setLoading(true)}
            className="mt-1 shadow-xl"
            shimmerColor="#8B5CF6"
            shimmerSize="0.15em"
            shimmerDuration="3s"
            background="hsl(var(--background))"
          >
            <span className="text-sm md:text-base font-medium text-black dark:text-white">
              humblSTRATEGY Overview 🚀
            </span>
          </ShimmerButton>
        </CoolMode>
      </div>

      {/* Loader component */}
      <div className="w-full max-w-2xl mx-auto mb-12">
        <Loader
          loadingStates={loadingStates.map((state) => ({
            text: <BoldedText text={state.text} boldParts={state.boldParts} />,
          }))}
          loading={loading}
          duration={3700}
        />
      </div>

      {/* Tracing Beam content */}
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {frameworkContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-20 pt-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {item.title}
              </h2>
              <div className="text-sm prose prose-sm dark:prose-invert">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>

      {/* Close button for the loader, only visible when loading */}
      {loading && (
        <button
          className="fixed top-4 right-4 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white z-[120] transition-colors duration-200"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-12 w-12" />
        </button>
      )}
    </div>
  )
}
