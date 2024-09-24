'use client'
import { title } from '@/components/Primitives'
import { cn } from '@/utils/cn'
import React, { useState } from 'react'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import { IconSquareRoundedX } from '@tabler/icons-react'
import ShimmerButton from '@/components/magicui/shimmer-button'
import { CoolMode } from '@/components/magicui/cool-mode'

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

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Page title */}
      <h1 className={cn(title(), 'text-center my-8')}>Investing Framework</h1>

      {/* Multi-step loader component */}
      <Loader
        loadingStates={loadingStates.map((state) => ({
          text: <BoldedText text={state.text} boldParts={state.boldParts} />,
        }))}
        loading={loading}
        duration={3700}
      />

      {/* Button to trigger the loader, now wrapped with CoolMode */}
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
          <span className="text-sm md:text-base font-medium text-secondary-foreground dark:text-primary">
            Framework Overview 🚀
          </span>
        </ShimmerButton>
      </CoolMode>

      {/* Close button for the loader, only visible when loading */}
      {loading && (
        <button
          className="fixed top-4 right-4 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white z-[120] transition-colors duration-200"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-12 w-12" />
        </button>
      )}

      {/* Placeholder for additional investing framework content */}
      {/* Add your investing framework content here */}
    </div>
  )
}
