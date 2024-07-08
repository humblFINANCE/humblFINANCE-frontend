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
export interface IPortofolio {
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

export interface IPortofolioParams extends Record<string, string> {
  symbols: string
  membership: string
}

export interface IPortofolioState {
  portofolio: IPortofolio[]
}

export interface IPortofolioAction {
  getPortofolio: (params: IPortofolioParams) => Promise<void>
}

// * WATCHLIST INTERFACE

export interface IWatchlistState {
  watchlists: IWatchlist[]
}

export interface IWatchlistAction {
  getWatchlists: () => Promise<void>
  addWatchlist: (name: string) => Promise<void>
  removeWatchlist: (watchlistId: number) => Promise<void>
  updateWatchlist: (id: number, name: string) => Promise<void>
}

export interface IWatchlistSymbol {
  ticker_id: number
  watchlist_id: number
  ticker_symbol: string
}

export interface IWatchlist {
  watchlist_id: number
  user_id: string
  name: string
  created_at: string

  symbols: IWatchlistSymbol[]
}

// * TICKER INTERFACE

export interface ITickerState {
  tickers: ITicker[]
}

export interface ITickerAction {
  getTickers: (watchlist_id: number) => Promise<void>
  addTicker: (ticker: string, watchlist_id: number) => Promise<void>
  deleteTicker: (ticker_id: number, watchlist_id: number) => Promise<void>
}

export interface ITicker {
  ticker_id: number
  ticker_symbol: string
  watchlist_id: number
}
