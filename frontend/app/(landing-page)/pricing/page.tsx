import { title } from '@/components/Primitives'
import PricingPageComponent from '@/components/(landing-page)/pricing-page/PricingPageComponent'
import React from 'react'
import FeatureComparisonsComponent from '@/components/(landing-page)/pricing-page/FeatureComparisonsComponent'
import { Divider } from '@nextui-org/react'
export default function PricingPage() {
  return (
    <>
      <PricingPageComponent />
      <Divider className="mb-12" />
      <FeatureComparisonsComponent />
    </>
  )
}
