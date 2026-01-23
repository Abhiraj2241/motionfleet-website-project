"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import MotionFleetSection from "@/components/motionfleet-section"
import JourneySection from "@/components/journey-section"
import PortfolioSection from "@/components/portfolio-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Set initial theme
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      <HeroSection />
      <AboutSection />
      <MotionFleetSection />
      <JourneySection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
