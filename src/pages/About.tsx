import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Users, TrendingUp, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Pioneering hyperlocal advertising with technology-driven solutions",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building strong relationships with drivers and brands alike",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "Committed to helping brands and drivers achieve their goals",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering measurable results and exceptional service quality",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">About MotionFleet</h1>
            <p className="text-xl text-muted-foreground">
              We're transforming urban mobility into powerful advertising platforms, creating opportunities for both brands and drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 bg-card rounded-lg border border-border">
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                To become India's leading hyperlocal advertising network, revolutionizing how brands connect with urban audiences through innovative mobility solutions.
              </p>
            </div>
            <div className="p-8 bg-card rounded-lg border border-border">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                Empowering local businesses with affordable, data-driven advertising while creating sustainable income opportunities for mobility fleet owners and drivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-6">
                MotionFleet was born from a simple observation: thousands of autos and rickshaws navigate city streets every day, yet their potential as advertising platforms remained largely untapped.
              </p>
              <p className="text-lg mb-6">
                Founded by <strong className="text-foreground">Abhiraj Sharma</strong>, a visionary entrepreneur with a passion for innovative marketing solutions, MotionFleet bridges the gap between brands seeking cost-effective local advertising and drivers looking for additional income streams.
              </p>
              <p className="text-lg mb-6">
                What started as a pilot project with 10 auto-rickshaws in Agra has grown into a network serving brands and partnering with vehicles across India. Our technology-first approach ensures transparency, measurable results, and seamless campaign management.
              </p>
              <p className="text-lg">
                Today, MotionFleet stands at the forefront of hyperlocal advertising, combining traditional outdoor advertising reach with modern digital tracking and analytics capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">A Note from Our Founder</h2>
            <div className="p-8 bg-background/80 backdrop-blur-sm rounded-lg border border-border">
              <p className="text-lg text-muted-foreground italic mb-4">
                "When I started MotionFleet, my goal was simple: create a win-win solution where brands get effective advertising and drivers earn extra income. Today, seeing our network grow and impact thousands of lives fills me with immense pride. We're not just running ad campaigns; we're building a movement that transforms urban advertising."
              </p>
              <div className="pt-4 border-t border-border">
                <p className="font-bold text-xl">Abhiraj Sharma</p>
                <p className="text-muted-foreground">Founder & CEO, MotionFleet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
