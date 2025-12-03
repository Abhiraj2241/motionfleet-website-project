import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Globe, 
  Zap, 
  Headphones,
  Building2,
  Navigation,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      details: "motionfleet7@gmail.com",
      action: "mailto:motionfleet7@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 98765 43210",
      action: "tel:+919876543210",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "Quick Response",
      action: "https://wa.me/919876543210?text=Hi%20MotionFleet%2C%20I'm%20interested%20in%20your%20advertising%20services",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Agra, India",
      action: "https://www.google.com/maps/search/?api=1&query=Agra+India",
    },
  ];

  const quickInfo = [
    {
      icon: Clock,
      title: "Operating Hours",
      details: ["Monday - Saturday: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Globe,
      title: "Service Areas",
      details: ["Headquartered in Agra, India", "Expanding to more cities soon!"],
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500",
    },
    {
      icon: Zap,
      title: "Response Time",
      details: ["Within 24 hours on business days", "Priority support for active campaigns"],
      color: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-500",
    },
    {
      icon: Headphones,
      title: "Emergency Support",
      details: ["24/7 support line available", "+91 98765 43210"],
      color: "from-red-500/20 to-pink-500/20",
      iconColor: "text-red-500",
    },
  ];

  const faqs = [
    {
      q: "What's the minimum campaign budget?",
      a: "Our campaigns start from ₹25,000 per month, which includes 5 vehicles with professional installation and real-time tracking.",
    },
    {
      q: "How quickly can you launch a campaign?",
      a: "From initial consultation to campaign launch typically takes 7-10 days, depending on design approval and material preparation.",
    },
    {
      q: "Do you provide design services?",
      a: "Yes! Our in-house design team can create eye-catching ads optimized for mobile visibility, or you can provide your own designs.",
    },
    {
      q: "Can I track my campaign in real-time?",
      a: "Absolutely! All clients get access to our analytics dashboard with live GPS tracking, impressions data, and route heatmaps.",
    },
    {
      q: "What if I want to change my ad during the campaign?",
      a: "You can update your creative mid-campaign with a small additional fee for reprinting and reinstallation.",
    },
    {
      q: "What types of vehicles do you use?",
      a: "We work with auto-rickshaws, taxis, delivery bikes, and buses to ensure maximum coverage across different areas and demographics.",
    },
  ];

  const locations = [
    {
      city: "Agra",
      address: "Main Office, Sanjay Place",
      type: "Headquarters",
      isMain: true,
    },
    {
      city: "Delhi NCR",
      address: "Coming Soon",
      type: "Regional Office",
      isMain: false,
    },
    {
      city: "Jaipur",
      address: "Coming Soon",
      type: "Regional Office",
      isMain: false,
    },
    {
      city: "Lucknow",
      address: "Coming Soon",
      type: "Regional Office",
      isMain: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background via-primary/5 to-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              We'd Love to Hear From You
            </span>
            <h1 className="mb-6 text-4xl md:text-5xl font-bold">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Ready to launch your advertising campaign? Have questions? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <method.icon className="text-primary" size={26} />
                </div>
                <h3 className="font-bold mb-2 text-lg">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.details}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                <h2 className="text-3xl font-bold">Send Us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5 bg-card p-8 rounded-2xl border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+91 98765 43210"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company / Brand Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your company name"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Tell us about your advertising needs..."
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full gradient-primary font-bold text-lg py-6 rounded-xl hover:scale-[1.02] transition-transform">
                  Send Message
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </form>
            </div>

            {/* Quick Information Section */}
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Zap className="text-primary" size={20} />
                </div>
                <h2 className="text-3xl font-bold">Quick Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`group p-6 rounded-2xl border border-border bg-gradient-to-br ${info.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={info.iconColor} size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-card/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Got Questions?
              </span>
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Find answers to common questions about our services</p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-2xl border border-border px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-base hover:no-underline hover:text-primary py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Our Locations Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Find Us
            </span>
            <h2 className="text-4xl font-bold mb-4">Our Locations</h2>
            <p className="text-muted-foreground">Visit our offices or explore our expanding network</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-card to-muted rounded-2xl aspect-video lg:aspect-auto lg:min-h-[400px] flex items-center justify-center border border-border relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <MapPin className="text-primary" size={40} />
                </div>
                <p className="font-semibold text-lg mb-2">Service Coverage Map</p>
                <p className="text-sm text-muted-foreground">Headquartered in Agra, India</p>
                <Button variant="outline" className="mt-4 rounded-xl">
                  <Navigation size={16} className="mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Location Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    location.isMain 
                      ? "bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 hover:shadow-xl hover:shadow-primary/10" 
                      : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    location.isMain ? "bg-primary/20" : "bg-primary/10"
                  }`}>
                    <Building2 className={location.isMain ? "text-primary" : "text-primary/70"} size={24} />
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    location.isMain 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {location.type}
                  </span>
                  <h3 className="font-bold text-xl mb-1">{location.city}</h3>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
