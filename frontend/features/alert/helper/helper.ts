export function formatAlert(alert: any) {
  return `${alert.watchlist_symbols.symbol}: when ${alert.indicators.name} is ${alert.logic_conditions.condition}  ${alert.value}, then ${alert.alert_actions[0].actions?.name}`
}
