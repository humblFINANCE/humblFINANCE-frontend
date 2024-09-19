import { title } from '@/components/Primitives'
import PricingPageComponent from '@/components/(landing-page)/pricing-page/PricingPageComponent'
import React from 'react'
import FeatureComparisonsComponent from '@/components/(landing-page)/pricing-page/FeatureComparisonsComponent'
import { Divider } from '@nextui-org/react'
import { cn } from '@/utils/cn'

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className={cn(title(), 'text-center my-8')}>Pricing</h1>
      <PricingPageComponent />
      <Divider className="my-12" />
      <FeatureComparisonsComponent />
    </div>
  )
}
