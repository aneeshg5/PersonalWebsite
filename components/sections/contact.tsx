"use client"

import type React from "react"

import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AnimatedLetters } from "@/components/animated-letters"
import { Mail, Send, GraduationCap, Lightbulb, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration Error",
        description: "Email service is not configured correctly.",
      })
      setIsSubmitting(false)
      return
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current as HTMLFormElement,
        publicKey
      )
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: GraduationCap, label: "Major", value: "Mathematics and Computer Science, B.S." },
    { icon: MapPin, label: "Location", value: "Bay Area, CA / Urbana, IL / Austin, TX" },
    { icon: Lightbulb, label: "Currently Working On", value: "Promo Pigeon" },
  ]

  return (
    <div className="space-y-8 sm:space-y-12 px-4">
      <div className="text-center">
        <AnimatedLetters
          text="Contact"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
        />
        <p className="text-lg sm:text-xl text-slate-400">Let's work together!</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8">
          {}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm order-1">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-yellow-400 flex-shrink-0" />
                <span>Get in Touch</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                I'm always interested in new development and collaboration opportunities, especially for large and
                ambitious projects. If you are interested in my work or would like to talk about a unique opportunity,
                feel free to reach out!
              </p>

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-slate-700/30 border border-slate-600/50"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wide">
                        {info.label}
                      </p>
                      <p className="text-white font-medium text-sm sm:text-base leading-tight">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm order-2">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center">
                <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-yellow-400 flex-shrink-0" />
                <span>Send a Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300 font-medium text-sm sm:text-base">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-10 sm:h-12 text-sm sm:text-base touch-manipulation"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300 font-medium text-sm sm:text-base">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-slate-700/50 border-slate-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-10 sm:h-12 text-sm sm:text-base touch-manipulation"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-slate-300 font-medium text-sm sm:text-base">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-10 sm:h-12 text-sm sm:text-base touch-manipulation"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-300 font-medium text-sm sm:text-base">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 resize-none text-sm sm:text-base touch-manipulation"
                    placeholder="Tell me about your project, idea, or opportunity..."
                  />
                </div>

                <div className="pt-2 sm:pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold h-10 sm:h-12 text-sm sm:text-lg modern-button touch-manipulation"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-slate-900 mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
