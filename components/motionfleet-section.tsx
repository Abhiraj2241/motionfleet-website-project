"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MotionFleetSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contentRefs.current.forEach((ref, index) => {
            if (ref) {
              setTimeout(() => {
                ref.classList.add("animate-slide-in-up")
              }, index * 100)
            }
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const metrics = [
    { label: "Companies Using MotionFleet", value: "500+", emoji: "🏢" },
    { label: "Fleet Vehicles Managed", value: "50K+", emoji: "📈" },
    { label: "Delivery Efficiency Increase", value: "35%", emoji: "⚡" },
    { label: "Active Users", value: "100K+", emoji: "👥" },
  ]

  const features = [
    "Real-time fleet tracking and optimization",
    "Intelligent route planning with ML algorithms",
    "Driver performance analytics and insights",
    "Predictive maintenance alerts",
    "Integration with existing fleet systems",
    "Enterprise-grade security and compliance",
  ]

  return (
    <section id="work" ref={sectionRef} className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={(el) => {
            contentRefs.current[0] = el
          }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-200">
              Featured Project
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">MotionFleet</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl">
            Revolutionary fleet management platform combining AI-powered optimization with elegant user interface design
            to transform how companies manage their logistics operations.
          </p>
        </div>

        {/* Hero Image */}
        <div
          ref={(el) => {
            contentRefs.current[1] = el
          }}
          className="mb-16 rounded-xl overflow-hidden border border-border/30 bg-gradient-to-br from-orange-500/10 to-orange-600/10 h-96 flex items-center justify-center"
        >
          <img
            src="/fleet-management-dashboard.png"
            alt="MotionFleet dashboard interface"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              ref={(el) => {
                contentRefs.current[index + 2] = el
              }}
            >
              <Card className="p-6 text-center border-border/50">
                <div className="flex justify-center mb-3 text-3xl">{metric.emoji}</div>
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Features & Details */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Description */}
          <div
            ref={(el) => {
              contentRefs.current[6] = el
            }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Platform Overview</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                MotionFleet is a comprehensive fleet management solution designed from the ground up with user
                experience at its core. The platform integrates real-time tracking, predictive analytics, and
                intelligent route optimization into a single, intuitive interface.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As the founder and design lead, I spearheaded the entire product vision, from initial concept through to
                market launch, ensuring that every interaction prioritizes user success and business value.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Design Highlights</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Custom design system built for complex data visualization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Accessibility-first approach ensuring WCAG 2.1 AA compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Responsive design supporting desktop, tablet, and mobile workflows</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Features */}
          <div
            ref={(el) => {
              contentRefs.current[7] = el
            }}
          >
            <Card className="p-8 border-border/50 bg-card/50">
              <h3 className="text-lg font-semibold mb-6">Key Features</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
