"use client"

import { useState, useEffect } from "react"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // First check session storage
    const authStatus = sessionStorage.getItem("portfolio_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      setIsLoading(false)
      return
    }

    // Then check URL for access token
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const accessToken = urlParams.get('access')
      
      if (accessToken) {
        // Validate token via API
        fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setIsAuthenticated(true)
            sessionStorage.setItem("portfolio_authenticated", "true")
          }
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    }
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
