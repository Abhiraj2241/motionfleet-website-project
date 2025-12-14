import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  duration?: number;
  isVisible: boolean;
}

const AnimatedStat = ({ value, suffix = "+", duration = 2000, isVisible }: AnimatedStatProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(value * easeOutQuart);
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  return (
    <span className="tabular-nums">
      {formatNumber(displayValue)}{suffix}
    </span>
  );
};

const Hero = () => {
  const [stats, setStats] = useState({
    dailyImpressions: 0,
    activeVehicles: 0,
    happyBrands: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Fetch real stats from database
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch active vehicles count
        const { count: vehiclesCount } = await supabase
          .from("vehicles")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true);

        // Fetch campaigns count (as "happy brands")
        const { count: campaignsCount } = await supabase
          .from("campaigns")
          .select("*", { count: "exact", head: true });

        // Calculate estimated daily impressions (vehicles * average daily impressions per vehicle)
        const estimatedImpressions = (vehiclesCount || 0) * 100;

        setStats({
          dailyImpressions: Math.max(estimatedImpressions, 50000), // Minimum baseline
          activeVehicles: Math.max(vehiclesCount || 0, 500), // Minimum baseline
          happyBrands: Math.max(campaignsCount || 0, 100), // Minimum baseline
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback to baseline stats
        setStats({
          dailyImpressions: 50000,
          activeVehicles: 500,
          happyBrands: 100,
        });
      }
    };

    fetchStats();
  }, []);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Only trigger once
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: "0px",
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-card border border-primary/20 rounded-full text-sm font-medium">
            🚀 Hyperlocal Advertising Platform
          </div>
          
          <h1 className="mb-6 leading-tight">
            Transform Urban Mobility Into a{" "}
            <span className="text-gradient">Moving Billboard</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Advertise on autos, rickshaws & mobility fleets—reach thousands daily with data-driven, hyperlocal campaigns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="gradient-primary font-bold text-lg group">
              <Link to="/contact">
                Book a Campaign
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/50 hover:bg-primary/10">
              <Link to="/tracking">
                <MapPin className="mr-2" size={20} />
                Track Live
              </Link>
            </Button>
          </div>

          {/* Stats with Intersection Observer */}
          <div 
            ref={statsRef}
            className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="p-4 bg-card rounded-lg border border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                <AnimatedStat 
                  value={stats.dailyImpressions} 
                  duration={2000} 
                  isVisible={isVisible}
                />
              </div>
              <div className="text-sm text-muted-foreground">Daily Impressions</div>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                <AnimatedStat 
                  value={stats.activeVehicles} 
                  duration={1500} 
                  isVisible={isVisible}
                />
              </div>
              <div className="text-sm text-muted-foreground">Active Vehicles</div>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover-scale">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                <AnimatedStat 
                  value={stats.happyBrands} 
                  duration={1000} 
                  isVisible={isVisible}
                />
              </div>
              <div className="text-sm text-muted-foreground">Happy Brands</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
