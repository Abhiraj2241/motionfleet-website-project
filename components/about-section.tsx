"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export default function AboutSection() {
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
              }, index * 150)
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

  const skills = [
    {
      symbol: "💻",
      title: "Full-Stack Design",
      description: "From concept to implementation, crafting complete design systems and digital experiences.",
    },
    {
      symbol: "⚡",
      title: "Innovation-Driven",
      description: "Pushing boundaries with cutting-edge UI/UX solutions that solve real-world problems.",
    },
    {
      symbol: "🏆",
      title: "Award-Winning",
      description: "Recognized for excellence in design and entrepreneurship in the mobility industry.",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 bg-card/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={(el) => {
            contentRefs.current[0] = el
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            I'm a product-focused designer and founder dedicated to creating seamless, intuitive experiences that
            transform how people interact with technology. With a deep background in UI/UX design and entrepreneurship,
            I blend creativity with strategic thinking.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => {
                contentRefs.current[index + 1] = el
              }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 border-border/50">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{skill.symbol}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bio Section */}
        <div
          ref={(el) => {
            contentRefs.current[4] = el
          }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image Placeholder */}
          <div className="relative h-80 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center border border-border/30">
            <img
              src="/abhiraj-portrait.webp"
              alt="Professional portrait of Abhiraj Sharma"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bio Text */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                Starting my career in UI/UX design, I quickly realized that great design is more than aesthetics—it's
                about solving problems and creating meaningful connections between users and technology.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Founding MotionFleet</h3>
              <p className="text-muted-foreground leading-relaxed">
                This philosophy led me to co-found MotionFleet, where we're revolutionizing mobility solutions. By
                combining innovative design with intelligent technology, we're making fleet management smarter, faster,
                and more intuitive.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What Drives Me</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm passionate about the intersection of design and technology, where user needs meet business goals.
                Every project is an opportunity to create something exceptional that makes a real impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
