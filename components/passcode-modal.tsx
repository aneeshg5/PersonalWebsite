"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, EyeOff, X } from "lucide-react"

interface PasscodeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (passcode: string) => void
  title: string
  description: string
}

export function PasscodeModal({ isOpen, onClose, onSuccess, title, description }: PasscodeModalProps) {
  const [passcode, setPasscode] = useState("")
  const [showPasscode, setShowPasscode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
      setPasscode("")
      setError("")
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Pass the passcode to the parent component for handling
      // The parent will handle the API call and authentication
      onSuccess(passcode)
      onClose()
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-lg shadow-2xl transition-all duration-300 ${
          isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-slate-400 hover:text-white hover:bg-slate-800 w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-slate-400 mt-2">{description}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="passcode" className="text-slate-300 font-medium">
                  Enter Passcode
                </Label>
                <div className="relative">
                  <Input
                    id="passcode"
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter passcode to continue"
                    className="bg-slate-800/50 border-slate-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 pr-10"
                    autoFocus
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-white"
                    disabled={isSubmitting}
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!passcode.trim() || isSubmitting}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold modern-button"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>

            <div className="pt-2 border-t border-slate-700/50">
              <p className="text-xs text-slate-500 text-center">
                This content is protected. Please contact me if you need access.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}