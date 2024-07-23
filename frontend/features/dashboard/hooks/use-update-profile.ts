import {Profile} from '@/features/user/types/profile'
import {createClient} from '@/utils/supabase/client'
import {useState} from 'react'

export function useUpdateProfile() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateProfile = async (id: string, data: Profile) => {
        setIsLoading(true)
        const supabase = createClient()
        const {data: resUpdated, error}: any | null = await supabase.from('profiles').update(data).eq('id', id).select()

        if (error) {
            setError(error.message)
        }

        setIsLoading(false)
        return resUpdated[0];
    }

    return {
        updateProfile,
        isLoading,
        error,
    }
}
