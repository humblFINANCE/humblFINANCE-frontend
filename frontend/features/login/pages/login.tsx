import { LoginForm } from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
      <LoginForm />
    </div>
  )
}
