'use client'
import { title } from '@/components/Primitives'
import { cn } from '@/utils/cn'
import React, { useState } from 'react'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import { IconSquareRoundedX } from '@tabler/icons-react'
import ShimmerButton from '@/components/magicui/shimmer-button'

const loadingStates = [
  { text: 'Analyzing market trends' },
  { text: 'Evaluating risk factors' },
  { text: 'Assessing asset allocation' },
  { text: 'Calculating potential returns' },
  { text: 'Optimizing portfolio diversity' },
  { text: 'Considering long-term growth' },
  { text: 'Factoring in market volatility' },
  { text: 'Finalizing investment strategy' },
]

export default function InvestingFrameworkPage() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className={cn(title(), 'text-center my-8')}>Investing Framework</h1>

      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />

      <ShimmerButton onClick={() => setLoading(true)} className="mt-4">
        <span className="text-sm md:text-base font-medium">
          Get a Glimpse of the Framework
        </span>
      </ShimmerButton>

      {loading && (
        <button
          className="fixed top-4 right-4 text-gray-800 dark:text-gray-200 z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}

      {/* Add your investing framework content here */}
    </div>
  )
}
