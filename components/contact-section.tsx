"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && containerRef.current) {
          containerRef.current.classList.add("animate-slide-in-up")
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const socialLinks = [
    { emoji: "in", href: "https://www.linkedin.com/in/abhiraj-sharma-841824241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
    { emoji: "📷", href: "#", label: "Instagram" },
    { emoji: "🐙", href: "#", label: "GitHub" },
    { emoji: "𝕏", href: "#", label: "Twitter" },
  ]

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden mx-6 md:mx-12 my-8 rounded-2xl glass-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 space-y-4">
          <p className="text-primary text-sm font-semibold uppercase tracking-wide">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || submitted}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? "Message Sent!" : isLoading ? "Sending..." : "Send Message"}
                <span className={submitted ? "rotate-12" : "group-hover:translate-x-1 transition-transform"}>
                  {submitted ? "✓" : isLoading ? "..." : "→"}
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Email</p>
              <a
                href="mailto:Abhirajsharma191@gmail.com"
                className="text-lg font-semibold hover:text-primary transition-colors flex items-center gap-2"
              >
                <span>✉️</span>
                Abhirajsharma191@gmail.com
              </a>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-muted-foreground">Connect with me</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ emoji, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="p-3 bg-secondary border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all text-lg"
                  >
                    {emoji}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <p className="text-sm text-muted-foreground">
                Whether it's a design consultation, partnership opportunity, or just a friendly chat about design and
                mobility—I'm always interested in connecting with passionate people.
              </p>
              <p className="text-sm text-muted-foreground">Expected response time: 24-48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
