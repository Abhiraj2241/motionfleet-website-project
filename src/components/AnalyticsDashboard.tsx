import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Eye, MapPin } from "lucide-react";
import GradientText from "./GradientText";

export default function AnalyticsDashboard() {
  const metrics = [
    { icon: Eye, label: "Impressions", value: "0", change: "+0%" },
    { icon: MapPin, label: "Coverage Area", value: "0 km²", change: "+0%" },
    { icon: TrendingUp, label: "Engagement", value: "0%", change: "+0%" },
    { icon: BarChart3, label: "Active Campaigns", value: "0", change: "+0%" },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <GradientText className="text-4xl md:text-5xl mb-4">
            Real-Time Analytics Dashboard
          </GradientText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your campaign performance with live data and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="p-6 hover-scale transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="w-8 h-8 text-primary" />
                <span className="text-sm text-green-500 font-medium">
                  {metric.change}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </Card>
          ))}
        </div>

        <Card className="p-8 animate-fade-in">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Campaign Performance</h3>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Chart will appear here once you upload campaign data
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Top Performing Routes</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                    >
                      <span className="text-sm">Route #{i}</span>
                      <span className="text-sm font-medium">0 impressions</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
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
