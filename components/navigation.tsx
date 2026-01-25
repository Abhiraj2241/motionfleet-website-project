"use client"

import { useEffect, useState } from "react"
import PillNav from "@/components/pill-nav"

interface NavigationProps {
  isDark: boolean
  setIsDark: (value: boolean) => void
}

export default function Navigation({ isDark, setIsDark }: NavigationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Journey", href: "#journey" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ]

  if (!mounted) return null

  return (
    <div className="relative">
      <PillNav
        logo="AS"
        logoAlt="Abhiraj Sharma"
        items={navItems}
        baseColor={isDark ? "#fff" : "#000"}
        pillColor={isDark ? "#060010" : "#f5f5f5"}
        pillTextColor={isDark ? "#fff" : "#000"}
        hoveredPillTextColor={isDark ? "#060010" : "#fff"}
        className={isDark ? "dark-pill-nav" : "light-pill-nav"}
      />
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle theme"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform z-50"
        style={{ fontSize: "20px" }}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </div>
  )
}
