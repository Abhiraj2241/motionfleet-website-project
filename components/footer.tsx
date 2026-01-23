"use client"

import { useEffect, useRef } from "react"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && footerRef.current) {
          footerRef.current.classList.add("animate-slide-in-up")
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="opacity-0 relative py-12 px-6 border-t border-border bg-secondary/30">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <p className="font-bold text-lg">Abhiraj Sharma</p>
          <p className="text-sm text-muted-foreground">Founder & CEO of MotionFleet | UI/UX Designer</p>
        </div>

        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="#portfolio" className="hover:text-foreground transition-colors">
            Portfolio
          </a>
          <a href="#contact" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>

        <p className="text-xs text-muted-foreground text-center md:text-right">
          © 2025 Abhiraj Sharma. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
