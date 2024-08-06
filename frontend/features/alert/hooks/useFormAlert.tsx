// hooks/useCreateAlert.ts
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AlertFormData } from '@/features/alert/schema'

const useCreateAlert = (alert_id?: string, onOpenChange?: () => void) => {
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<AlertFormData>({
    // resolver: zodResolver(alertSchema),
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<AlertFormData> = async (data) => {
    setLoading(true)
    setError(null)
    const { data: user } = await supabase.auth.getUser()
    if (user.user) {
      data.user_id = user?.user?.id
    }
    const body = Object.fromEntries(
      Object.entries(data)
        .map(([key, value]) => [
          key,
          key === 'user_id' || key === 'value' ? value : +value,
        ])
        .filter(([key, value]) => key !== 'action_id')
    )

    const alertInsert = await supabase.from('alerts').insert([body]).select()
    if (alertInsert.error) {
      setError(alertInsert.error.message)
      return
    } else {
      console.log('Alert created successfully')
    }

    const actionInsert = await supabase.from('alert_actions').insert([
      {
        action_id: data.action_id,
        alert_id: alertInsert.data[0].alert_id,
      },
    ])

    setLoading(false)
    if (actionInsert.error) {
      setError(actionInsert.error.message)
      return
    } else {
      reset({
        action_id: '',
        symbol_id: '',
        indicator_id: '',
        logic_id: '',
        value: '',
      })
    }

    toast.success('Alert created successfully')
  }

  const onUpdate: SubmitHandler<AlertFormData> = async (data) => {
    console.log(data)

    setLoading(true)
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from('alerts')
        .update({
          symbol_id: +data.symbol_id,
          indicator_id: +data.indicator_id,
          logic_id: +data.logic_id,
          value: data.value,
          updated_at: new Date().toISOString(),
        })
        .eq('alert_id', alert_id)
      if (updateError) {
        throw updateError
      }
      const { error: actionUpdateError } = await supabase
        .from('alert_actions')
        .update({
          action_id: +data.action_id,
        })
        .eq('alert_id', alert_id)
      if (actionUpdateError) {
        throw actionUpdateError
      }
    } catch (error) {
      console.error('Error updating alert:', error)
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }

    setLoading(false)

    toast.success('Alert updated successfully')
    if (onOpenChange) {
      onOpenChange()
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    error,
    watch,
    control,
    reset,
    onUpdate,
  }
}

export default useCreateAlert
