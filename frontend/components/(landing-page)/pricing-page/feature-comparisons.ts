interface FeatureComparison {
  feature: string
  hFinance: boolean
  OpenBB: boolean
  longBow: boolean
  Hedgeye: boolean
}

export const dataComparion: FeatureComparison[] = [
  {
    feature: 'lowest industry cost',
    hFinance: true,
    OpenBB: true,
    longBow: false,
    Hedgeye: false,
  },
  {
    feature: 'application dashboard',
    hFinance: true,
    OpenBB: true,
    longBow: true,
    Hedgeye: false,
  },
  {
    feature: 'portfolio optimization',
    hFinance: true,
    OpenBB: false,
    longBow: false,
    Hedgeye: false,
  },
  {
    feature: 'access to all asset classes',
    hFinance: true,
    OpenBB: true,
    longBow: false,
    Hedgeye: false,
  },
  {
    feature: 'data export',
    hFinance: true,
    OpenBB: true,
    longBow: false,
    Hedgeye: false,
  },
  {
    feature: 'request datasets',
    hFinance: true,
    OpenBB: false,
    longBow: false,
    Hedgeye: true,
  },
  {
    feature: 'upload data for rewards',
    hFinance: true,
    OpenBB: false,
    longBow: false,
    Hedgeye: true,
  },
  {
    feature: 'investment education + guidance',
    hFinance: true,
    OpenBB: false,
    longBow: false,
    Hedgeye: false,
  },
  {
    feature: 'mobile access',
    hFinance: true,
    OpenBB: false,
    longBow: false,
    Hedgeye: false,
  },
  {
    feature: 'implement strategies (one click)',
    hFinance: true,
    OpenBB: false,
    longBow: false,
    Hedgeye: false,
  },
]

interface CompanyFeatures {
  company: string
  features: {
    lowestIndustryCost: boolean
    applicationDashboard: boolean
    portfolioOptimization: boolean
    accessToAllAssetClasses: boolean
    dataExport: boolean
    requestDatasets: boolean
    uploadDataForRewards: boolean
    investmentEducationGuidance: boolean
    mobileAccess: boolean
    implementStrategiesOneClick: boolean
  }
}

export const companies: CompanyFeatures[] = [
  {
    company: 'h.Finance',
    features: {
      lowestIndustryCost: true,
      applicationDashboard: true,
      portfolioOptimization: true,
      accessToAllAssetClasses: true,
      dataExport: true,
      requestDatasets: true,
      uploadDataForRewards: true,
      investmentEducationGuidance: true,
      mobileAccess: true,
      implementStrategiesOneClick: true,
    },
  },
  {
    company: 'OpenBB',
    features: {
      lowestIndustryCost: true,
      applicationDashboard: true,
      portfolioOptimization: false,
      accessToAllAssetClasses: true,
      dataExport: true,
      requestDatasets: false,
      uploadDataForRewards: false,
      investmentEducationGuidance: false,
      mobileAccess: false,
      implementStrategiesOneClick: false,
    },
  },
  {
    company: 'longBow',
    features: {
      lowestIndustryCost: false,
      applicationDashboard: true,
      portfolioOptimization: false,
      accessToAllAssetClasses: false,
      dataExport: false,
      requestDatasets: false,
      uploadDataForRewards: false,
      investmentEducationGuidance: false,
      mobileAccess: false,
      implementStrategiesOneClick: false,
    },
  },
  {
    company: 'Hedgeye',
    features: {
      lowestIndustryCost: false,
      applicationDashboard: false,
      portfolioOptimization: false,
      accessToAllAssetClasses: false,
      dataExport: false,
      requestDatasets: true,
      uploadDataForRewards: true,
      investmentEducationGuidance: false,
      mobileAccess: false,
      implementStrategiesOneClick: false,
    },
  },
]
