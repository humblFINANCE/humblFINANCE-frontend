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
}

export interface ITradingView {
  date: string
  symbol: string
  bottom_price: number
  recent_price: number
  top_price: number
}

export interface IPortfolioParams extends Record<string, string> {
  symbols?: string
  membership?: string
}

export interface IPortfolioState {
  portfolio: IPortfolio[]
  tradingView: any
  loading: boolean
}

export interface IPortfolioAction {
  getPortfolio: (params: IPortfolioParams) => Promise<void>
  getTradingSPX: (params?: IPortfolioParams) => Promise<void>
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
  refreshWatchlist: (profile: any) => Promise<void>
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
  all_symbols: IAllSymbols[]
  error: string
  loading: boolean
}

export interface ISymbolAction {
  getSymbols: (watchlist_id: number) => Promise<void>
  addSymbol: (symbol: string, watchlist_id: number) => Promise<void>
  deleteSymbol: (id: number, watchlist_id: number) => Promise<void>
  findSymbols: (symbol: string) => Promise<void>
  setError: (error: string) => void
}

export interface ISymbol {
  symbol_id: number
  symbol: string
  watchlist_id: number
  id: number
}

export interface IAllSymbols {
  symbol_id: number
  symbol: string
  date_added: string
  name: string
}
