import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { socialLoginRedirectPath } from '../constants'

export function useLogin() {
  const router = useRouter()

  const handleLoginWithOauth = (
    provider:
      | 'google'
      | 'github'
      | 'twitter'
      | 'discord'
      | 'linkedin_oidc'
      | 'apple'
  ) => {
    return async function () {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()

      const { searchParams } = new URL(window.location.href)
      const from = searchParams.get('from')
      const options = {
        redirectTo:
          window.origin +
          socialLoginRedirectPath +
          (from ? `?from=${from}` : ''),
      }

      if (data?.user?.is_anonymous) {
        await supabase.auth.linkIdentity({
          provider,
          options,
        })
        router.replace('/dashboard/home')
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options,
        })
        if (error) {
          router.replace('/login?message=' + error.message)
        }
      }
    }
  }

  return {
    handleLoginWithOauth,
  }
}
