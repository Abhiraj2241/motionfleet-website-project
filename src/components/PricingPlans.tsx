import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingPlans = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹5,999",
      period: "/month",
      description: "Perfect for small businesses testing hyperlocal advertising",
      features: [
        "5 Active Vehicles",
        "Back Panel Ads",
        "Basic Analytics Dashboard",
        "City-wide Coverage",
        "Email Support",
      ],
      highlighted: false,
    },
    {
      name: "Growth",
      price: "₹14,999",
      period: "/month",
      description: "Ideal for growing brands seeking wider reach",
      features: [
        "15 Active Vehicles",
        "Back & Side Panel Ads",
        "Advanced Analytics & Heatmaps",
        "Multi-City Coverage",
        "GPS Route Tracking",
        "Priority Email & Chat Support",
        "Monthly Performance Reports",
      ],
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large brands needing maximum visibility and reach",
      features: [
        "50+ Active Vehicles",
        "Full Vehicle Wraps Available",
        "Real-time Analytics & API Access",
        "National Coverage",
        "Dedicated Account Manager",
        "Custom Route Planning",
        "24/7 Premium Support",
        "Quarterly Strategy Reviews",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Choose Your Perfect Plan</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Flexible pricing options designed to grow with your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-300 hover-scale ${
                plan.highlighted
                  ? "border-primary bg-card shadow-lg shadow-primary/20"
                  : "border-border bg-card/50 hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.badge && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-background px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-3xl md:text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-2 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 md:mr-3 mt-0.5 flex-shrink-0">
                      <Check className="text-primary" size={12} />
                    </div>
                    <span className="text-sm md:text-base text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full ${
                  plan.highlighted ? "gradient-primary font-bold" : ""
                }`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                <Link to="/contact">
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-muted-foreground px-4">
            All plans include a 14-day trial period. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;