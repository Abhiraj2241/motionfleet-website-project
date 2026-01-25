"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export default function JourneySection() {
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

  const timeline = [
    {
      year: "2018",
      title: "Design Journey Begins",
      description:
        "Started career as a junior UI designer, passionate about creating beautiful digital experiences and understanding user behavior.",
    },
    {
      year: "2019",
      title: "Senior Designer",
      description:
        "Promoted to lead design initiatives across multiple products, mentoring junior designers and establishing design systems.",
    },
    {
      year: "2020",
      title: "Product Design Lead",
      description:
        "Took ownership of complete product design lifecycle, from research through implementation, across enterprise clients.",
    },
    {
      year: "2021",
      title: "MotionFleet Founded",
      description:
        "Co-founded MotionFleet to revolutionize fleet management with intelligent design and cutting-edge technology.",
    },
    {
      year: "2022",
      title: "Series A Funding",
      description:
        "Successfully raised Series A funding, scaling the team and expanding platform capabilities across new markets.",
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description:
        "Received industry awards for innovation in design and entrepreneurship, expanding MotionFleet's global presence.",
    },
  ]

  return (
    <section id="journey" ref={sectionRef} className="py-20 px-6 bg-card/50 mx-6 md:mx-12 my-8 rounded-2xl glass-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={(el) => {
            contentRefs.current[0] = el
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">My Journey</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            From design enthusiast to founder and industry leader—here's how I've evolved and contributed to the world
            of technology and innovation.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 to-primary/5" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  contentRefs.current[index + 1] = el
                }}
              >
                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 items-start">
                  {/* Left Side (Even) / Right Side (Odd) */}
                  {index % 2 === 0 ? (
                    <>
                      {/* Content on left, dot on center, empty on right */}
                      <div className="text-right pr-8">
                        <Card className="p-6 border-border/50 text-left">
                          <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </Card>
                      </div>
                      <div className="flex justify-start">
                        <div className="w-4 h-4 rounded-full bg-primary absolute left-1/2 transform -translate-x-1/2 ring-4 ring-background" />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Empty on left, dot on center, content on right */}
                      <div className="flex justify-end">
                        <div className="w-4 h-4 rounded-full bg-primary absolute left-1/2 transform -translate-x-1/2 ring-4 ring-background" />
                      </div>
                      <div className="text-left pl-8">
                        <Card className="p-6 border-border/50">
                          <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </Card>
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                    {index < timeline.length - 1 && (
                      <div className="w-1 h-32 bg-gradient-to-b from-primary/20 to-primary/5" />
                    )}
                  </div>
                  <div className="pb-8">
                    <Card className="p-6 border-border/50">
                      <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
