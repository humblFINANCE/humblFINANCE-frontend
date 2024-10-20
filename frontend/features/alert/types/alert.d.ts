export interface IAlertForm extends Record<string, string | number> {
  symbol: string
  condition: string
  logic: string
  action: string
  value: number
  alert_type: string
}

export type TAlertSymbol = {
  symbol: string
  symbol_id: number
}

export type TAlertIndicator = {
  name: string
  indicator_id: number
}

export type TAlertLogic = {
  logic_id: number
  condition: string
}

export type TAlertAction = {
  action_id: number
  name: string
}

// Define the main Alert interface
export interface Alert {
  alert_id: string
  user_id: string
  symbol_id: number
  indicator_id: number
  logic_id: number
  value: number
  created_at: string
  updated_at: string
  alert_actions: string
  watchlist_symbols: string
  indicators: string
  logic_conditions: string
}

// Define the transformed Alert interface with grouped actions
export interface TransformedAlert {
  alert_id: string
  user_id: string
  symbol: string
  indicator_name: string
  condition: string
  value: number
  created_at: string
  updated_at: string
  actions: string[]
}
