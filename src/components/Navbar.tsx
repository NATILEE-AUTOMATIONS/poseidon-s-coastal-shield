import { ArrowRight } from "lucide-react";
import poseidonLogo from "@/assets/poseidon-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-teal/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="relative flex items-center justify-between lg:justify-center">
          {/* Logo - Left aligned */}
          <div className="flex-shrink-0 lg:absolute lg:left-0">
            <img 
              src={poseidonLogo} 
              alt="Poseidon Roofing" 
              className="h-12 sm:h-14 lg:h-20 w-auto object-contain"
            />
          </div>

          {/* Navigation Links - Centered on desktop */}
          <div className="hidden lg:flex items-center gap-10">
            <a href="#services" className="text-foreground/80 hover:text-teal transition-colors font-medium">
              Services
            </a>
            <a href="#about" className="text-foreground/80 hover:text-teal transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-teal transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* CTA Button - Right aligned */}
          <div className="lg:absolute lg:right-0 btn-neon-wrapper">
            <button className="btn-neon btn-neon-sm sm:btn-neon-default group">
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                Free Assessment
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
