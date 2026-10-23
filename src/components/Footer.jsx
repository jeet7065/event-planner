import React from 'react';
import { ArrowUp, Send } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald text-ivory border-t-2 border-sand/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-sand/20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sand text-emerald flex items-center justify-center font-serif text-xl font-bold border border-sand">
                V
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-sand uppercase">
                Velore <span className="text-sand/80">&</span> Co.
              </span>
            </div>
            <p className="text-xs text-ivory/80 max-w-sm leading-relaxed">
              International haute event architecture, spatial design, and floral scenography. Curating unforgettable memories for discerning patrons worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram SVG */}
              <a
                href="#home"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-sand/10 border border-sand/30 flex items-center justify-center hover:bg-maroon hover:text-white transition-colors text-sand"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href="#home"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-sand/10 border border-sand/30 flex items-center justify-center hover:bg-maroon hover:text-white transition-colors text-sand"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href="#home"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-sand/10 border border-sand/30 flex items-center justify-center hover:bg-maroon hover:text-white transition-colors text-sand"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-sand uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-sans text-ivory/80">
              <li>
                <a href="#home" className="hover:text-sand transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-sand transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sand transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-sand transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sand transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-sand uppercase tracking-wider">
              Atelier Hubs
            </h4>
            <ul className="space-y-2 text-xs font-sans text-ivory/70">
              <li>Place Vendôme, Paris</li>
              <li>Madison Avenue, New York</li>
              <li>Villa Balbiano, Lake Como</li>
              <li>Engadin Valley, St. Moritz</li>
              <li>Gion District, Kyoto</li>
            </ul>
          </div>

          {/* Gazette Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-sand uppercase tracking-wider">
              The Gazette
            </h4>
            <p className="text-xs text-ivory/70">
              Seasonal curations of design trends, floral installations, and architectural insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter private email"
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/30 border border-sand/30 text-ivory placeholder-ivory/40 focus:outline-none focus:border-sand"
              />
              <button
                type="submit"
                className="w-full bg-maroon hover:bg-[#521116] text-white py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3 h-3 text-sand" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <p>© {CURRENT_YEAR} Velore & Co. Haute Event Atelier. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-sand transition-colors">
              Privacy Policy & NDA
            </a>
            <span className="text-sand/30">•</span>
            <a href="#contact" className="hover:text-sand transition-colors">
              Terms of Commission
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-sand/20 hover:bg-sand text-sand hover:text-emerald flex items-center justify-center transition-colors ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
