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
    return async function() {

      const getURL = () => {
        let url =
          process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
          process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
          'http://localhost:3000/'
        // Make sure to include `https://` when not localhost.
        url = url.startsWith('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.endsWith('/') ? url : `${url}/`
        return url
      }

      const supabase = createClient()
      const { data } = await supabase.auth.getUser()

      const { searchParams } = new URL(window.location.href)
      const from = searchParams.get('from')
      const options = {
        redirectTo:
          getURL() +
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
