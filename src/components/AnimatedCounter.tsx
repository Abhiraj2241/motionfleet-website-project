import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export default function AnimatedCounter({ 
  value, 
  duration = 500, 
  className,
  suffix = ""
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current !== value) {
      setIsAnimating(true);
      
      const startValue = previousValue.current;
      const endValue = value;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentValue = Math.round(
          startValue + (endValue - startValue) * easeOutQuart
        );
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
          previousValue.current = endValue;
          setTimeout(() => setIsAnimating(false), 300);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [value, duration]);

  return (
    <span 
      className={cn(
        "transition-all duration-300",
        isAnimating && "text-primary scale-110",
        className
      )}
    >
      {displayValue}{suffix}
      {isAnimating && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
      )}
    </span>
  );
}
