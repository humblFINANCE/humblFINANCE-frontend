import { createClient } from '@/utils/supabase/server'
import ResetPasswordForm from './Form'
import { redirect } from 'next/navigation'
export default async function Page() {
	const supabase = createClient()
	const { error } = await supabase.auth.getUser()

	if (error) {
		redirect('/login')
	}

	return (
		<ResetPasswordForm/>
	)
	
}
