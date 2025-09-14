"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  username: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token on mount
    const storedToken = localStorage.getItem("auth-token")
    const storedUsername = localStorage.getItem("auth-username")

    if (storedToken && storedUsername) {
      setUser({ username: storedUsername, token: storedToken })
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - accept any username, password must be 'test123'
    if (password === "test123") {
      const mockToken = `mock-jwt-${Date.now()}`
      const userData = { username, token: mockToken }

      setUser(userData)
      localStorage.setItem("auth-token", mockToken)
      localStorage.setItem("auth-username", username)

      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
    localStorage.removeItem("auth-username")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
