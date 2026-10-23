import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // On mobile, transparent at top, solid on small scroll.
      // On desktop, stays transparent while scrolling through hero-track frames.
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        setIsScrolled(window.scrollY > 40);
      } else {
        const heroTrack = document.getElementById('hero-track');
        if (heroTrack) {
          const rect = heroTrack.getBoundingClientRect();
          setIsScrolled(rect.bottom <= 80);
        } else {
          setIsScrolled(window.scrollY > 40);
        }
      }

      const sections = ['home', 'about', 'services', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-md border-b border-sand/60 py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-sm transition-all duration-300 group-hover:scale-105 ${
                isScrolled
                  ? 'bg-emerald text-sand border-2 border-sand'
                  : 'bg-white/10 backdrop-blur-md text-sand border border-sand/40'
              }`}
            >
              V
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase leading-none transition-colors duration-300 ${
                  isScrolled ? 'text-emerald' : 'text-white drop-shadow-md'
                }`}
              >
                Velore <span className={isScrolled ? 'text-maroon' : 'text-sand'}>&amp;</span> Co.
              </span>
              <span
                className={`text-[10px] tracking-[0.25em] font-semibold uppercase mt-1 transition-colors duration-300 ${
                  isScrolled ? 'text-maroon' : 'text-sand/90 drop-shadow-sm'
                }`}
              >
                Haute Event Atelier
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-200 py-1 ${
                    isScrolled
                      ? isActive
                        ? 'text-maroon'
                        : 'text-emerald hover:text-maroon'
                      : isActive
                      ? 'text-sand font-bold drop-shadow'
                      : 'text-white/90 hover:text-sand drop-shadow-sm'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full transition-all duration-300 ${
                        isScrolled ? 'bg-maroon' : 'bg-sand'
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 active:scale-95 flex items-center gap-2 border ${
                isScrolled
                  ? 'bg-maroon hover:bg-[#521116] text-white border-maroon shadow-md hover:shadow-lg'
                  : 'bg-maroon hover:bg-[#521116] text-white border-sand/40 shadow-xl'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-sand" />
              <span>Reserve Date</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg focus:outline-none transition-colors ${
              isScrolled
                ? 'text-emerald hover:text-maroon'
                : 'text-white hover:text-sand'
            }`}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 shadow-xl transition-all ${
            isScrolled
              ? 'bg-ivory border-sand/80'
              : 'bg-[#031513]/95 backdrop-blur-xl border-sand/30'
          }`}
        >
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold ${
                    isScrolled
                      ? isActive
                        ? 'bg-sand/40 text-maroon font-bold'
                        : 'text-emerald hover:bg-sand/20'
                      : isActive
                      ? 'bg-white/10 text-sand font-bold'
                      : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-sand/30 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-maroon text-white text-center py-3 rounded-full text-xs uppercase tracking-widest font-semibold shadow"
            >
              Reserve Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
