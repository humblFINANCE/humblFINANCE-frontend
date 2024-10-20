import { formatNoUnderscore } from '@/utils/common/formatString'

export function formatAlert(alert: any) {
  return `${formatNoUnderscore(alert?.all_symbols?.symbol)}: when ${formatNoUnderscore(alert.indicators.name)} is ${formatNoUnderscore(alert.logic_conditions.condition)}  ${formatNoUnderscore(alert.value)}, then ${alert.alert_actions[0].actions?.name}`
}

export function formatAlertNotification(alert: any) {
  return `${formatNoUnderscore(alert?.all_symbols?.symbol)}  ${formatNoUnderscore(alert.indicators.name)} is ${formatNoUnderscore(alert.logic_conditions.condition)}  ${formatNoUnderscore(alert.value)}, time to ${alert.alert_type} `
}
