import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-6">
      <div className="max-w-md w-full">
        <h1 className="font-display text-4xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            Log In
          </span>
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}
