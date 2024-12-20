import type { TSector } from '@/components/(dashboard)/portfolio/types'

export const stockSectors: TSector[] = [
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Technology', value: 'technology' },
  { label: 'Financials', value: 'financials' },
  { label: 'Consumer Discretionary', value: 'consumer_discretionary' },
  { label: 'Consumer Staples', value: 'consumer_staples' },
  { label: 'Energy', value: 'energy' },
  { label: 'Utilities', value: 'utilities' },
  { label: 'Industrials', value: 'industrials' },
  { label: 'Materials', value: 'materials' },
  { label: 'Real Estate', value: 'real_estate' },
  { label: 'Communication Services', value: 'communication_services' },
  { label: 'Information Technology', value: 'information_technology' },
  { label: 'Telecommunications', value: 'telecommunications' },
]

export const ENDPOINTS = {
  USERTABLE: 'portfolio',
  MANDELBROT: 'humblCHANNEL',
}

export const TABLES = {
  WATCHLIST: 'watchlists',
  WATCHLIST_SYMBOLS: 'watchlist_symbols',
  ALL_SYMBOLS: 'all_symbols',
}
