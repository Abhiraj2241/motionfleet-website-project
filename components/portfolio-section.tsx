"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  image: string
  details: string
  technologies: string[]
  impact: string
}

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const portfolioItems: PortfolioItem[] = [
    {
      id: "1",
      title: "MotionFleet Dashboard",
      category: "Product Design",
      description: "Comprehensive fleet management interface with real-time tracking and analytics.",
      image: "/motionfleet-dashboard.jpg",
      details:
        "Designed a complete dashboard system that consolidates fleet operations, vehicle tracking, driver management, and performance analytics into a single, intuitive interface. The design focused on reducing cognitive load while providing enterprise-level functionality.",
      technologies: ["Figma", "React", "TypeScript", "Tailwind CSS"],
      impact: "Increased user engagement by 45% and reduced training time by 60% for new users.",
    },
    {
      id: "2",
      title: "Mobile Fleet Management App",
      category: "Mobile Design",
      description:
        "Native iOS and Android application for drivers and supervisors to manage routes and updates on the go.",
      image: "/mobile-fleet-app.jpg",
      details:
        "Created a mobile-first experience optimized for on-the-field operations. Features include real-time navigation, delivery confirmation, and quick communication tools designed for usability in challenging conditions.",
      technologies: ["React Native", "Figma", "Firebase", "Swift"],
      impact: "Improved delivery efficiency by 35% and received 4.8/5 app store rating.",
    },
    {
      id: "3",
      title: "Data Visualization System",
      category: "UI Components",
      description: "Custom visualization components for analytics and performance metrics dashboards.",
      image: "/data-visualization.jpg",
      details:
        "Developed an advanced charting and visualization system that allows users to customize dashboards and create meaningful reports from complex fleet data in real-time.",
      technologies: ["D3.js", "React", "Recharts", "TypeScript"],
      impact: "Enabled data-driven decision making, reducing operational costs by 25%.",
    },
    {
      id: "4",
      title: "User Onboarding Experience",
      category: "UX/UI",
      description: "Interactive guided tours and onboarding flows for new platform users.",
      image: "/onboarding-flow.jpg",
      details:
        "Designed progressive disclosure patterns and interactive tutorials that reduced time-to-productivity from weeks to days, with contextual help systems throughout the platform.",
      technologies: ["Figma", "React", "Animation", "Accessibility"],
      impact: "Reduced support tickets by 70% and improved user retention by 50%.",
    },
    {
      id: "5",
      title: "Design System & Components",
      category: "Design System",
      description: "Comprehensive design system with 100+ reusable components and design tokens.",
      image: "/design-system.jpg",
      details:
        "Built a scalable design system from ground up that standardized visual language, interaction patterns, and component behaviors across all MotionFleet products.",
      technologies: ["Figma", "Storybook", "React", "CSS-in-JS"],
      impact: "Reduced design-to-dev handoff time by 40% and improved design consistency to 95%.",
    },
    {
      id: "6",
      title: "Analytics Dashboard",
      category: "Data Visualization",
      description: "Advanced analytics platform showing fleet performance, trends, and predictive insights.",
      image: "/analytics-dashboard.jpg",
      details:
        "Created an intuitive analytics interface that transforms complex operational data into actionable insights through strategic visualization and interactive filtering.",
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
      impact: "Improved decision-making speed by 3x and identified cost-saving opportunities worth $5M annually.",
    },
  ]

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

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={(el) => {
            contentRefs.current[0] = el
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">My Portfolio</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Explore a selection of my recent work showcasing UI/UX design, product strategy, and innovative solutions
            that drive real business impact.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                contentRefs.current[index + 1] = el
              }}
              className="group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <Card className="overflow-hidden border-border/50 h-full hover:shadow-lg transition-shadow duration-300">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-orange-600/20">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <Badge variant="secondary" className="w-fit bg-orange-500/10 text-orange-600 border-orange-200">
                    {item.category}
                  </Badge>
                  <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <Card
              className="max-w-2xl max-h-[90vh] overflow-y-auto border-border/30 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="sticky top-4 right-4 z-10 p-2 hover:bg-secondary rounded-lg transition-colors ml-auto float-right"
              >
                ✕
              </button>

              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-orange-600/20">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div>
                  <Badge className="mb-3 bg-orange-500/10 text-orange-600 border-orange-200">
                    {selectedItem.category}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-2">{selectedItem.title}</h2>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Project Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedItem.details}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="font-semibold mb-2">Technologies & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="border-border/50">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <h3 className="font-semibold mb-2 text-primary">Impact & Results</h3>
                    <p className="text-sm text-muted-foreground">{selectedItem.impact}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
