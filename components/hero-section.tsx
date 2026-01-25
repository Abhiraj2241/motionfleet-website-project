"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px" }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-slide-in-up")
      }
    }, observerOptions)
    ;[titleRef.current, descriptionRef.current, ctaRef.current].forEach((el) => {
      if (el) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Title */}
        <div ref={titleRef} className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
            Transforming Data into{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Actionable Insights</span>
          </h1>
        </div>

        {/* Description */}
        <div ref={descriptionRef}>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            I'm Abhiraj Sharma, Data Analyst & Analytics Professional. Specialized in uncovering patterns, driving data-driven decision-making, and delivering impactful insights that fuel business growth and innovation across multiple industries.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            Explore Projects →
          </Button>
          <Button size="lg" variant="outline">
            Connect with Me
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-8 animate-float">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-center justify-center mx-auto">
            <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
