import React from 'react';
import { Compass, Sparkles, Feather, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Compass,
      title: 'Architectural Spatial Design',
      description:
        'We do not merely decorate rooms; we sculpt environments. From historic Italian villas to private Caribbean islands, we create architectural layouts that elevate flow and drama.',
    },
    {
      icon: Feather,
      title: 'Sensory Scenography & Floral Art',
      description:
        'Every detail is harmonized — olfactory botanical infusions, bespoke crystal chandeliers, ambient acoustics, and sculptural floral installations tailored to your story.',
    },
    {
      icon: HeartHandshake,
      title: 'White-Glove Guest Hospitality',
      description:
        'Discreet VIP concierge, private jet coordination, Michelin-starred culinary partnerships, and seamless guest care ensuring every attendee feels like royalty.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-ivory border-b border-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/50 border border-sand text-maroon text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-maroon" />
            Our Heritage & Ethos
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-emerald leading-tight">
            Where Impeccable Taste Meets <br className="hidden sm:inline" />
            <span className="italic font-normal text-maroon">Flawless Precision</span>
          </h2>
          <p className="text-emerald/80 text-sm sm:text-base leading-relaxed">
            Founded in 2011, Velore & Co. was born from a singular conviction: that life’s most pivotal milestones deserve an artistic caliber comparable to fine art and couture fashion.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Collage of Atelier Images */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-sand/60 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80"
                    alt="Intimate Wedding Design"
                    className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-white p-5 rounded-2xl border-2 border-sand shadow-sm space-y-2">
                  <p className="text-xs uppercase tracking-wider font-bold text-maroon">Artistic Direction</p>
                  <p className="font-serif text-base font-bold text-emerald">Every scene storyboarded with custom watercolor renders</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-emerald text-ivory p-5 rounded-2xl border border-sand/40 shadow-lg space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-sand font-bold">Confidentiality</span>
                  <p className="font-serif text-base font-bold text-sand">Complete Privacy & NDA-Strict Protocol for VIP Clients</p>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-sand/60 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80"
                    alt="Luxury Gala Reception Hall"
                    className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Atelier Philosophy & Principles */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald">
                Bespoke Experiences Curated Without Compromise
              </h3>
              <p className="text-emerald/80 text-sm sm:text-base leading-relaxed">
                We accept only a limited number of commissions each season. This allows our creative directors, floral architects, and logistical producers to dedicate hundreds of hours to your celebration.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              {[
                'Direct collaboration with Creative Director & dedicated Lead Producer',
                'Comprehensive 3D Spatial Pre-visualization & lighting simulation',
                'Exclusive partnerships with Michelin-rated culinary master chefs',
                'Global logistics handling customs, floral refrigeration & private transfers',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-sand/60 flex items-center justify-center shrink-0 border border-sand">
                    <CheckCircle2 className="w-3.5 h-3.5 text-maroon" />
                  </div>
                  <span className="text-xs sm:text-sm text-emerald font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Director's Signature Box */}
            <div className="bg-white p-6 rounded-2xl border-2 border-sand shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Helena Vance, Principal Director"
                  className="w-14 h-14 rounded-full object-cover border-2 border-sand shadow"
                />
                <div>
                  <p className="font-serif text-base font-bold text-emerald">Helena Vance</p>
                  <p className="text-xs text-maroon font-semibold">Founder & Lead Scenographer</p>
                  <p className="text-[11px] text-emerald/60">Paris • New York • London</p>
                </div>
              </div>
              <div className="italic font-serif text-sm text-emerald/70 border-t sm:border-t-0 sm:border-l border-sand/60 pt-3 sm:pt-0 sm:pl-6 text-center sm:text-left">
                “Luxury is when every single sense is quietly overwhelmed with beauty.”
              </div>
            </div>

          </div>

        </div>

        {/* 3 Pillars Cards */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-maroon">Our Method</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald mt-1">The Three Pillars of Our Craft</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl border-2 border-sand/70 shadow-sm hover:shadow-xl hover:border-maroon/40 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sand/30 border border-sand flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-colors duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-emerald mb-3">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-emerald/80 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
