import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";

const Hero = () => {
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
              <a href="#" download>
                <Download className="mr-2" size={20} />
                Download Media Kit
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Daily Impressions</div>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Active Vehicles</div>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">100+</div>
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
