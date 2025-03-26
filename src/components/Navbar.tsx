
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="/"
          className="text-xl font-semibold text-sage-800 flex items-center"
        >
          <span className="text-sage-600 mr-1">Food</span>Wise
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium link-hover">
            Features
          </a>
          <a href="#statistics" className="text-sm font-medium link-hover">
            Impact
          </a>
          <a href="#cta" className="text-sm font-medium link-hover">
            Join Us
          </a>
          <button className="bg-sage-600 hover:bg-sage-700 text-white px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-sage-800" />
          ) : (
            <Menu className="h-6 w-6 text-sage-800" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 z-40 shadow-md animate-fade-in">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <a
              href="#features"
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#statistics"
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impact
            </a>
            <a
              href="#cta"
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Us
            </a>
            <button className="bg-sage-600 hover:bg-sage-700 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
