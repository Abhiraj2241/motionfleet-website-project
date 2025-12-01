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
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-4">Fleet Advertising Models</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect advertising format for your brand's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleetModels.map((model, index) => (
              <div
                key={index}
                className="p-6 bg-background rounded-lg border border-border hover:border-primary transition-all duration-300 hover-scale hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <model.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{model.title}</h3>
                <p className="text-muted-foreground mb-4">{model.description}</p>
                <p className="text-primary font-bold">{model.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Data-Driven Campaign Analytics</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Track your campaign performance in real-time with our advanced analytics dashboard. Monitor impressions, reach, engagement, and ROI.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-background text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Live GPS Tracking</strong>
                    <p className="text-muted-foreground">Monitor vehicle routes and coverage areas</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-background text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Impression Heatmaps</strong>
                    <p className="text-muted-foreground">Visualize high-traffic zones and peak times</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-background text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Campaign Reports</strong>
                    <p className="text-muted-foreground">Detailed weekly and monthly performance reports</p>
                  </div>
                </li>
              </ul>
              <Button asChild className="gradient-primary font-bold">
                <Link to="/book-campaign">
                  Request Demo
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
            <div className="bg-background rounded-lg border border-border p-8">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LayoutGrid className="text-primary mx-auto mb-4" size={48} />
                  <p className="text-muted-foreground">Analytics Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">What Our Partners Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by drivers and brands across the country
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover-scale hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-primary fill-primary" size={16} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="mb-6">Ready to Grow Your Brand?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of brands using MotionFleet to reach their audience where it matters most
          </p>
          <Button size="lg" asChild className="gradient-primary font-bold text-lg hover-scale">
            <Link to="/book-campaign">
              Start Your Campaign Today
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
