import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
      details: "hello@motionfleet.com",
      action: "mailto:hello@motionfleet.com",
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
      action: "https://wa.me/919876543210",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Mumbai, India",
      action: "#",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Ready to launch your advertising campaign? Have questions? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover-scale text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-bold mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.details}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="John Doe"
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
                  <Label htmlFor="company">Company / Brand Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                  />
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
                  />
                </div>

                <Button type="submit" className="w-full gradient-primary font-bold text-lg">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Quick Information</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-bold mb-3">Operating Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Saturday: 9:00 AM - 7:00 PM<br />
                    Sunday: 10:00 AM - 5:00 PM
                  </p>
                </div>

                <div className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-bold mb-3">Service Areas</h3>
                  <p className="text-muted-foreground">
                    Currently operating in Mumbai, Delhi, Bangalore, and Pune. Expanding to more cities soon!
                  </p>
                </div>

                <div className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-bold mb-3">Response Time</h3>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24 hours on business days.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-bold mb-3">Emergency Support</h3>
                  <p className="text-muted-foreground">
                    For urgent campaign issues, call our 24/7 support line at +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
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
              ].map((faq, index) => (
                <div key={index} className="p-6 bg-background rounded-lg border border-border">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Our Locations</h2>
          <div className="bg-muted rounded-lg aspect-video flex items-center justify-center border border-border">
            <div className="text-center">
              <MapPin className="text-primary mx-auto mb-4" size={48} />
              <p className="text-muted-foreground">Service Coverage Map</p>
              <p className="text-sm text-muted-foreground">Mumbai | Delhi | Bangalore | Pune</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
