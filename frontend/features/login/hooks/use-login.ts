import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.origin + '/auth/callback/social-login',
        },
      })

      if (error) {
        router.replace('/login?message=' + error.message)
      }
    }
  }

  return {
    handleLoginWithOauth,
  }
}
