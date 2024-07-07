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
export interface IWatchList {
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

export interface IWatchlistParams extends Record<string, string> {
  symbols: string
  membership: string
}

export interface IWatchListState {
  watchlists: IWatchList[]
}

export interface IWatchListAction {
  setWatchlists: (watchlists: IWatchList[]) => void
  getWatchlists: (params: IWatchlistParams) => Promise<void>
}
