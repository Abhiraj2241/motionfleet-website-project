import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Eye, Target } from "lucide-react";

const Portfolio = () => {
  const caseStudies = [
    {
      brand: "Fresh Bites Cafe",
      category: "Food & Beverage",
      campaign: "Grand Opening Campaign",
      duration: "2 Months",
      results: {
        impressions: "2.5M+",
        reach: "150K+",
        footfall: "+300%",
        roi: "450%",
      },
      description: "Hyperlocal campaign targeting residential areas within 3km radius of new cafe locations. Used auto-rickshaws during peak commute hours.",
      highlights: [
        "Strategic route planning around residential complexes",
        "QR codes for exclusive opening week discounts",
        "Driver-influencer program with free sample distribution",
        "Real-time tracking of high-traffic zones",
      ],
    },
    {
      brand: "TechGear Electronics",
      category: "Consumer Electronics",
      campaign: "Festival Season Sale",
      duration: "1 Month",
      results: {
        impressions: "1.8M+",
        reach: "120K+",
        footfall: "+200%",
        roi: "380%",
      },
      description: "High-visibility campaign during festival season targeting shopping districts and commercial areas with eye-catching designs.",
      highlights: [
        "Premium auto-rickshaw placements in shopping zones",
        "Interactive QR campaigns with instant deals",
        "Peak hour optimization for maximum visibility",
        "Multi-city deployment across 3 major metros",
      ],
    },
    {
      brand: "FitLife Gym",
      category: "Health & Fitness",
      campaign: "New Year Membership Drive",
      duration: "6 Weeks",
      results: {
        impressions: "1.2M+",
        reach: "80K+",
        footfall: "+250%",
        roi: "420%",
      },
      description: "Targeted campaign in health-conscious neighborhoods promoting New Year membership offers with motivational messaging.",
      highlights: [
        "Morning rush hour focus for fitness-minded audience",
        "Geotargeted routes near residential areas",
        "Before/after transformation visuals",
        "Special member referral QR codes",
      ],
    },
  ];

  const metrics = [
    { icon: Eye, value: "50M+", label: "Total Impressions Delivered" },
    { icon: Users, value: "500K+", label: "People Reached" },
    { icon: TrendingUp, value: "250%", label: "Average ROI Increase" },
    { icon: Target, value: "100+", label: "Successful Campaigns" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">Success Stories</h1>
            <p className="text-xl text-muted-foreground">
              Real campaigns, real results. See how brands across industries have achieved remarkable success with MotionFleet.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Featured Case Studies</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              In-depth look at campaigns that drove exceptional results
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-background rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{study.brand}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">{study.category}</span>
                        <span>{study.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg mb-1">{study.campaign}</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{study.description}</p>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-card rounded-lg border border-border text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{study.results.impressions}</div>
                      <div className="text-xs text-muted-foreground">Impressions</div>
                    </div>
                    <div className="p-4 bg-card rounded-lg border border-border text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{study.results.reach}</div>
                      <div className="text-xs text-muted-foreground">Unique Reach</div>
                    </div>
                    <div className="p-4 bg-card rounded-lg border border-border text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{study.results.footfall}</div>
                      <div className="text-xs text-muted-foreground">Footfall Increase</div>
                    </div>
                    <div className="p-4 bg-card rounded-lg border border-border text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{study.results.roi}</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-bold mb-3">Campaign Highlights</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {study.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start">
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-background text-xs font-bold">✓</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Campaign Visuals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See the transformation from concept to execution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-card rounded-lg border border-border overflow-hidden hover-scale">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm text-muted-foreground">Campaign Visual {item}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold mb-1">Campaign Installation</h4>
                  <p className="text-sm text-muted-foreground">High-quality wrap on premium vehicles</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Ready to Create Your Success Story?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the brands achieving exceptional results with hyperlocal advertising
          </p>
          <Button size="lg" asChild className="gradient-primary font-bold text-lg">
            <Link to="/contact">Launch Your Campaign</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
