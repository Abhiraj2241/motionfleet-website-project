import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Clock, Shield, Headphones, Car, TrendingUp, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";

const Drivers = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
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
      title: t('benefit.income.title'),
      description: t('benefit.income.desc'),
    },
    {
      icon: Clock,
      title: t('benefit.flexible.title'),
      description: t('benefit.flexible.desc'),
    },
    {
      icon: Shield,
      title: t('benefit.installation.title'),
      description: t('benefit.installation.desc'),
    },
    {
      icon: Headphones,
      title: t('benefit.support.title'),
      description: t('benefit.support.desc'),
    },
    {
      icon: Car,
      title: t('benefit.vehicle.title'),
      description: t('benefit.vehicle.desc'),
    },
    {
      icon: TrendingUp,
      title: t('benefit.payment.title'),
      description: t('benefit.payment.desc'),
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
        title: t('form.success.title'),
        description: t('form.success.desc'),
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
        title: t('form.error.title'),
        description: t('form.error.desc'),
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
            <div className="flex justify-center mb-6">
              <LanguageSwitcher />
            </div>
            <h1 className="mb-6">{t('hero.title')}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('hero.subtitle')}
            </p>
            
            {/* Tracking CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mb-8 border border-primary/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Already Registered?</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Start tracking your location to begin earning with active campaigns
              </p>
              <Button 
                size="lg" 
                asChild 
                className="gradient-primary font-bold text-lg group"
              >
                <Link to="/driver-tracking">
                  <Navigation className="mr-2 w-5 h-5" />
                  Start Location Tracking
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">{t('benefits.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('benefits.subtitle')}
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
            <h2 className="mb-4">{t('process.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('process.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">{t('process.step1.title')}</h3>
              <p className="text-muted-foreground">
                {t('process.step1.desc')}
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">{t('process.step2.title')}</h3>
              <p className="text-muted-foreground">
                {t('process.step2.desc')}
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">{t('process.step3.title')}</h3>
              <p className="text-muted-foreground">
                {t('process.step3.desc')}
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-4">04</div>
              <h3 className="text-xl font-bold mb-2">{t('process.step4.title')}</h3>
              <p className="text-muted-foreground">
                {t('process.step4.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">{t('requirements.title')}</h2>
            <div className="space-y-4">
              {['req1', 'req2', 'req3', 'req4', 'req5'].map((req, index) => (
                <div key={index} className="flex items-start p-4 bg-card rounded-lg border border-border">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-background text-xs font-bold">✓</span>
                  </div>
                  <span className="text-muted-foreground">{t(req)}</span>
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
              <h2 className="mb-4">{t('form.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('form.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-background rounded-lg border border-border">
              <div>
                <Label htmlFor="name">{t('form.name')} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder={t('form.name.placeholder')}
                />
              </div>

              <div>
                <Label htmlFor="email">{t('form.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('form.email.placeholder')}
                />
              </div>

              <div>
                <Label htmlFor="phone">{t('form.phone')} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder={t('form.phone.placeholder')}
                />
              </div>

              <div>
                <Label htmlFor="city">{t('form.city')} *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  placeholder={t('form.city.placeholder')}
                />
              </div>

              <div>
                <Label htmlFor="vehicleType">{t('form.vehicle.type')} *</Label>
                <Input
                  id="vehicleType"
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  required
                  placeholder={t('form.vehicle.type.placeholder')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehicleModel">{t('form.vehicle.model')}</Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    placeholder={t('form.vehicle.model.placeholder')}
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleYear">{t('form.vehicle.year')}</Label>
                  <Input
                    id="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                    placeholder={t('form.vehicle.year.placeholder')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="licenseNumber">{t('form.license')}</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder={t('form.license.placeholder')}
                />
              </div>

              <div>
                <Label htmlFor="message">{t('form.additional')}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('form.additional.placeholder')}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="licensePhoto">{t('form.license.photo')}</Label>
                <Input
                  id="licensePhoto"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setLicensePhoto(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">{t('form.license.photo.hint')}</p>
              </div>

              <div>
                <Label htmlFor="registrationPhoto">{t('form.registration.photo')}</Label>
                <Input
                  id="registrationPhoto"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setRegistrationPhoto(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">{t('form.registration.photo.hint')}</p>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary font-bold text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                {t('form.disclaimer')}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">{t('testimonials.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: t('testimonial1.name'),
                location: t('testimonial1.location'),
                quote: t('testimonial1.quote'),
              },
              {
                name: t('testimonial2.name'),
                location: t('testimonial2.location'),
                quote: t('testimonial2.quote'),
              },
              {
                name: t('testimonial3.name'),
                location: t('testimonial3.location'),
                quote: t('testimonial3.quote'),
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
