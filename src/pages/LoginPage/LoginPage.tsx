import { useState, type FormEvent } from 'react'
import { useAuth } from '../../features/auth/AuthProvider'

export default function LoginPage() {
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const ok = login(password)
    setError(!ok)
    if (!ok) setPassword('')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 to-[#070b14] px-4 text-slate-100">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/40"
      >
        <h1 className="text-2xl font-bold text-white">Cravernau</h1>
        <p className="mt-1 text-sm text-slate-400">Ingresa la contraseña para acceder.</p>

        <label htmlFor="password" className="mb-2 mt-6 block text-sm font-semibold uppercase tracking-wide text-slate-300">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          autoFocus
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
        />
        {error && <p className="mt-2 text-sm text-red-400">Contraseña incorrecta.</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
