import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123', phone: '+91 98765 43210', avatar: '', memberSince: '2024' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123', phone: '+91 91234 56789', avatar: '', memberSince: '2024' },
]

const STORAGE_KEY = 'park_ride_user'

function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    setError(null)
    await new Promise(r => setTimeout(r, 900))

    const found = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (!found) {
      setIsLoading(false)
      const msg = 'Invalid email or password.'
      setError(msg)
      throw new Error(msg)
    }

    const { password: _pw, ...safeUser } = found
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
    setIsLoading(false)
    return safeUser
  }, [])

  const register = useCallback(async (name, email, password) => {
    setIsLoading(true)
    setError(null)
    await new Promise(r => setTimeout(r, 900))

    const exists = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      setIsLoading(false)
      const msg = 'An account with this email already exists.'
      setError(msg)
      throw new Error(msg)
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone: '',
      avatar: '',
      memberSince: new Date().getFullYear().toString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    setUser(newUser)
    setIsLoading(false)
    return newUser
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setError(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout, clearError, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
