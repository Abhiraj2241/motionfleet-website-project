import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isAdmin, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Tracking", path: "/tracking" },
    { name: "Drivers", path: "/drivers" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-xl md:text-2xl font-bold">
              <span className="text-foreground">Motion</span>
              <span className="text-primary">Fleet</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="text-sm gap-2">
                        <User size={16} />
                        <span className="max-w-[100px] truncate">
                          {user.email?.split('@')[0]}
                        </span>
                        {isAdmin && (
                          <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                            Admin
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="text-sm text-muted-foreground">
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="outline" size="sm" asChild className="text-sm gap-2">
                    <Link to="/auth">
                      <LogIn size={16} />
                      Sign In
                    </Link>
                  </Button>
                )}
              </>
            )}
            <Button size="sm" asChild className="gradient-primary font-bold text-sm">
              <Link to="/book-campaign">Book Campaign</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-base font-medium transition-colors hover:text-primary hover:bg-primary/5 rounded-lg ${
                    location.pathname === link.path ? "text-primary bg-primary/10" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-4 space-y-3">
                {!loading && (
                  <>
                    {user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                          <User size={16} className="text-muted-foreground" />
                          <span className="text-sm truncate">{user.email}</span>
                          {isAdmin && (
                            <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded ml-auto">
                              Admin
                            </span>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full text-red-500 border-red-500/30 hover:bg-red-500/10"
                          onClick={handleSignOut}
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                          <LogIn size={16} className="mr-2" />
                          Sign In
                        </Link>
                      </Button>
                    )}
                  </>
                )}
                <Button asChild className="w-full gradient-primary font-bold">
                  <Link to="/book-campaign" onClick={() => setIsMobileMenuOpen(false)}>
                    Book Campaign
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
