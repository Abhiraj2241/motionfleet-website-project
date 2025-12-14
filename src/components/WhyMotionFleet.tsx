import { Target, TrendingDown, MapPin, BarChart3 } from "lucide-react";

const WhyMotionFleet = () => {
  const features = [
    {
      icon: Target,
      title: "High Reach",
      description: "Reach thousands of potential customers daily across urban routes",
    },
    {
      icon: TrendingDown,
      title: "Low Cost",
      description: "Cost-effective advertising compared to traditional billboard campaigns",
    },
    {
      icon: MapPin,
      title: "Hyperlocal Targeting",
      description: "Target specific neighborhoods, routes, and demographics precisely",
    },
    {
      icon: BarChart3,
      title: "Real-Time Tracking",
      description: "Live analytics dashboard with impressions, reach, and engagement metrics",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Why Choose MotionFleet?</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            The smartest way to advertise in urban markets with measurable results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 md:p-6 bg-background rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover-scale group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMotionFleet;
