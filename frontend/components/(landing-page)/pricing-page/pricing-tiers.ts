import type { Frequency, Tier } from './pricing-types'

import { FrequencyEnum, TiersEnum } from './pricing-types'

export const frequencies: Array<Frequency> = [
  { key: FrequencyEnum.Yearly, label: 'Pay Yearly', priceSuffix: 'per year' },
  {
    key: FrequencyEnum.Monthly,
    label: 'Pay Monthly',
    priceSuffix: 'per month',
  },
]

export const tiers: Array<Tier> = [
  {
    key: TiersEnum.humblPEON,
    title: 'humblPEON',
    price: 'Free',
    href: '#',
    featured: false,
    mostPopular: false,
    description:
      'For newcomers to test out the platform and get a feel for it.',
    features: [
      'humblCOMPASS: US Only',
      'humblCHANNEL',
      'humblPORTFOLIO: 2 watchlists',
      '1 Daily Data Refresh',
      'Access to all Asset Classes',
      'Access to 14,000+ Equities',
      'Access to All Exchanges',
    ],
    buttonText: 'Continue with Free',
    buttonColor: 'default',
    buttonVariant: 'flat',
  },
  {
    key: TiersEnum.humblPREMIUM,
    title: 'humblPREMIUM',
    description:
      'For users who need more data and expanded coverage. Includes all features from humblPEON, plus:',
    href: '#',
    mostPopular: true,
    price: {
      yearly: '$150',
      monthly: '$15',
    },
    featured: false,
    features: [
      'humblCOMPASS: Eurozone added',
      '10 Daily Data Refreshes',
      'Email support (within 2 days)',
    ],
    buttonText: 'Get started',
    buttonColor: 'primary',
    buttonVariant: 'solid',
  },
  {
    key: TiersEnum.humblPOWER,
    title: 'humblPOWER',
    href: '#',
    featured: true,
    mostPopular: false,
    description:
      'For power users who need comprehensive global coverage. Includes all features from humblPREMIUM, plus:',
    price: {
      yearly: '$350',
      monthly: '$35',
    },
    priceSuffix: '',
    features: [
      'humblCOMPASS: Asia + Emerging Markets added',
      '50 Daily Data Refreshes',
      'Custom Built Strategies',
      'Request Personalized Analytics',
      'Priority Email Support (within 1 day)',
    ],
    buttonText: 'Get Started',
    buttonColor: 'primary',
    buttonVariant: 'flat',
  },
  {
    key: TiersEnum.humblPERMANENT,
    title: 'humblPERMANENT',
    href: '#',
    featured: true,
    mostPopular: false,
    description:
      'For professionals who need unlimited access and priority support. Includes all features from humblPOWER, plus:',
    price: {
      yearly: '$999',
      monthly: '$999',
    },
    priceSuffix: '',
    features: [
      'Early Access to New Analytics',
      'Custom Portfolio Construction',
      'Unlimited Watchlists',
      'Unlimited Daily Data Refreshes',
      'Personalized Support (within 3 hours)',
    ],
    buttonText: 'Get Started',
    buttonColor: 'primary',
    buttonVariant: 'flat',
  },
]
