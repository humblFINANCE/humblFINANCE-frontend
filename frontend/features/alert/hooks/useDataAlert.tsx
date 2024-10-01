import { createClient } from '@/utils/supabase/client'
import React from 'react'

const useDataFetcher = (table: string) => {
  const client = createClient()
  const [data, setData] = React.useState<any[]>([])
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const refetch = async () => {
      const response = await client.from(table).select()

      if (response.error) {
        return setError(response.error.message)
      }

      setData(response.data)
    }

    refetch()
  }, [table])

  return { data, error }
}

const useDataSymbol = () => useDataFetcher('watchlist_symbols')
const useDataIndicator = () => useDataFetcher('indicators')
const useDataLogic = () => useDataFetcher('logic_conditions')
const useDataAction = () => useDataFetcher('actions')

export { useDataAction, useDataIndicator, useDataLogic, useDataSymbol }
