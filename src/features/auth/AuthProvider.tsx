import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

const AUTH_KEY = 'cravernau:auth'
const PASSWORD = 'nuvis2026'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === 'true',
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login(password) {
        if (password !== PASSWORD) return false
        localStorage.setItem(AUTH_KEY, 'true')
        setIsAuthenticated(true)
        return true
      },
      logout() {
        localStorage.clear()
        setIsAuthenticated(false)
      },
    }),
    [isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
