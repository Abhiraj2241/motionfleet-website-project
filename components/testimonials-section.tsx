"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  content: string
  rating: number
  image: string
  initials: string
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "VP of Product",
      company: "TechCorp",
      content:
        "Abhiraj's design expertise transformed our entire fleet operations platform. His keen eye for user experience and attention to detail resulted in a 60% reduction in support tickets.",
      rating: 5,
      image: "/placeholder.svg?key=avatar1",
      initials: "SC",
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      title: "CEO",
      company: "LogisticsPro",
      content:
        "Working with Abhiraj as our founding designer was instrumental to MotionFleet's success. His ability to balance aesthetics with functionality is exceptional.",
      rating: 5,
      image: "/placeholder.svg?key=avatar2",
      initials: "MR",
    },
    {
      id: "3",
      name: "Emma Watson",
      title: "Head of UX Research",
      company: "InnovateTech",
      content:
        "Abhiraj brought a refreshing perspective to our design challenges. His user-centric approach and willingness to iterate based on feedback made a real difference.",
      rating: 5,
      image: "/placeholder.svg?key=avatar3",
      initials: "EW",
    },
    {
      id: "4",
      name: "David Kim",
      title: "Product Manager",
      company: "FleetWorks",
      content:
        "The design system Abhiraj created for us has been a game-changer. It streamlined our development process and ensured consistency across all our products.",
      rating: 5,
      image: "/placeholder.svg?key=avatar4",
      initials: "DK",
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

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 px-6 bg-card/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={(el) => {
            contentRefs.current[0] = el
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What People Say</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Testimonials from colleagues, clients, and collaborators who've experienced the impact of thoughtful design
            and strategic leadership.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={(el) => {
            contentRefs.current[1] = el
          }}
          className="group"
        >
          <Card className="p-8 md:p-12 border-border/50 relative min-h-96 flex flex-col justify-between">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <span key={i} className="w-5 h-5 text-primary">
                  ★
                </span>
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="mb-8 flex-grow">
              <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                "{currentTestimonial.content}"
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={currentTestimonial.image || "/placeholder.svg"} alt={currentTestimonial.name} />
                <AvatarFallback className="bg-primary/10 text-primary">{currentTestimonial.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-semibold">{currentTestimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currentTestimonial.title} at {currentTestimonial.company}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 mt-8 pt-8 border-t border-border/30">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                className="h-10 w-10 bg-transparent"
              >
                ←
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                aria-label="Next testimonial"
                className="h-10 w-10 bg-transparent"
              >
                →
              </Button>
              <div className="flex-grow flex items-center justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsAutoPlay(false)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-primary w-8" : "bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Autoplay Indicator */}
            <div className="absolute top-4 right-4 text-xs text-muted-foreground">
              {currentIndex + 1} / {testimonials.length}
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div
          ref={(el) => {
            contentRefs.current[2] = el
          }}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <p className="text-3xl font-bold text-primary mb-2">500+</p>
            <p className="text-muted-foreground">Design Projects Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-2">50+</p>
            <p className="text-muted-foreground">Satisfied Clients & Partners</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-2">4.9★</p>
            <p className="text-muted-foreground">Average Client Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
