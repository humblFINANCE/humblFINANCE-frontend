import type { PricingFeatures } from './pricing-comparison-types'

import { TiersEnum } from './pricing-types'

const features: PricingFeatures = [
  {
    title: 'Analytics & Data',
    items: [
      {
        title: 'humblCOMPASS Coverage',
        tiers: {
          [TiersEnum.humblPEON]: 'US Only',
          [TiersEnum.humblPREMIUM]: 'US + Eurozone',
          [TiersEnum.humblPOWER]: 'US + Eurozone + Asia + Emerging Markets',
          [TiersEnum.humblPERMANENT]: 'Global Coverage',
        },
        helpText: 'Geographic coverage for market analysis and insights.',
      },
      {
        title: 'Daily Data Refreshes',
        tiers: {
          [TiersEnum.humblPEON]: '1',
          [TiersEnum.humblPREMIUM]: '10',
          [TiersEnum.humblPOWER]: '50',
          [TiersEnum.humblPERMANENT]: 'Unlimited',
        },
        helpText:
          'Number of times data is refreshed daily for up-to-date analysis.',
      },
      {
        title: 'Access to Asset Classes',
        tiers: {
          [TiersEnum.humblPEON]: true,
          [TiersEnum.humblPREMIUM]: true,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText: 'Access to various asset classes for diversified analysis.',
      },
      {
        title: 'Access to 14k+ Equities',
        tiers: {
          [TiersEnum.humblPEON]: true,
          [TiersEnum.humblPREMIUM]: true,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText: 'Number of equities available for analysis.',
      },
      {
        title: 'Exchange Access',
        tiers: {
          [TiersEnum.humblPEON]: 'All',
          [TiersEnum.humblPREMIUM]: 'All',
          [TiersEnum.humblPOWER]: 'All',
          [TiersEnum.humblPERMANENT]: 'All',
        },
        helpText:
          'Access to various exchanges for comprehensive market coverage.',
      },
    ],
  },
  {
    title: 'Features & Tools',
    items: [
      {
        title: 'humblCHANNEL',
        tiers: {
          [TiersEnum.humblPEON]: true,
          [TiersEnum.humblPREMIUM]: true,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText: 'Access to humblCHANNEL for market insights and analysis.',
      },
      {
        title: 'humblPORTFOLIO Watchlists',
        tiers: {
          [TiersEnum.humblPEON]: '2',
          [TiersEnum.humblPREMIUM]: '5',
          [TiersEnum.humblPOWER]: '10',
          [TiersEnum.humblPERMANENT]: 'Unlimited',
        },
        helpText: 'Number of watchlists available for portfolio tracking.',
      },
      {
        title: 'Custom Built Strategies',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText: 'Ability to create and use custom investment strategies.',
      },
      {
        title: 'Personalized Analytics',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: 'On Request',
          [TiersEnum.humblPERMANENT]: 'Included',
        },
        helpText: 'Access to personalized analytics tailored to your needs.',
      },
      {
        title: 'Custom Portfolio Construction',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: false,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText: 'Assistance in constructing custom portfolios.',
      },
    ],
  },
  {
    title: 'Support & Priority Access',
    items: [
      {
        title: 'Support Response Time',
        tiers: {
          [TiersEnum.humblPEON]: 'Best Effort',
          [TiersEnum.humblPREMIUM]: 'Within 2 days',
          [TiersEnum.humblPOWER]: 'Within 1 day',
          [TiersEnum.humblPERMANENT]: 'Within 3 hours',
        },
        helpText: 'Expected response time for support inquiries.',
      },
      {
        title: 'Early Access to New Analytics',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: false,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText: 'Get early access to newly developed analytics tools.',
      },
    ],
  },
  {
    title: 'Collaboration',
    items: [
      {
        title: 'Team members',
        tiers: {
          [TiersEnum.humblPEON]: 'Just You',
          [TiersEnum.humblPREMIUM]: 'Just You',
          [TiersEnum.humblPOWER]: 'Unlimited',
          [TiersEnum.humblPERMANENT]: 'Unlimited',
        },
        helpText: 'Collaborate with other users in a team.',
      },
      {
        title: 'Team collections',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText: 'Create collections shared across your team.',
      },
      {
        title: 'Team administration',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText:
          'Add or remove members from your team to manage access to membership and collections.',
      },
    ],
  },
  {
    title: 'Security & Access',
    items: [
      {
        title: 'SAML Single Sign-On (SSO)',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText:
          'Access through Okta, ADFS, Azure, Onelogin, or your own SAML identity provider (IdP).',
      },
      {
        title: 'SCIM user provisioning',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText:
          'Sync user directories with Okta, Azure AD, Onelogin, or your own SCIM identity provider (IdP).',
      },
    ],
  },
  {
    title: 'Billing & Customization',
    items: [
      {
        title: 'Flexible payment options',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText:
          'Option to pay via invoice and bank transfers on a net 30, 45 or 60 payment term. Available upon request.',
      },
      {
        title: 'Custom security assessment',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText:
          'Our team will help answer security assessments or questionnaires for your organization. Available upon request.',
      },
      {
        title: 'Custom agreement',
        tiers: {
          [TiersEnum.humblPEON]: false,
          [TiersEnum.humblPREMIUM]: false,
          [TiersEnum.humblPOWER]: true,
          [TiersEnum.humblPERMANENT]: true,
        },
        helpText:
          "Standardized SaaS agreement for your organization's legal requirement. Available upon request.",
      },
    ],
  },
]

export default features
