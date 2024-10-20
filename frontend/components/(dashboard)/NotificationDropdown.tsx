import { formatAlertNotification } from '@/features/alert/helper/helper'
import { useUser } from '@/features/user/hooks/use-user'
import { createClient } from '@/utils/supabase/client'
import { Icon } from '@iconify/react'
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { title } from 'process'
import { useCallback, useEffect, useState } from 'react'

export const NotificationsDropdown = () => {
  const supabase = createClient()
  const auth = useUser()
  const [notifications, setNotifications] = useState<any[]>([])
  const sendNotification = useCallback(async (message: string) => {
    try {
      const res = await fetch(
        // this one should be put in .env
        'https://loavwylgjranxanmktaa.supabase.co/functions/v1/notify',
        // 'http://localhost:54321/functions/v1/notify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            message: message,
            user_id: auth.user.id,
            type: 'PUSH', //EMAIL | PUSH | SMS
            title: 'humblALERTS',
          }),
        }
      )
      const response = await res.json()

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchUnreadNotifications = useCallback(
    async (alert_id?: string) => {
      let alerts
      const query = `
              alert_id,
              user_id,
              symbol_id,
              indicator_id,
              logic_id,
              value,
              created_at,
              updated_at,
              is_active,
              all_symbols:all_symbols(symbol),
              indicators:indicators(name),
              logic_conditions:logic_conditions(condition),
              alert_actions(actions(action_id,name)),
              alert_history(*)
              `

      if (alert_id === undefined) {
        alerts = await supabase
          .from('alerts')
          .select(query)
          .eq('alert_history.is_seen', false)
          .eq('user_id', auth.user.id)
      } else {
        alerts = await supabase
          .from('alerts')
          .select(query)
          .eq('alert_id', alert_id)
          .eq('is_active', true)
          .eq('alert_history.is_seen', false)

        if (alerts.error) {
          return
        }
        await sendNotification('this is alerts from humbl')
      }

      if (alerts.error) {
        return
      }

      const alertHistory = []

      for (const alert of alerts.data) {
        alertHistory.push(
          ...alert.alert_history.map((history) => ({
            id: history.history_id,
            type: 'Symbol Alert',
            message: formatAlertNotification(alert),
          }))
        )
      }

      console.log('ALERT HISTORY', alertHistory)
      // TODO - format message as a notification

      setNotifications(alertHistory)
    },
    [auth.user.id, sendNotification, supabase]
  )

  const dismissNotification = useCallback(async (id: string) => {
    await supabase
      .from('alert_history')
      .update({ is_seen: true })
      .eq('history_id', id)

    fetchUnreadNotifications()
  }, [])

  useEffect(() => {
    const historyListener = supabase
      .channel('public:alert_history')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'alert_history' },
        async (payload) => {
          console.log('Change received!', payload)

          fetchUnreadNotifications(payload.new.alert_id)
        }
      )
      .subscribe()

    fetchUnreadNotifications()

    return () => {
      supabase.removeChannel(historyListener)
    }
  }, [])

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Badge
          content={notifications.length}
          className="text-white bg-danger border-danger mr-0.5 mt-1 cursor-pointer"
          size="sm"
        >
          <DropdownTrigger className="cursor-pointer">
            <Icon
              width={20}
              icon="solar:bell-bold"
              className="text-default-400 cursor-pointer"
            />
          </DropdownTrigger>
        </Badge>
      </DropdownTrigger>

      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notifications">
          {notifications.map((notification, id) => (
            <DropdownItem
              endContent={<Icon icon="openmoji:cross-mark" width={20} />}
              key={id}
              classNames={{
                base: 'py-2',
                title: 'text-base font-semibold',
              }}
              description={notification.message}
              onPress={() => {
                // console.log(notification)
                dismissNotification(notification.id)
              }}
            >
              {notification.type}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
