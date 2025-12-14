import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Radio, QrCode, Users, BarChart3, Megaphone } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: MapPin,
      title: "Hyperlocal Mobile Advertising",
      description: "Strategic placement of your brand on carefully selected routes targeting specific neighborhoods, markets, and demographics.",
      features: [
        "Route optimization based on your target audience",
        "Multi-city campaign management",
        "Flexible duration options (weekly, monthly, quarterly)",
        "GPS-verified coverage reports",
      ],
    },
    {
      icon: Radio,
      title: "Fleet Branding",
      description: "Complete vehicle branding solutions with professional design and installation services for maximum visual impact.",
      features: [
        "Custom design and creative services",
        "High-quality weather-resistant materials",
        "Professional installation by trained teams",
        "Regular maintenance and quality checks",
      ],
    },
    {
      icon: QrCode,
      title: "Digital QR-Based Campaigns",
      description: "Interactive campaigns with QR codes that drive traffic to your website, app, or promotional offers.",
      features: [
        "Custom QR code generation and design",
        "Landing page creation and hosting",
        "Scan analytics and user behavior tracking",
        "Integration with your CRM/marketing tools",
      ],
    },
    {
      icon: Users,
      title: "Influencer Auto Network",
      description: "Partner with our network of driver-influencers who actively promote your brand through word-of-mouth marketing.",
      features: [
        "Trained brand ambassadors on wheels",
        "Sample distribution programs",
        "Customer feedback collection",
        "Direct engagement with local communities",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive campaign analytics with real-time tracking, insights, and detailed performance reports.",
      features: [
        "Live GPS tracking dashboard",
        "Daily/weekly/monthly reports",
        "Impression heatmaps and route analysis",
        "ROI calculation and optimization suggestions",
      ],
    },
    {
      icon: Megaphone,
      title: "Campaign Management",
      description: "End-to-end campaign planning, execution, and optimization by our experienced marketing team.",
      features: [
        "Strategic planning and consultation",
        "Creative development support",
        "Multi-channel campaign coordination",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6">Our Services</h1>
            <p className="text-base md:text-xl text-muted-foreground px-4">
              Comprehensive advertising solutions designed to maximize your brand's reach and impact in urban markets
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-5 md:p-8 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 md:space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full flex items-center justify-center mr-2 md:mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-background text-xs font-bold">✓</span>
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-12 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Our Service Delivery Process</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Simple, transparent, and efficient campaign execution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 md:space-y-8">
              {[
                {
                  step: "01",
                  title: "Consultation & Strategy",
                  description: "We understand your goals, target audience, and budget to create a customized advertising strategy.",
                },
                {
                  step: "02",
                  title: "Creative Development",
                  description: "Our design team creates compelling visuals that capture attention and communicate your message effectively.",
                },
                {
                  step: "03",
                  title: "Campaign Launch",
                  description: "Professional installation and deployment across selected vehicles with quality assurance checks.",
                },
                {
                  step: "04",
                  title: "Monitoring & Optimization",
                  description: "Real-time tracking and regular optimization to ensure maximum campaign performance and ROI.",
                },
                {
                  step: "05",
                  title: "Reporting & Analysis",
                  description: "Detailed performance reports with insights and recommendations for future campaigns.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 md:gap-6">
                  <div className="text-3xl md:text-5xl font-bold text-primary/20">{item.step}</div>
                  <div className="flex-1 pt-1 md:pt-2">
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center p-6 md:p-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to Transform Your Brand Visibility?</h2>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
              Let's discuss how our services can help you reach your marketing goals
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" asChild className="gradient-primary font-bold w-full sm:w-auto">
                <Link to="/contact">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
