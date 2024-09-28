interface FeatureComparison {
  feature: string
  hFinance: boolean
  OpenBB: boolean
  longBow: boolean
  Hedgeye: boolean
}

// export const dataComparison: FeatureComparison[] = [
//   {
//     feature: 'lowest industry cost',
//     hFinance: true,
//     OpenBB: false,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'application dashboard',
//     hFinance: true,
//     OpenBB: true,
//     longBow: true,
//     Hedgeye: false,
//   },
//   {
//     feature: 'portfolio optimization',
//     hFinance: true,
//     OpenBB: true,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'access to all asset classes',
//     hFinance: true,
//     OpenBB: true,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'data export',
//     hFinance: true,
//     OpenBB: true,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'request datasets',
//     hFinance: true,
//     OpenBB: false,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'upload data for rewards',
//     hFinance: true,
//     OpenBB: false,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'investment education + guidance',
//     hFinance: true,
//     OpenBB: false,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'mobile access',
//     hFinance: true,
//     OpenBB: true,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'implement strategies (one click)',
//     hFinance: true,
//     OpenBB: false,
//     longBow: false,
//     Hedgeye: false,
//   },
// ]

interface CompanyFeatures {
  company: string
  features: {
    lowestIndustryCost: boolean
    accessToAllAssetClasses: boolean
    requestDatasets: boolean
    implementOneClickStrategies: boolean
    mobileAccess: boolean
    applicationDashboard: boolean
    portfolioOptimization: boolean
    dataExport: boolean
    uploadDataForRewards: boolean
    investmentFrameworkGuidance: boolean
  }
}

export const companiesComparison: CompanyFeatures[] = [
  {
    company: 'h.FINANCE',
    features: {
      lowestIndustryCost: true,
      accessToAllAssetClasses: true,
      requestDatasets: true,
      implementOneClickStrategies: true,
      mobileAccess: true,
      applicationDashboard: true,
      portfolioOptimization: true,
      dataExport: true,
      uploadDataForRewards: true,
      investmentFrameworkGuidance: true,
    },
  },
  {
    company: 'OpenBB',
    features: {
      lowestIndustryCost: true,
      accessToAllAssetClasses: true,
      requestDatasets: false,
      implementOneClickStrategies: false,
      mobileAccess: true,
      applicationDashboard: true,
      portfolioOptimization: true,
      dataExport: true,
      uploadDataForRewards: false,
      investmentFrameworkGuidance: false,
    },
  },
  {
    company: 'longBow',
    features: {
      lowestIndustryCost: false,
      accessToAllAssetClasses: false,
      requestDatasets: false,
      implementOneClickStrategies: false,
      mobileAccess: false,
      applicationDashboard: true,
      portfolioOptimization: false,
      dataExport: false,
      uploadDataForRewards: false,
      investmentFrameworkGuidance: false,
    },
  },
  {
    company: 'Hedgeye',
    features: {
      lowestIndustryCost: false,
      accessToAllAssetClasses: false,
      requestDatasets: false,
      implementOneClickStrategies: false,
      mobileAccess: false,
      applicationDashboard: false,
      portfolioOptimization: false,
      dataExport: false,
      uploadDataForRewards: false,
      investmentFrameworkGuidance: false,
    },
  },
]
