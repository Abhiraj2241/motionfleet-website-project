import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Upload, Rocket, BarChart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: MapPin,
      title: "Choose Your Target",
      description: "Select your target cities, neighborhoods, and routes. Choose from our network of auto-rickshaws and e-rickshaws operating in high-traffic areas.",
      details: [
        "Browse available fleet by city and route",
        "View real-time vehicle availability",
        "Select specific demographics and areas",
        "Choose campaign duration and fleet size",
      ],
    },
    {
      number: "02",
      icon: Upload,
      title: "Upload Your Creative",
      description: "Share your brand creative or work with our design team to create eye-catching advertisements optimized for mobile visibility.",
      details: [
        "Upload existing designs or request custom design",
        "Get feedback on size, format, and visibility",
        "Approve final designs and materials",
        "Professional printing and installation arranged",
      ],
    },
    {
      number: "03",
      icon: Rocket,
      title: "Campaign Deployment",
      description: "Our team professionally installs your ads on selected vehicles. Your campaign goes live with full GPS tracking enabled from day one.",
      details: [
        "Quality installation by trained professionals",
        "Pre-deployment vehicle inspection",
        "Photo verification of all installations",
        "Campaign launch confirmation and tracking link",
      ],
    },
    {
      number: "04",
      icon: BarChart,
      title: "Track & Optimize",
      description: "Monitor your campaign performance in real-time through our analytics dashboard. Get detailed reports and insights to maximize ROI.",
      details: [
        "Live GPS tracking of all vehicles",
        "Daily impression and reach statistics",
        "Interactive heatmaps of coverage areas",
        "Weekly performance reports and optimization tips",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">How It Works</h1>
            <p className="text-xl text-muted-foreground">
              Launch your hyperlocal advertising campaign in 4 simple steps. From strategy to execution, we handle everything.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <step.icon className="text-primary" size={32} />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{step.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, dIndex) => (
                        <li key={dIndex} className="flex items-start">
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-background text-xs font-bold">✓</span>
                          </div>
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className="bg-card rounded-lg border border-border p-8 hover:border-primary/50 transition-all duration-300">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <step.icon className="text-primary/30" size={120} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Campaign Timeline</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From initial consultation to campaign launch in as little as 7 days
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1-2
                </div>
                <h3 className="font-bold mb-2">Days</h3>
                <p className="text-sm text-muted-foreground">Strategy & Planning</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2-3
                </div>
                <h3 className="font-bold mb-2">Days</h3>
                <p className="text-sm text-muted-foreground">Design & Approval</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2-3
                </div>
                <h3 className="font-bold mb-2">Days</h3>
                <p className="text-sm text-muted-foreground">Production & Prep</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-bold mb-2">Day</h3>
                <p className="text-sm text-muted-foreground">Installation & Launch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "What's the minimum campaign duration?",
                  a: "Our minimum campaign duration is one week, but we recommend at least one month for optimal brand visibility and measurable results.",
                },
                {
                  q: "How do you track impressions?",
                  a: "We use GPS tracking combined with route analysis and traffic data to calculate daily impressions based on vehicle location, speed, and time of day.",
                },
                {
                  q: "Can I choose specific routes or areas?",
                  a: "Yes! You can select specific neighborhoods, routes, or target areas. We'll recommend optimal vehicle assignments based on your requirements.",
                },
                {
                  q: "What if the ad gets damaged?",
                  a: "All campaigns include free maintenance and replacement for any damaged materials throughout the campaign duration.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Ready to Launch Your Campaign?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started today and see your brand move across the city
          </p>
          <Button size="lg" asChild className="gradient-primary font-bold text-lg">
            <Link to="/contact">Start Your Campaign</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
