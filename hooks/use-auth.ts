"use client"

import { useState, useEffect } from "react"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authStatus = sessionStorage.getItem("portfolio_authenticated")
    setIsAuthenticated(authStatus === "true")
    setIsLoading(false)
  }, [])

  const authenticate = () => {
    setIsAuthenticated(true)
    sessionStorage.setItem("portfolio_authenticated", "true")
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("portfolio_authenticated")
  }

  return {
    isAuthenticated,
    isLoading,
    authenticate,
    logout,
  }
}
