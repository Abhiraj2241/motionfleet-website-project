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
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 mt-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Subtitle Badge */}
        <div className="inline-block">
          <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <p className="text-sm font-medium text-primary">Welcome to My Portfolio</p>
          </div>
        </div>

        {/* Title */}
        <div ref={titleRef} className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight text-balance">
            Transforming Data into{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent animate-pulse">
              Actionable Insights
            </span>
          </h1>
        </div>

        {/* Description */}
        <div ref={descriptionRef} className="pt-4">
          <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
            I'm Abhiraj Sharma, Data Analyst & Analytics Professional. Specialized in uncovering patterns, driving data-driven decision-making, and delivering impactful insights that fuel business growth and innovation across multiple industries.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Projects
            <span>→</span>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="rounded-full px-8 hover:bg-primary/10 transition-all hover:scale-105 bg-transparent"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Connect with Me
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-12 animate-float">
          <p className="text-xs text-muted-foreground mb-3">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-center justify-center mx-auto">
            <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
