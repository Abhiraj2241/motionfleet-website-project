import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-12 md:mt-20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              <span className="text-foreground">Motion</span>
              <span className="text-primary">Fleet</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Transform urban mobility into powerful moving billboards. Reach thousands daily with hyperlocal advertising.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/motionfleet/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">For Partners</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/drivers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Driver Partnership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Book Campaign
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Media Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Contact</h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail size={14} className="text-primary flex-shrink-0" />
                <a href="mailto:motionfleet7@gmail.com" className="text-sm hover:text-primary transition-colors break-all">
                  motionfleet7@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone size={14} className="text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-sm hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start space-x-2 text-muted-foreground">
                <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Agra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center text-muted-foreground">
          <p className="text-xs md:text-sm">&copy; {currentYear} MotionFleet. All rights reserved. Built by Abhiraj Sharma</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
