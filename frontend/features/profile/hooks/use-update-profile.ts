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

    const updateProfilePicture = async (id: string, data: Profile) => {
        setIsLoading(true)
        const supabase = createClient()
        const {
            data: resUpload,
            error: uploadError
        }: any | null = await supabase.storage.from('avatar').upload(data.filePath, data.file);

        if (resUpload?.id) {
            const {data: publicUrl} = supabase.storage.from('avatar').getPublicUrl(resUpload.path)
            const {error: publicUrlError}: any | null = await supabase.from('profiles').update({avatar_url: publicUrl.publicUrl}).eq('id', id)
            setIsLoading(false)
            return publicUrl.publicUrl;
        }


        if (uploadError) {
            setError(uploadError.message)
        }
    }

    return {
        updateProfile,
        updateProfilePicture,
        isLoading,
        error,
    }
}
