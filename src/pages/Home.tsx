import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WhyMotionFleet from "@/components/WhyMotionFleet";
import PricingPlans from "@/components/PricingPlans";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Truck, LayoutGrid, Smartphone, Star, ArrowRight } from "lucide-react";

const Home = () => {
  const fleetModels = [
    {
      icon: Car,
      title: "Auto-Rickshaw Ads",
      description: "Premium placement on auto-rickshaws in high-traffic areas",
      price: "Starting ₹5,000/month",
    },
    {
      icon: Truck,
      title: "E-Rickshaw Ads",
      description: "Eco-friendly advertising on electric rickshaws",
      price: "Starting ₹4,000/month",
    },
    {
      icon: LayoutGrid,
      title: "Back & Side Panels",
      description: "High-visibility rear and side panel placements",
      price: "Starting ₹3,500/month",
    },
    {
      icon: Smartphone,
      title: "In-Rickshaw Placements",
      description: "Interior ads for captive audience engagement",
      price: "Starting ₹2,500/month",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Auto Driver Partner",
      content: "MotionFleet helps me earn extra income while I drive. The setup was simple and payments are always on time.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Marketing Manager, Local Café Chain",
      content: "We saw a 300% increase in foot traffic after our MotionFleet campaign. The analytics were impressive!",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "E-Rickshaw Owner",
      content: "Great platform for drivers like me. The team is supportive and the extra earnings really help.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyMotionFleet />
      <PricingPlans />
      <AnalyticsDashboard />

      {/* Fleet Models Section */}
      <section className="py-12 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 animate-fade-in">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Fleet Advertising Models</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Choose the perfect advertising format for your brand's needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {fleetModels.map((model, index) => (
              <div
                key={index}
                className="p-4 md:p-6 bg-background rounded-lg border border-border hover:border-primary transition-all duration-300 hover-scale hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                  <model.icon className="text-primary" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{model.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">{model.description}</p>
                <p className="text-primary font-bold text-sm md:text-base">{model.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Data-Driven Campaign Analytics</h2>
              <p className="text-base md:text-xl text-muted-foreground mb-4 md:mb-6">
                Track your campaign performance in real-time with our advanced analytics dashboard. Monitor impressions, reach, engagement, and ROI.
              </p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center mr-2 md:mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-background text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground text-sm md:text-base">Live GPS Tracking</strong>
                    <p className="text-sm text-muted-foreground">Monitor vehicle routes and coverage areas</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center mr-2 md:mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-background text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground text-sm md:text-base">Impression Heatmaps</strong>
                    <p className="text-sm text-muted-foreground">Visualize high-traffic zones and peak times</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center mr-2 md:mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-background text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground text-sm md:text-base">Campaign Reports</strong>
                    <p className="text-sm text-muted-foreground">Detailed weekly and monthly performance reports</p>
                  </div>
                </li>
              </ul>
              <Button asChild className="gradient-primary font-bold w-full sm:w-auto">
                <Link to="/book-campaign">
                  Request Demo
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 bg-background rounded-lg border border-border p-4 md:p-8">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LayoutGrid className="text-primary mx-auto mb-3 md:mb-4" size={36} />
                  <p className="text-sm md:text-base text-muted-foreground">Analytics Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">What Our Partners Say</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Trusted by drivers and brands across the country
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-4 md:p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover-scale hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-primary fill-primary" size={14} />
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-sm md:text-base">{testimonial.name}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to Grow Your Brand?</h2>
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Join hundreds of brands using MotionFleet to reach their audience where it matters most
          </p>
          <Button size="lg" asChild className="gradient-primary font-bold text-base md:text-lg hover-scale w-full sm:w-auto">
            <Link to="/book-campaign">
              Start Your Campaign Today
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
