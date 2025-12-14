import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, Eye, MapPin, ArrowRight } from "lucide-react";
import GradientText from "./GradientText";

export default function AnalyticsDashboard() {
  const metrics = [
    { icon: Eye, label: "Impressions", value: "0", change: "+0%" },
    { icon: MapPin, label: "Coverage Area", value: "0 km²", change: "+0%" },
    { icon: TrendingUp, label: "Engagement", value: "0%", change: "+0%" },
    { icon: BarChart3, label: "Active Campaigns", value: "0", change: "+0%" },
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <GradientText className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Real-Time Analytics Dashboard
          </GradientText>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-6 px-4">
            Track your campaign performance with live data and insights
          </p>
          <Button asChild className="gradient-primary font-bold w-full sm:w-auto">
            <Link to="/tracking">
              View Live Tracking
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 animate-fade-in">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="p-4 md:p-6 hover-scale transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <metric.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                <span className="text-xs md:text-sm text-green-500 font-medium">
                  {metric.change}
                </span>
              </div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{metric.label}</div>
            </Card>
          ))}
        </div>

        <Card className="p-4 md:p-8 animate-fade-in">
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Campaign Performance</h3>
              <div className="h-48 md:h-64 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                <div className="text-center px-4">
                  <BarChart3 className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-muted-foreground" />
                  <p className="text-sm md:text-base text-muted-foreground">
                    Chart will appear here once you upload campaign data
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3">Top Performing Routes</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 md:p-3 bg-muted/20 rounded-lg"
                    >
                      <span className="text-xs md:text-sm">Route #{i}</span>
                      <span className="text-xs md:text-sm font-medium">0 impressions</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm md:text-base mb-2 md:mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-muted/20 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        No activity yet
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
