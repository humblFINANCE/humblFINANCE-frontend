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
    title: 'humblCOMPASS',
    description: (
      <>
        <p>
          Humble Compass is our advanced tool for analyzing global economies. It
          provides a comprehensive view of market trends, economic indicators,
          and geopolitical factors that influence investment decisions.
        </p>
        <p>
          With Humble Compass, you can navigate the complex world of global
          finance with confidence, making informed decisions based on real-time
          data and expert analysis.
        </p>
      </>
    ),
  },
  {
    title: 'humblCHANNEL',
    description: (
      <>
        <p>
          With Humble Channel, you can time your entries and exits with
          precision. Our sophisticated algorithms analyze market patterns to
          identify optimal trading windows, helping you maximize your investment
          potential.
        </p>
        <p>
          Humble Channel provides you with clear signals for when to enter or
          exit positions, taking the guesswork out of timing the market.
        </p>
      </>
    ),
  },
  {
    title: 'humblPORTFOLIO',
    description: (
      <>
        <p>
          Humble Portfolio is your personal asset management center. It offers
          tools for diversification, risk assessment, and performance tracking,
          ensuring your investment strategy aligns with your financial goals.
        </p>
        <p>
          With Humble Portfolio, you can visualize your entire investment
          landscape, make data-driven decisions, and optimize your portfolio for
          long-term success.
        </p>
      </>
    ),
  },
  {
    title: 'humblALERTS',
    description: (
      <>
        <p>
          Stay informed with Humble Alerts. This feature provides timely
          notifications about market opportunities, potential risks, and
          important updates related to your portfolio, helping you make informed
          decisions quickly.
        </p>
        <p>
          Humble Alerts ensures you never miss a crucial moment in the market,
          keeping you ahead of the curve and ready to act on new opportunities.
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
