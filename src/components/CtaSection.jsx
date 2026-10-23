import React from 'react';
import { ArrowRight, Sparkles, Calendar, ShieldCheck, HeartHandshake, Globe2 } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   8 ORBS — LUXURY HAUTE EVENT COLOR PALETTE:
   Rich Bordeaux Maroons (#6C171E), Royal Deep Emeralds (#0D3D3A),
   and Luminous Champagne Gold / Warm Sand (#F4DABF).
   Creates an opulent candlelit gala ambiance in continuous motion.
───────────────────────────────────────────────────────────────── */

const ORB_A = [
  {
    // Orb 1 – Deep bordeaux wine velvet core
    w: '85vw', maxW: '960px',
    top: '50%', left: '50%',
    bg: 'radial-gradient(circle, rgba(140,28,38,0.75) 0%, rgba(108,23,30,0.60) 45%, transparent 72%)',
    blur: '115px',
    anim: 'orbDrift1 9s ease-in-out infinite',
  },
  {
    // Orb 2 – Royal deep emerald depth, upper-left roam
    w: '75vw', maxW: '840px',
    top: '35%', left: '22%',
    bg: 'radial-gradient(circle, rgba(16,84,78,0.72) 0%, rgba(13,61,58,0.58) 48%, transparent 74%)',
    blur: '125px',
    anim: 'orbDrift2 11s ease-in-out infinite',
  },
  {
    // Orb 3 – Champagne gold / warm sand candlelight, upper-right
    w: '65vw', maxW: '740px',
    top: '28%', left: '74%',
    bg: 'radial-gradient(circle, rgba(244,218,191,0.58) 0%, rgba(212,163,115,0.42) 40%, transparent 70%)',
    blur: '130px',
    anim: 'orbDrift3 13s ease-in-out infinite',
  },
  {
    // Orb 4 – Rich garnet-crimson shimmer, lower-right
    w: '60vw', maxW: '700px',
    top: '68%', left: '58%',
    bg: 'radial-gradient(circle, rgba(165,35,48,0.68) 0%, rgba(85,15,22,0.52) 44%, transparent 74%)',
    blur: '110px',
    anim: 'orbDrift4 10s ease-in-out infinite',
  },
];

const ORB_B = [
  {
    // Orb 5 – Forest emerald undertone, counter-phase
    w: '70vw', maxW: '800px',
    top: '55%', left: '40%',
    bg: 'radial-gradient(circle, rgba(20,95,88,0.62) 0%, rgba(7,36,34,0.50) 45%, transparent 72%)',
    blur: '140px',
    anim: 'orbDrift5 8s ease-in-out infinite',
  },
  {
    // Orb 6 – Candlelit amber gold pulse, lower-left
    w: '55vw', maxW: '640px',
    top: '72%', left: '20%',
    bg: 'radial-gradient(circle, rgba(248,225,195,0.48) 0%, rgba(190,130,75,0.38) 40%, transparent 72%)',
    blur: '145px',
    anim: 'orbDrift6 12s ease-in-out infinite',
  },
  {
    // Orb 7 – Pale ivory champagne highlight, upper-center
    w: '50vw', maxW: '580px',
    top: '20%', left: '50%',
    bg: 'radial-gradient(circle, rgba(255,245,225,0.45) 0%, rgba(230,195,150,0.32) 40%, transparent 70%)',
    blur: '120px',
    anim: 'orbDrift7 10s ease-in-out infinite',
  },
  {
    // Orb 8 – Velvet midnight bordeaux under-glow, bottom-center
    w: '65vw', maxW: '740px',
    top: '85%', left: '50%',
    bg: 'radial-gradient(circle, rgba(115,22,32,0.65) 0%, rgba(45,10,16,0.55) 46%, transparent 74%)',
    blur: '160px',
    anim: 'orbDrift8 14s ease-in-out infinite',
  },
];

export default function CtaSection() {
  return (
    <section
      id="living-cta"
      className="relative w-full min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-[#0a0709] border-t-2 border-b-2 border-sand/40"
    >
      {/* ── LIVING GRADIENT LAYER: 8 LUXURY BLURRED ORBS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

        {/* Layer A – Primary rich bordeaux & emerald orbs */}
        {ORB_A.map((orb, i) => (
          <div
            key={`a${i}`}
            className="absolute rounded-full will-change-transform"
            style={{
              width: orb.w,
              height: orb.w,
              maxWidth: orb.maxW,
              maxHeight: orb.maxW,
              top: orb.top,
              left: orb.left,
              background: orb.bg,
              filter: `blur(${orb.blur})`,
              animation: orb.anim,
            }}
          />
        ))}

        {/* Layer B – Candlelit amber gold & forest emerald richness */}
        {ORB_B.map((orb, i) => (
          <div
            key={`b${i}`}
            className="absolute rounded-full will-change-transform"
            style={{
              width: orb.w,
              height: orb.w,
              maxWidth: orb.maxW,
              maxHeight: orb.maxW,
              top: orb.top,
              left: orb.left,
              background: orb.bg,
              filter: `blur(${orb.blur})`,
              animation: orb.anim,
            }}
          />
        ))}

        {/* Velvet vignette ring – ensures high-contrast editorial typography */}
        <div
          className="absolute rounded-full"
          style={{
            width: '120vw',
            height: '120vw',
            maxWidth: '1300px',
            maxHeight: '1300px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, transparent 25%, rgba(10,7,9,0.60) 60%, rgba(10,7,9,0.96) 100%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* ── SUBTLE FILM GRAIN OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── SOFT EDGE MASKS ── */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0709] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0709] to-transparent pointer-events-none z-10" />

      {/* ── PAGE CONTENT (HAUTE COUTURE EVENT PLANNER COPY) ── */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 select-none py-16">

        {/* Prestige Season Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-sand/40 text-sand text-xs font-semibold uppercase tracking-widest shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-sand animate-pulse" />
          <span>Private Commissions • 2026 / 2027 Calendar Now Open</span>
        </div>

        {/* Event Planning Headline */}
        <div className="space-y-4">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-lg">
            Ready to Orchestrate Your <br />
            <span className="italic font-normal text-sand">Unforgettable Celebration?</span>
          </h2>
          <p className="text-ivory/85 text-sm sm:text-base lg:text-lg font-sans max-w-2xl mx-auto leading-relaxed font-light">
            From majestic destination weddings in Lake Como to milestone anniversary galas and private estate soirees, our atelier translates your grandest vision into seamless sensory perfection.
          </p>
        </div>

        {/* Dual Booking CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-maroon hover:bg-[#521116] text-white px-8 py-4 rounded-full font-serif text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3 border border-sand/30"
          >
            <Calendar className="w-4 h-4 text-sand" />
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-4 h-4 text-sand" />
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-ivory border-2 border-sand/60 hover:border-sand px-8 py-4 rounded-full font-serif text-sm font-semibold tracking-wider transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2.5 shadow-lg active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-sand" />
            <span>Explore Bespoke Services</span>
          </a>
        </div>

        {/* Trust & Assurance Strip */}
        <div className="pt-6 border-t border-sand/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-sand/90 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sand" />
            <span>Strict High-Profile NDA Protocol</span>
          </div>
          <span className="text-sand/30 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-sand" />
            <span>Single-Event Dedicated Focus</span>
          </div>
          <span className="text-sand/30 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-sand" />
            <span>Worldwide Destination Production</span>
          </div>
        </div>

      </div>
    </section>
  );
}
