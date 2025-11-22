import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-foreground">Motion</span>
              <span className="text-primary">Fleet</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Transform urban mobility into powerful moving billboards. Reach thousands daily with hyperlocal advertising.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h3 className="text-lg font-bold mb-4">For Partners</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/drivers" className="text-muted-foreground hover:text-primary transition-colors">
                  Driver Partnership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Campaign
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Media Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <a href="mailto:hello@motionfleet.com" className="hover:text-primary transition-colors">
                  hello@motionfleet.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start space-x-2 text-muted-foreground">
                <MapPin size={16} className="text-primary mt-1" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} MotionFleet. All rights reserved. Built by Abhiraj Sharma</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
