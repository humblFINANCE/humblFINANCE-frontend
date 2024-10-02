'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const signInAnonymously = async (
  initialState: string | null,
  formData: FormData
) => {
  const supabase = createClient()
  const captchaToken = formData.get('capchaToken') as string
  const { data, error } = await supabase.auth.signInAnonymously({
    options: {
      captchaToken,
    },
  })

  if (error) {
    return error?.message
  }

  const { error: errorUpdate } = await supabase
    .from('profiles')
    .update({ refresh_limit: 0 })
    .eq('id', data.user?.id)

  if (errorUpdate) {
    return errorUpdate.message
  }

  return redirect('/dashboard/home')
}
