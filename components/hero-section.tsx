"use client"
import { useRef } from 'react';

export default function HeroSection() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  return (
    <section className="relative w-full flex items-center justify-center px-6 py-32 md:py-40">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto w-full text-center space-y-8 relative z-10">
        {/* Subtitle Badge */}
        <div className="inline-block">
          <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <p className="text-sm font-medium text-orange-500">Welcome to My Portfolio</p>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance text-foreground">
            Transforming Data into{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="pt-2">
          <p className="text-base md:text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
            Data Analyst & Analytics Professional specializing in uncovering patterns and driving data-driven decision-making for business growth.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button 
            className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Projects
            <span>→</span>
          </button>
          <button 
            className="px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all hover:scale-105 cursor-pointer"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Connect with Me
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-6">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-center justify-center mx-auto">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
