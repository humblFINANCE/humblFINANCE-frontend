import React from 'react'
import { Alert, TransformedAlert } from '../types/alert'
import { createClient } from '@/utils/supabase/client'

const useActiveAlertData = () => {
  const [activeAlert, setActiveAlert] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const supabase = createClient()

  const refetch = async () => {
    setIsLoading(true)
    const user = await supabase.auth.getUser()
    if (!user.data.user) {
      return
    }

    const { data, error } = await supabase
      .from('alerts')
      .select(
        `
      alert_id,
      user_id,
      symbol_id,
      indicator_id,
      logic_id,
      value,
      created_at,
      updated_at,
      all_symbols:all_symbols(symbol),
      indicators:indicators(name),
      logic_conditions:logic_conditions(condition),
      alert_actions(actions(action_id,name))
    `
      )
      .eq('user_id', user.data.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching alerts:', error)
    } else {
      setActiveAlert(data)
    }

    setIsLoading(false)
  }

  const deleteAlert = async (
    id: string,
    setSelectedId: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setIsLoading(true)
    const deleteAlertAction = await supabase
      .from('alert_actions')
      .delete()
      .eq('alert_id', id)

    if (deleteAlertAction.error) {
      console.error('Error deleting alert actions:', deleteAlertAction.error)
      return setIsLoading(false)
    }

    const { error } = await supabase.from('alerts').delete().eq('alert_id', id)
    if (error) {
      console.error('Error deleting alert:', error)
      return setIsLoading(false)
    } else {
      setSelectedId('')
      refetch()
    }

    setIsLoading(false)
  }

  React.useEffect(() => {
    refetch()
  }, [])

  return {
    activeAlert,
    isLoading,
    deleteAlert,
    refetch,
  }
}

export default useActiveAlertData
