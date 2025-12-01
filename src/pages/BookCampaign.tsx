import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  MapPin, 
  Calendar as CalendarIcon,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Car
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import GradientText from "@/components/GradientText";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BookCampaign = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    campaignName: "",
    businessName: "",
    targetArea: "",
    budget: "",
    vehicleType: "",
    description: "",
  });

  const stats = [
    {
      icon: Users,
      label: "Active Drivers",
      value: "2,500+",
      change: "+12%",
      color: "text-primary",
    },
    {
      icon: MapPin,
      label: "Coverage Areas",
      value: "50+",
      change: "+8%",
      color: "text-chart-2",
    },
    {
      icon: TrendingUp,
      label: "Avg. Impressions",
      value: "150K/day",
      change: "+25%",
      color: "text-chart-3",
    },
    {
      icon: Target,
      label: "Success Rate",
      value: "94%",
      change: "+3%",
      color: "text-chart-1",
    },
  ];

  const steps = [
    { number: 1, title: "Campaign Details", icon: Rocket },
    { number: 2, title: "Target & Budget", icon: Target },
    { number: 3, title: "Schedule & Launch", icon: Calendar },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      toast({
        title: "Missing dates",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("campaigns").insert({
        campaign_name: formData.campaignName,
        business_name: formData.businessName,
        target_area: formData.targetArea,
        budget: parseFloat(formData.budget) || null,
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Campaign Created! 🎉",
        description: "Your campaign has been successfully submitted for review.",
      });

      setTimeout(() => {
        navigate("/tracking");
      }, 2000);
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 animate-scale-in" variant="outline">
              <Sparkles className="w-3 h-3 mr-2" />
              AI-Powered Campaign Optimization
            </Badge>
            <h1 className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Launch Your{" "}
              <GradientText
                colors={["#FCD400", "#FFE55C", "#FCD400", "#FFE55C", "#FCD400"]}
                animationSpeed={6}
              >
                Fleet Campaign
              </GradientText>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Reach thousands of potential customers with mobile advertising across high-traffic zones
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover-scale hover:shadow-lg hover:shadow-primary/10 animate-fade-in cursor-pointer group"
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors", stat.color)}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-secondary/10">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Creation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 border-2",
                          currentStep >= step.number
                            ? "bg-primary text-primary-foreground border-primary scale-110 shadow-lg shadow-primary/30"
                            : "bg-muted text-muted-foreground border-border"
                        )}
                      >
                        {currentStep > step.number ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="ml-3 hidden md:block">
                        <div className={cn("text-sm font-semibold", currentStep >= step.number ? "text-foreground" : "text-muted-foreground")}>
                          Step {step.number}
                        </div>
                        <div className={cn("text-xs", currentStep >= step.number ? "text-foreground/70" : "text-muted-foreground")}>
                          {step.title}
                        </div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-4 bg-border relative overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                          style={{ width: currentStep > step.number ? "100%" : "0%" }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Form Card */}
            <Card className="border-2 border-border/50 shadow-xl backdrop-blur-sm bg-card/95 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <CardHeader className="space-y-1 pb-8">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary animate-pulse" />
                  {currentStep === 1 && "Campaign Information"}
                  {currentStep === 2 && "Target Audience & Budget"}
                  {currentStep === 3 && "Schedule Your Campaign"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Tell us about your campaign and what you want to promote"}
                  {currentStep === 2 && "Define your target market and set your investment"}
                  {currentStep === 3 && "Choose when to launch your mobile advertising campaign"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 1: Campaign Details */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="campaignName" className="flex items-center gap-2">
                          <Rocket className="w-4 h-4 text-primary" />
                          Campaign Name *
                        </Label>
                        <Input
                          id="campaignName"
                          placeholder="Summer Sale 2024"
                          value={formData.campaignName}
                          onChange={(e) => handleInputChange("campaignName", e.target.value)}
                          className="transition-all duration-200 focus:scale-[1.02]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessName" className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          Business Name *
                        </Label>
                        <Input
                          id="businessName"
                          placeholder="Your Business"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          className="transition-all duration-200 focus:scale-[1.02]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Campaign Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your campaign goals, target audience, and key messaging..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="min-h-32 transition-all duration-200 focus:scale-[1.01]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Target & Budget */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="targetArea" className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          Target Area *
                        </Label>
                        <Input
                          id="targetArea"
                          placeholder="City/Region/Neighborhood"
                          value={formData.targetArea}
                          onChange={(e) => handleInputChange("targetArea", e.target.value)}
                          className="transition-all duration-200 focus:scale-[1.02]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehicleType" className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-primary" />
                          Vehicle Type *
                        </Label>
                        <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
                          <SelectTrigger className="transition-all duration-200 focus:scale-[1.02]">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto Rickshaw</SelectItem>
                            <SelectItem value="e-rickshaw">E-Rickshaw</SelectItem>
                            <SelectItem value="taxi">Taxi</SelectItem>
                            <SelectItem value="bus">Bus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget" className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Monthly Budget (₹)
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="50000"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 Recommended: ₹30,000 - ₹100,000 per month for optimal reach
                      </p>
                    </div>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="font-semibold text-foreground mb-1">Estimated Campaign Reach</p>
                            <p className="text-muted-foreground">
                              Based on your budget, you can expect approximately{" "}
                              <span className="font-bold text-primary">
                                {formData.budget ? (parseInt(formData.budget) * 3).toLocaleString() : "—"}
                              </span>{" "}
                              impressions per month across your target area.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          Start Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal transition-all duration-200 hover:scale-[1.02]",
                                !startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          End Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal transition-all duration-200 hover:scale-[1.02]",
                                !endDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">Ready to Launch!</p>
                              <p className="text-sm text-muted-foreground">Review your campaign details before submission</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Campaign Duration</p>
                              <p className="font-semibold">
                                {startDate && endDate
                                  ? `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days`
                                  : "Not set"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Total Investment</p>
                              <p className="font-semibold text-primary">
                                {formData.budget ? `₹${parseInt(formData.budget).toLocaleString()}` : "Not set"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1 || isSubmitting}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    Back
                  </Button>

                  {currentStep < 3 ? (
                    <Button onClick={handleNext} className="gradient-primary font-bold transition-all duration-200 hover:scale-105 group">
                      Next Step
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="gradient-primary font-bold transition-all duration-200 hover:scale-105 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                          Launching...
                        </>
                      ) : (
                        <>
                          Launch Campaign
                          <Rocket className="ml-2 w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookCampaign;
