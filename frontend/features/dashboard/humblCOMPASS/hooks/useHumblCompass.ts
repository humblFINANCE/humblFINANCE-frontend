import { create } from 'zustand'
import { CompassCountry } from '../constants/compass_countries'

interface IHumblCompassState {
  humblCompass: any | null
  loading: boolean
}

interface IHumblCompassAction {
  getHumblCompass: (props: {
    country: CompassCountry
    shouldRefresh?: boolean
    membership?: string
  }) => Promise<void>
}

export const useHumblCompass = create<IHumblCompassState & IHumblCompassAction>(
  (set) => ({
    humblCompass: null,
    loading: false,
    getHumblCompass: async ({ country, shouldRefresh, membership }) => {
      try {
        set(() => ({ loading: true }))

        const headers = new Headers()
        headers.set('Content-Type', 'application/json')

        if (shouldRefresh) {
          headers.set('Cache-Control', 'no-cache')
          headers.set('Pragma', 'no-cache')
        } else {
          headers.set('Cache-Control', 'max-age=60')
          headers.set('Pragma', 'max-age=60')
        }

        const url = new URL('https://api.humblfinance.io/api/v1/humbl-compass')
        url.searchParams.append('country', country)
        url.searchParams.append('start_date', '2023-01-01')
        url.searchParams.append('chart', 'true')
        url.searchParams.append('template', 'humbl_dark')
        if (membership) {
          url.searchParams.append('membership', membership)
        }

        const response = await fetch(url.toString(), { method: 'GET', headers })

        const { response_data, message, status_code } = await response.json()

        if (status_code === 200) {
          set(() => ({ humblCompass: response_data, loading: false }))
        } else {
          console.error('Error fetching data:', message)
          set(() => ({ loading: false }))
        }
      } catch (err) {
        console.error('Error in getHumblCompass:', err)
        set(() => ({ loading: false }))
      }
    },
  })
)
