import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  TrendingUp,
  Users,
  Heart,
  Zap,
  Target,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Building2,
  Upload,
  FileText,
  X
} from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadResume = async (): Promise<string | null> => {
    if (!resumeFile) return null;
    
    setIsUploadingResume(true);
    try {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `applications/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, resumeFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Return the file path only - admins can use signed URLs to access
      return filePath;
    } catch (error) {
      console.error("Resume upload failed:", error);
      throw error;
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload resume if provided
      let resumeUrl: string | null = null;
      if (resumeFile) {
        resumeUrl = await uploadResume();
      }

      // Save to database
      const { error: dbError } = await supabase
        .from("job_applications")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          position: formData.position,
          experience: formData.experience || null,
          cover_letter: formData.coverLetter.trim() || null,
          resume_url: resumeUrl,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to submit your application");
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-career-notification",
        {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            position: formData.position,
            experience: formData.experience || undefined,
            coverLetter: formData.coverLetter.trim() || undefined,
            resumeUrl: resumeUrl || undefined,
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application and get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        coverLetter: "",
      });
      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const jobOpenings = [
    {
      title: "Sales Executive",
      type: "Full-time",
      location: "Agra",
      description: "Drive business growth by acquiring new clients and managing advertising campaigns.",
    },
    {
      title: "Operations Manager",
      type: "Full-time",
      location: "Agra",
      description: "Oversee daily operations, fleet management, and ensure smooth campaign execution.",
    },
    {
      title: "Graphic Designer",
      type: "Full-time / Part-time",
      location: "Remote / Agra",
      description: "Create stunning vehicle wraps and advertising designs that capture attention.",
    },
    {
      title: "Driver Partner",
      type: "Contract",
      location: "Agra & Nearby",
      description: "Earn extra income by displaying advertisements on your vehicle while you drive.",
    },
    {
      title: "Marketing Intern",
      type: "Internship",
      location: "Agra",
      description: "Learn digital marketing, social media management, and campaign analytics.",
    },
    {
      title: "Customer Support",
      type: "Full-time",
      location: "Agra",
      description: "Provide excellent support to clients and drivers, ensuring satisfaction.",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Fast-growing startup with clear career progression paths",
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Work with passionate, driven individuals who support each other",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible working hours and a healthy work environment",
    },
    {
      icon: Zap,
      title: "Learning Culture",
      description: "Regular training sessions and skill development programs",
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
              Join Our Team
            </span>
            <h1 className="mb-6 text-4xl md:text-5xl font-bold">
              Build Your Career at <span className="text-primary">MotionFleet</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Be part of India's innovative mobile advertising revolution. We're looking for passionate individuals to join our growing team.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why MotionFleet?
            </span>
            <h2 className="text-4xl font-bold mb-4">Benefits of Working With Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team members and creating an environment where everyone can thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Open Positions
            </span>
            <h2 className="text-4xl font-bold mb-4">Current Job Openings</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our available positions and find the perfect role for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {jobOpenings.map((job, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="text-primary" size={24} />
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {job.type}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-2">{job.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Apply Now
              </span>
              <h2 className="text-4xl font-bold mb-4">Submit Your Application</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 5-7 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your full name"
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
                    placeholder="your@email.com"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="position">Position Applying For *</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({ ...formData, position: value })}
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobOpenings.map((job, index) => (
                        <SelectItem key={index} value={job.title}>
                          {job.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fresher">Fresher (0-1 years)</SelectItem>
                    <SelectItem value="1-2 years">1-2 years</SelectItem>
                    <SelectItem value="2-5 years">2-5 years</SelectItem>
                    <SelectItem value="5+ years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="resume">Resume / CV</Label>
                <div className="mt-2">
                  {resumeFile ? (
                    <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <FileText className="text-primary" size={20} />
                      <span className="flex-1 text-sm truncate">{resumeFile.name}</span>
                      <button
                        type="button"
                        onClick={removeResume}
                        className="p-1 hover:bg-primary/20 rounded-full transition-colors"
                      >
                        <X size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      <Upload className="text-muted-foreground mb-2" size={24} />
                      <span className="text-sm text-muted-foreground">Click to upload resume</span>
                      <span className="text-xs text-muted-foreground mt-1">PDF or Word (max 5MB)</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="coverLetter">Cover Letter / Why do you want to join MotionFleet?</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Tell us about yourself and why you'd be a great fit..."
                  rows={5}
                  className="mt-2"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || isUploadingResume || !formData.position}
                className="w-full gradient-primary font-bold text-lg py-6 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting || isUploadingResume ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    {isUploadingResume ? "Uploading Resume..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    Submit Application
                    <ChevronRight className="ml-2" size={20} />
                  </>
                )}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 p-6 bg-card/50 rounded-2xl border border-border text-center">
              <p className="text-muted-foreground mb-2">Have questions about careers at MotionFleet?</p>
              <a 
                href="mailto:motionfleet7@gmail.com?subject=Career%20Inquiry" 
                className="text-primary font-semibold hover:underline"
              >
                motionfleet7@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
