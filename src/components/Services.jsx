import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Gem, GlassWater, Crown, Flower2, Globe2, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Services({ onSelectService }) {
  const [activeId, setActiveId] = useState('weddings');

  const services = [
    {
      id: 'weddings',
      number: '01',
      verticalTitle: 'HAUTE COUTURE WEDDINGS',
      badge: 'Couture Signature',
      title: 'Haute Couture Weddings',
      tagline: 'Multi-day matrimonial celebrations of transcendent beauty.',
      description:
        'Complete spatial transformation from welcoming cocktails and ceremonial vows to grand midnight receptions and post-wedding brunches. Every detail custom-commissioned.',
      icon: Crown,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Dedicated Creative Director & Lead Producer',
        'Custom 3D Spatial Pre-visualization Renders',
        'Bridal Concierge & Private Villa Buyouts',
        'Michelin-Caliber Catering & Wine Pairing',
      ],
      priceGuide: 'Starting from $35,000 Production Fee',
    },
    {
      id: 'galas',
      number: '02',
      verticalTitle: 'CORPORATE GALAS & SUMMITS',
      badge: 'Executive & Brand',
      title: 'Corporate Galas & Brand Summits',
      tagline: 'High-impact environments for industry leaders and luxury brands.',
      description:
        'Immersive product unveilings, international investor summits, charity galas, and anniversary banquets engineered with state-of-the-art audiovisual scenography.',
      icon: GlassWater,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'High-Security Protocol & VIP Handling under strict NDA',
        'Custom Kinetic Stage & Lighting Architecture',
        'Branded Multi-Sensory Installations & Displays',
        'Global Media & Keynote Production Management',
      ],
      priceGuide: 'Custom Tier Based on Scope',
    },
    {
      id: 'private',
      number: '03',
      verticalTitle: 'PRIVATE ESTATE SOIRÉES',
      badge: 'Exclusive Milestone',
      title: 'Private Estate & Milestone Soirées',
      tagline: 'Intimate celebrations steeped in drama and personal narrative.',
      description:
        'Bespoke milestone birthdays, private island buyouts, Venetian masked balls, and anniversaries hosted in secluded private estates and châteaux worldwide.',
      icon: Gem,
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Full Residential & Historical Villa Conversion',
        'A-List Entertainment Booking & Sound Engineering',
        'Artisanal Mixology Bars & Sommelier Selection',
        'Midnight After-Party Lounge & Pyro Displays',
      ],
      priceGuide: 'Starting from $20,000 Production Fee',
    },
    {
      id: 'floral',
      number: '04',
      verticalTitle: 'FLORAL SCENOGRAPHY',
      badge: 'Living Architecture',
      title: 'Floral Scenography & Fabrication',
      tagline: 'Sculptural botanical art, custom lighting, and bespoke tablescapes.',
      description:
        'Our in-house floral atelier crafts suspended botanical clouds, towering garden arches, rare European blooms, and custom-fabricated chandeliers.',
      icon: Flower2,
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Direct Import of Rare European & Exotic Blooms',
        'Hand-Carved Furniture & Silk Linens Curation',
        'Architectural Ambient Lighting & Candle Sculptures',
        'Complete Post-Event Eco Composting & Repurposing',
      ],
      priceGuide: 'Tailored to Floral & Build Scope',
    },
    {
      id: 'destinations',
      number: '05',
      verticalTitle: 'DESTINATION EXPERIENCES',
      badge: 'Global Horizons',
      title: 'Destination Weekend Experiences',
      tagline: 'Multi-day celebrations across the world’s most scenic corners.',
      description:
        'From Lake Como palazzos and Parisian châteaux to Moroccan desert pavilions and St. Moritz mountain chalets, we handle all cross-border logistics and festivities.',
      icon: Globe2,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Charter Aviation & Luxury Yacht Logistics',
        'Local Artisan Sourcing & Cultural Integration',
        'Multi-Day Welcome Parties & Farewell Excursions',
        '24/7 Multi-Lingual On-Site Guest Concierge',
      ],
      priceGuide: 'Starting from $45,000 Production Fee',
    },
    {
      id: 'concierge',
      number: '06',
      verticalTitle: 'VIP WHITE-GLOVE CONCIERGE',
      badge: 'Discreet Hospitality',
      title: 'VIP Concierge & Guest Hospitality',
      tagline: 'End-to-end white-glove hospitality ensuring every attendee is treated like royalty.',
      description:
        'Discreet VIP security, private aviation transfers, Michelin-starred culinary partnerships, and seamless guest accommodations coordinated with Swiss precision.',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        'Chauffeured Transfers & Private Jet Charters',
        '5-Star Luxury Suite Allocations & Welcome Hampers',
        'Personal Dedicated Host for Royal & VIP Guests',
        'Strict NDA & Non-Disclosure Privacy Protocols',
      ],
      priceGuide: 'Retainer on Commission Basis',
    },
  ];

  const activeIndex = services.findIndex((s) => s.id === activeId);
  const activeService = services[activeIndex] || services[0];
  const ActiveIcon = activeService.icon;

  const handleBookService = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevService = () => {
    const prevIdx = activeIndex === 0 ? services.length - 1 : activeIndex - 1;
    setActiveId(services[prevIdx].id);
  };

  const handleNextService = () => {
    const nextIdx = activeIndex === services.length - 1 ? 0 : activeIndex + 1;
    setActiveId(services[nextIdx].id);
  };

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 bg-purewhite border-b border-sand/50 relative overflow-hidden">
      
      {/* Background radial sand glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-sand/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand/50 border border-sand text-maroon text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-maroon" />
            Expanding Service Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-emerald leading-tight">
            Comprehensive Event Architecture <br className="hidden sm:inline" />
            <span className="italic font-normal text-maroon">&amp; Production</span>
          </h2>
          <p className="text-emerald/80 text-xs sm:text-base leading-relaxed">
            Discover our full bespoke capabilities, deliverables, and curations tailored for luxury celebrations.
          </p>
        </div>

        {/* ── 1. MOBILE RESPONSIVE VIEW (SCREEN < 768px): TOUCH TABS + EXPANDED CARD ── */}
        <div className="md:hidden space-y-4">
          {/* Horizontal Scrollable Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4">
            {services.map((service) => {
              const isSelected = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                    isSelected
                      ? 'bg-maroon text-white border-maroon shadow-md'
                      : 'bg-white text-emerald border-sand/80 hover:bg-sand/30'
                  }`}
                >
                  <span className="font-mono text-[10px] mr-1.5 opacity-75">{service.number}</span>
                  <span>{service.title.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card Container with Full Details */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-maroon shadow-xl bg-white">
            {/* Header Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-emerald">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/95 via-emerald-dark/40 to-transparent" />

              {/* Overlay Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-emerald/90 backdrop-blur-md text-sand font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-sand/40 shadow-sm">
                  <ActiveIcon className="w-3.5 h-3.5 text-sand" />
                  <span>{activeService.badge}</span>
                </span>

                <span className="font-mono text-xs text-sand/90 font-bold bg-black/40 px-2.5 py-1 rounded-full border border-sand/30">
                  {activeService.number} / 06
                </span>
              </div>

              {/* Title & Tagline Over Image */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-sand tracking-widest block drop-shadow">
                  {activeService.tagline}
                </span>
                <h3 className="font-serif text-2xl font-bold text-ivory drop-shadow-md">
                  {activeService.title}
                </h3>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-5 space-y-4 bg-white">
              <p className="text-xs text-emerald/80 leading-relaxed font-sans font-light">
                {activeService.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-2 border-t border-sand/40">
                <span className="text-[10px] font-mono uppercase tracking-wider text-maroon font-bold block">
                  Signature Deliverables
                </span>
                <div className="space-y-1.5">
                  {activeService.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                      <span className="text-xs text-emerald/90 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Investment & CTA */}
              <div className="pt-3 border-t border-sand/40 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald/60 block font-semibold">
                    Investment Guide
                  </span>
                  <span className="font-serif text-xs font-bold text-emerald">
                    {activeService.priceGuide}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleBookService(activeService.title)}
                  className="bg-maroon hover:bg-[#521116] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md active:scale-95 flex items-center gap-1.5 shrink-0"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sand" />
                </button>
              </div>

              {/* Step Navigation Bar */}
              <div className="pt-2 flex items-center justify-between text-xs text-emerald border-t border-sand/30">
                <button
                  type="button"
                  onClick={handlePrevService}
                  className="flex items-center gap-1 font-semibold text-emerald hover:text-maroon py-1 px-2 rounded-lg hover:bg-sand/20"
                >
                  <ChevronLeft className="w-4 h-4 text-maroon" />
                  <span>Previous</span>
                </button>

                <span className="font-mono text-[11px] text-emerald/60">
                  {activeService.number} of 06
                </span>

                <button
                  type="button"
                  onClick={handleNextService}
                  className="flex items-center gap-1 font-semibold text-emerald hover:text-maroon py-1 px-2 rounded-lg hover:bg-sand/20"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 text-maroon" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. DESKTOP VIEW (SCREEN >= 768px): HORIZONTAL EXPANDING ACCORDION PANELS DECK ── */}
        <div className="hidden md:flex flex-row gap-3 sm:gap-4 w-full h-[620px] lg:h-[660px] select-none">
          {services.map((service) => {
            const isActive = activeId === service.id;
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onClick={() => setActiveId(service.id)}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive
                    ? 'md:flex-[4.5] lg:flex-[5] border-maroon shadow-2xl ring-2 ring-sand/60'
                    : 'md:flex-[1] h-full border-sand/60 shadow-md hover:border-sand-dark'
                }`}
              >
                {/* Background Image with Cinematic Zoom and Filter Transition */}
                <img
                  src={service.image}
                  alt={service.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive
                      ? 'grayscale-0 contrast-100 brightness-100 scale-105'
                      : 'grayscale contrast-125 brightness-[0.55] scale-100'
                  }`}
                />

                {/* Dark Vignette Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-emerald-dark/95 via-emerald-dark/40 to-black/20'
                      : 'bg-black/50 group-hover:bg-black/40'
                  }`}
                />

                {/* 1. COLLAPSED STATE: VERTICAL ORIENTED TITLE & NUMBER */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between items-center p-4 sm:p-6 transition-all duration-500 pointer-events-none ${
                    isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                  }`}
                >
                  {/* Top: Icon + Number */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-sand/40 flex items-center justify-center text-sand">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-sand/80 font-bold">
                      {service.number}
                    </span>
                  </div>

                  {/* Vertical Rotated Text running up/down the panel */}
                  <div className="flex [writing-mode:vertical-rl] rotate-180 items-center justify-center">
                    <span className="font-serif text-sm tracking-[0.25em] text-ivory/80 uppercase font-semibold whitespace-nowrap group-hover:text-sand transition-colors">
                      {service.verticalTitle}
                    </span>
                  </div>

                  {/* Bottom: Subtle Sand Dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-sand/60" />
                </div>

                {/* 2. EXPANDED STATE: FULL DETAILED CONTENT */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  {/* Top Row: Service Badge & Number Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-emerald/90 backdrop-blur-md text-sand font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-sand/40 shadow-sm">
                      <Sparkles className="w-3 h-3 text-sand" />
                      <span>{service.badge}</span>
                    </span>

                    <span className="font-mono text-xs sm:text-sm text-sand/90 font-bold bg-black/40 px-3 py-1 rounded-full border border-sand/30">
                      {service.number} / 06
                    </span>
                  </div>

                  {/* Bottom Content Container */}
                  <div className="space-y-4 max-w-xl">
                    {/* Icon & Title */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-sand text-emerald flex items-center justify-center shadow-md border border-sand">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold text-sand drop-shadow">
                          {service.tagline}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory leading-tight drop-shadow-md">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-sans font-light drop-shadow">
                      {service.description}
                    </p>

                    {/* Feature Highlights Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sand/30">
                      {service.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-sand shrink-0" />
                          <span className="text-xs text-ivory/90 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing & CTA Button */}
                    <div className="pt-3 flex items-center justify-between gap-4 border-t border-sand/30">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-sand/80 block font-semibold">
                          Investment Guide
                        </span>
                        <span className="font-serif text-sm sm:text-base font-bold text-sand">
                          {service.priceGuide}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookService(service.title);
                        }}
                        className="bg-maroon hover:bg-[#521116] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-2 border border-maroon"
                      >
                        <span>Request Curation</span>
                        <ArrowRight className="w-3.5 h-3.5 text-sand" />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Consultation Bottom Banner */}
        <div className="mt-10 sm:mt-14 bg-emerald text-ivory rounded-3xl p-6 sm:p-10 border-2 border-sand/50 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs uppercase font-mono tracking-widest text-sand font-bold">
              Custom Vision
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sand">
              Require a Confidential or Multi-Destination Brief?
            </h3>
            <p className="text-xs sm:text-sm text-ivory/80 max-w-xl">
              We specialize in complex logistical scenarios, private residence conversions, and non-disclosure requirements for high-profile patrons.
            </p>
          </div>

          <a
            href="#contact"
            className="w-full sm:w-auto text-center shrink-0 bg-sand hover:bg-sand-light text-emerald px-8 py-3.5 rounded-full font-serif text-sm font-bold tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            Schedule VIP Discovery
          </a>
        </div>

      </div>
    </section>
  );
}
