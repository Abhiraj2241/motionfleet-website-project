import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Clock, Shield, Headphones, Car, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Drivers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licensePhoto, setLicensePhoto] = useState<File | null>(null);
  const [registrationPhoto, setRegistrationPhoto] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleYear: "",
    licenseNumber: "",
    message: "",
  });

  const benefits = [
    {
      icon: DollarSign,
      title: "Extra Income",
      description: "Earn ₹3,000 - ₹8,000 per month just by driving your regular routes",
    },
    {
      icon: Clock,
      title: "Flexible Commitment",
      description: "No change to your schedule or routes. Drive as you normally would",
    },
    {
      icon: Shield,
      title: "Free Installation",
      description: "Professional installation and removal at no cost to you",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "24/7 support team ready to help with any questions or concerns",
    },
    {
      icon: Car,
      title: "No Vehicle Damage",
      description: "Premium materials that protect your vehicle's original paint",
    },
    {
      icon: TrendingUp,
      title: "Regular Payments",
      description: "On-time monthly payments directly to your bank account",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let licensePhotoUrl = null;
      let registrationPhotoUrl = null;

      // Upload license photo if provided
      if (licensePhoto) {
        const fileExt = licensePhoto.name.split('.').pop();
        const fileName = `${Date.now()}_license.${fileExt}`;
        const { data: licenseData, error: licenseError } = await supabase.storage
          .from('driver-documents')
          .upload(fileName, licensePhoto);

        if (licenseError) throw licenseError;
        licensePhotoUrl = licenseData.path;
      }

      // Upload registration photo if provided
      if (registrationPhoto) {
        const fileExt = registrationPhoto.name.split('.').pop();
        const fileName = `${Date.now()}_registration.${fileExt}`;
        const { data: regData, error: regError } = await supabase.storage
          .from('driver-documents')
          .upload(fileName, registrationPhoto);

        if (regError) throw regError;
        registrationPhotoUrl = regData.path;
      }

      const { error } = await supabase
        .from('driver_applications')
        .insert([
          {
            name: formData.name,
            email: formData.email || null,
            phone: formData.phone,
            city: formData.city,
            vehicle_type: formData.vehicleType,
            vehicle_model: formData.vehicleModel || null,
            vehicle_year: formData.vehicleYear || null,
            license_number: formData.licenseNumber || null,
            additional_info: formData.message || null,
            license_photo_url: licensePhotoUrl,
            registration_photo_url: registrationPhotoUrl,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Application Received!",
        description: "Thank you for your interest. Our team will contact you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        vehicleType: "",
        vehicleModel: "",
        vehicleYear: "",
        licenseNumber: "",
        message: "",
      });
      setLicensePhoto(null);
      setRegistrationPhoto(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">Drive & Earn with MotionFleet</h1>
            <p className="text-xl text-muted-foreground">
              Turn your auto or rickshaw into a moving billboard and earn extra income without changing your routine
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Join MotionFleet?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Partnership benefits designed with drivers in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover-scale"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works for Drivers */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Simple 4-Step Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From signup to earning in less than a week
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Fill out the simple application form with your details and vehicle information
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Verification</h3>
              <p className="text-muted-foreground">
                Our team verifies your documents and vehicle condition (takes 1-2 days)
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">Installation</h3>
              <p className="text-muted-foreground">
                Professional installation of ads at your convenience (30-45 minutes)
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-4">04</div>
              <h3 className="text-xl font-bold mb-2">Start Earning</h3>
              <p className="text-muted-foreground">
                Drive normally and receive monthly payments directly to your account
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Basic Requirements</h2>
            <div className="space-y-4">
              {[
                "Valid driving license and vehicle registration",
                "Auto-rickshaw or E-rickshaw in good condition",
                "Active in Mumbai, Delhi, Bangalore, or Pune (expanding to more cities)",
                "Willing to maintain ad quality and report any damage",
                "Drive at least 6 hours daily on regular routes",
              ].map((requirement, index) => (
                <div key={index} className="flex items-start p-4 bg-card rounded-lg border border-border">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-background text-xs font-bold">✓</span>
                  </div>
                  <span className="text-muted-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Join Our Fleet Today</h2>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and our team will contact you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-background rounded-lg border border-border">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  placeholder="Mumbai, Delhi, Bangalore, etc."
                />
              </div>

              <div>
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Input
                  id="vehicleType"
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  required
                  placeholder="Auto-rickshaw / E-rickshaw"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehicleModel">Vehicle Model</Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    placeholder="e.g., Bajaj RE"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleYear">Vehicle Year</Label>
                  <Input
                    id="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                    placeholder="e.g., 2020"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="licenseNumber">Driving License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder="Enter your license number"
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your daily routes, operating hours, etc."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="licensePhoto">Driver's License Photo</Label>
                <Input
                  id="licensePhoto"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setLicensePhoto(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">Upload a clear photo of your driver's license (max 5MB)</p>
              </div>

              <div>
                <Label htmlFor="registrationPhoto">Vehicle Registration Photo</Label>
                <Input
                  id="registrationPhoto"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setRegistrationPhoto(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">Upload a clear photo of your vehicle registration (max 5MB)</p>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary font-bold text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By submitting, you agree to our terms and conditions. We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What Our Driver Partners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Ramesh Yadav",
                location: "Mumbai",
                quote: "Extra ₹6,000 every month without any extra work. Best decision I made this year!",
              },
              {
                name: "Suresh Kumar",
                location: "Delhi",
                quote: "The team is very professional. Installation was quick and payments are always on time.",
              },
              {
                name: "Prakash Singh",
                location: "Bangalore",
                quote: "I was worried about my vehicle's paint, but they use quality materials. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Drivers;
