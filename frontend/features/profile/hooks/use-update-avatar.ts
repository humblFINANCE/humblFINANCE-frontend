import {Profile} from '@/features/user/types/profile'
import {createClient} from '@/utils/supabase/client'
import {useState} from 'react'

export function useUpdateAvatar() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateProfileAvatar = async (id: string, data: Profile) => {
        setIsLoading(true)
        const supabase = createClient()
        const {
            data: resUpload,
            error: uploadError
        }: any | null = await supabase.storage.from('profile_avatars').upload(data.filePath, data.file, {
            upsert: true,
        });

        if (resUpload?.id) {
            const {data: publicUrl} = supabase.storage.from('profile_avatars').getPublicUrl(resUpload.path)
            await supabase.from('profiles').update({avatar_url: publicUrl.publicUrl}).eq('id', id)
            setIsLoading(false)
            return publicUrl.publicUrl;
        }

        if (uploadError) {
            setError(uploadError.message)
        }
    }

    return {
        updateProfileAvatar,
        isLoading,
        error,
    }
}
