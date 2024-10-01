interface FeatureComparison {
  feature: string
  hFinance: boolean
  OpenBB: boolean
  longBow: boolean
  Hedgeye: boolean
}

// export const dataComparison: FeatureComparison[] = [
//   {
//     feature: 'simple investment framework guidance',
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
//     feature: 'data export',
//     hFinance: true,
//     OpenBB: true,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'portfolio visualization overview',
//     hFinance: true,
//     OpenBB: true,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'one-click strategies',
//     hFinance: true,
//     OpenBB: false,
//     longBow: false,
//     Hedgeye: false,
//   },
//   {
//     feature: 'request data sets',
//     hFinance: true,
//     OpenBB: false,
//     longBow: false,
//     Hedgeye: false,
//   },
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
//     feature: 'access to all asset classes',
//     hFinance: true,
//     OpenBB: true,
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
// ]

interface CompanyFeatures {
  company: string
  features: {
    simpleInvestmentFrameworkGuidance: boolean
    mobileAccess: boolean
    dataExport: boolean
    portfolioVisualizationOverview: boolean
    implementOneClickStrategies: boolean
    requestDatasets: boolean
    lowestIndustryCost: boolean
    accessToAllAssetClasses: boolean
    applicationDashboard: boolean
    uploadDataForRewards: boolean
  }
}

export const companiesComparison: CompanyFeatures[] = [
  {
    company: 'humblFINANCE',
    features: {
      lowestIndustryCost: true,
      simpleInvestmentFrameworkGuidance: true,
      mobileAccess: true,
      dataExport: true,
      portfolioVisualizationOverview: true,
      implementOneClickStrategies: true,
      requestDatasets: true,
      accessToAllAssetClasses: true,
      applicationDashboard: true,
      uploadDataForRewards: true,
    },
  },
  {
    company: 'OpenBB',
    features: {
      lowestIndustryCost: true,
      simpleInvestmentFrameworkGuidance: false,
      mobileAccess: true,
      dataExport: true,
      portfolioVisualizationOverview: true,
      implementOneClickStrategies: false,
      requestDatasets: true,
      accessToAllAssetClasses: true,
      applicationDashboard: true,
      uploadDataForRewards: false,
    },
  },
  {
    company: 'Bloomberg',
    features: {
      lowestIndustryCost: false,
      simpleInvestmentFrameworkGuidance: false,
      mobileAccess: false,
      dataExport: false,
      portfolioVisualizationOverview: false,
      implementOneClickStrategies: false,
      requestDatasets: false,
      accessToAllAssetClasses: true,
      applicationDashboard: true,
      uploadDataForRewards: false,
    },
  },
  {
    company: 'Northwestern Mutual',
    features: {
      lowestIndustryCost: false,
      simpleInvestmentFrameworkGuidance: false,
      mobileAccess: false,
      dataExport: false,
      portfolioVisualizationOverview: false,
      implementOneClickStrategies: false,
      requestDatasets: false,
      accessToAllAssetClasses: false,
      applicationDashboard: false,
      uploadDataForRewards: false,
    },
  },
]
