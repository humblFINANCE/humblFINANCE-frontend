export interface IDataWatchList extends String<string, any> {
  symbol: string
  last_close: number
  mandelbrot_channel_buy: number
  mandelbrot_channel_sell: number
  up_down: string
  risk_reward: number
  asset_class: string
  sector: string
  humbl_suggestion: string
}

export type TSector = {
  label: string
  value: string
}

// STATE INTERFACE
export interface IPortfolio {
  date: string
  symbol: string
  buy_price: number
  last_price: number
  sell_price: number
  ud_pct: string
  ud_ratio: number
  sector: string
  asset_class: string
}

export interface IPortfolioParams extends Record<string, string> {
  symbols: string
  membership: string
}

export interface IPortfolioState {
  portfolio: IPortfolio[]
  loading: boolean
}

export interface IPortfolioAction {
  getPortfolio: (params: IPortfolioParams) => Promise<void>
}

// * WATCHLIST INTERFACE

export interface IWatchlistState {
  watchlists: IWatchlist[]
  loading: boolean
}

export interface IWatchlistAction {
  getWatchlists: () => Promise<void>
  addWatchlist: (name: string) => Promise<void>
  removeWatchlist: (watchlistId: number) => Promise<void>
  updateWatchlist: (id: number, name: string) => Promise<void>
  updateDefaultWatchlist: (id: number, is_default: boolean) => Promise<void>
}

export interface IWatchlistSymbol {
  id: number
  watchlist_id: number
  symbol: string
}

export interface IWatchlist {
  id: number
  user_id: string
  name: string
  is_default: boolean
  created_at: string

  watchlist_symbols: IWatchlistSymbols[]
}

// * TICKER INTERFACE

export interface ISymbolState {
  symbols: ISymbol[]
  error: string
}

export interface ISymbolAction {
  getSymbols: (watchlist_id: number) => Promise<void>
  addSymbol: (symbol: string, watchlist_id: number) => Promise<void>
  deleteSymbol: (id: number, watchlist_id: number) => Promise<void>
}

export interface ISymbol {
  symbol_id: number
  symbol: string
  watchlist_id: number
  id: number
}
