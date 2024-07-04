export interface IAlertForm extends Record<string, string | number> {
  symbol: string
  condition: string
  logic: string
  action: string
  value: number
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
