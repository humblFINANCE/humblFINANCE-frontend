import { createClient } from '@/utils/supabase/client'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import React from 'react'
import {
  TAlertAction,
  TAlertIndicator,
  TAlertLogic,
  TAlertSymbol,
} from '../types/alert'

const useDataSymbol = () => {
  const client = createClient()
  const [dataSymbol, setDataSymbol] = React.useState<TAlertSymbol[]>([])
  const [error, setError] = React.useState<string | null>(null)
  React.useEffect(() => {
    const refetch = async () => {
      const response = await client.from('watchlist_symbols').select('*')
      if (response.error) {
        return setError(response.error.message)
      }

      setDataSymbol(response.data)
    }

    refetch()
  }, [])

  return { dataSymbol, error }
}

const useDataIndicator = () => {
  const client = createClient()

  const [dataIndicator, setDataIndicator] = React.useState<TAlertIndicator[]>(
    []
  )
  const [error, setError] = React.useState<string | null>(null)
  React.useEffect(() => {
    const refetch = async () => {
      const response = await client.from('indicators').select('*')
      if (response.error) {
        return setError(response.error.message)
      }

      setDataIndicator(response.data)
    }

    refetch()
  }, [])

  return { dataIndicator, error }
}

const useDataLogic = () => {
  const client = createClient()

  const [dataLogic, setDataLogic] = React.useState<TAlertLogic[]>([])
  const [error, setError] = React.useState<string | null>(null)
  React.useEffect(() => {
    const refetch = async () => {
      const response = await client.from('logic_conditions').select('*')
      if (response.error) {
        return setError(response.error.message)
      }

      setDataLogic(response.data)
    }

    refetch()
  }, [])

  return { dataLogic, error }
}

const useDataAction = () => {
  const client = createClient()

  const [dataAction, setDataAction] = React.useState<TAlertAction[]>([])
  const [error, setError] = React.useState<string | null>(null)
  React.useEffect(() => {
    const refetch = async () => {
      const response = await client.from('actions').select('*')
      if (response.error) {
        return setError(response.error.message)
      }

      setDataAction(response.data)
    }

    refetch()
  }, [])

  return { dataAction, error }
}

export { useDataSymbol, useDataIndicator, useDataLogic, useDataAction }
