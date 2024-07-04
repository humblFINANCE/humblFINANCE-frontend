import { useFormState } from 'react-dom'
import { signIn } from '@/features/login/actions'

export function useSignInState(initialState: Parameters<typeof signIn>[0]) {
  const [signInWithEmailState, signInAction] = useFormState(
    signIn,
    initialState
  )
  return {
    signInWithEmailState,
    signInAction,
  }
}
