import React, { useState, useEffect } from 'react';
import { Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [pausedCol, setPausedCol] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const togglePause = (colIndex) => {
    setPausedCol((prev) => (prev === colIndex ? null : colIndex));
  };

  // Column 1 reviews (moves upwards)
  const column1 = [
    {
      name: 'Lucas Stone',
      handle: '@luc',
      countryCode: 'FR',
      country: 'France',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      review: 'Velore & Co. made our wedding at Château de Chantilly 10x more magical than we could have ever dreamed!',
      stars: 5,
    },
    {
      name: 'Haruto Sato',
      handle: '@haru',
      countryCode: 'JP',
      country: 'Japan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      review: 'The living botanical ceiling installation in Kyoto was an architectural masterpiece. Pure poetic grandeur.',
      stars: 5,
    },
    {
      name: 'Ava Green',
      handle: '@ava',
      countryCode: 'AU',
      country: 'Australia',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      review: 'Their concierge coordinated private aviation and island villa buyouts with effortless diplomacy and grace.',
      stars: 5,
    },
    {
      name: 'Ana Miller',
      handle: '@ana',
      countryCode: 'DE',
      country: 'Germany',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      review: 'The 3D spatial pre-visualization rendered every detail with exact precision. Truly an award-winning team!',
      stars: 5,
    },
  ];

  // Column 2 reviews (moves downwards)
  const column2 = [
    {
      name: 'Emma Lee',
      handle: '@emma',
      countryCode: 'CA',
      country: 'Canada',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      review: 'Love the pause on hover feature! Our Lake Como celebration at Villa Balbiano was breathtaking in every sense.',
      stars: 5,
    },
    {
      name: 'Mateo Rossi',
      handle: '@mat',
      countryCode: 'IT',
      country: 'Italy',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80',
      review: 'Flawless Michelin-grade catering and continuous floral runner for 350 guests. Animations are buttery smooth!',
      stars: 5,
    },
    {
      name: 'Carlos Ray',
      handle: '@carl',
      countryCode: 'ES',
      country: 'Spain',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80',
      review: 'Great for high-profile executive galas and brand summits. Complete discretion under strict NDA protocol.',
      stars: 5,
    },
    {
      name: 'Lady Victoria Vance',
      handle: '@victoria',
      countryCode: 'GB',
      country: 'UK',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
      review: 'Helena and her team treated our milestone celebration as if it were an historic state dinner. Perfection!',
      stars: 5,
    },
  ];

  // Column 3 reviews (moves upwards)
  const column3 = [
    {
      name: 'Maya Patel',
      handle: '@maya',
      countryCode: 'IN',
      country: 'India',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
      review: 'Setup was a breeze! A 4-day destination royal wedding in Saint-Tropez orchestrated to perfection.',
      stars: 5,
    },
    {
      name: 'Baron Philippe',
      handle: '@philippe',
      countryCode: 'CH',
      country: 'Swiss',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
      review: 'The holographic stage and alpine chalet ice bar at St. Moritz left our global delegates speechless.',
      stars: 5,
    },
    {
      name: 'Sofia Rossi',
      handle: '@sofia',
      countryCode: 'IT',
      country: 'Italy',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
      review: 'From the candlelit waterfront dock to the surprise midnight fireworks, sheer magic from start to finish.',
      stars: 5,
    },
    {
      name: 'Alexander Wright',
      handle: '@alex',
      countryCode: 'US',
      country: 'USA',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80',
      review: 'Vertical marquee is a game changer! White-glove concierge for 500 guests with zero logistical flaws.',
      stars: 5,
    },
  ];

  // Column 4 reviews (moves downwards)
  const column4 = [
    {
      name: 'Camille Dupuis',
      handle: '@camille',
      countryCode: 'FR',
      country: 'France',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      review: 'The Louvre charity gala was heralded by international press as the design triumph of the season.',
      stars: 5,
    },
    {
      name: 'Kenji Takahashi',
      handle: '@kenji',
      countryCode: 'JP',
      country: 'Japan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      review: 'Every single floral arch and custom blown-glass lantern felt like an exhibit in a modern art museum.',
      stars: 5,
    },
    {
      name: 'Elena Rostova',
      handle: '@elena',
      countryCode: 'MC',
      country: 'Monaco',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80',
      review: 'Their discretion, architectural spatial planning, and acoustic calibration were second to none.',
      stars: 5,
    },
    {
      name: 'David Sterling',
      handle: '@sterling',
      countryCode: 'US',
      country: 'USA',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80',
      review: 'Voted best atelier for a reason. They removed every stress and created lifelong golden memories.',
      stars: 5,
    },
  ];

  const renderCard = (item, idx) => (
    <div
      key={idx}
      className="group/card bg-[#072422]/95 hover:bg-[#0a312e] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-sand/25 hover:border-maroon shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer select-none"
    >
      {/* Card Header: Avatar, Name/Handle, Country */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
        {/* Left: Avatar + Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-sand/50 shadow group-hover/card:border-sand transition-colors shrink-0"
          />
          <div className="overflow-hidden">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <h4 className="font-serif font-bold text-ivory text-xs sm:text-sm leading-tight group-hover/card:text-sand transition-colors truncate">
                {item.name}
              </h4>
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sand shrink-0" />
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-sand/70 truncate">{item.handle}</p>
          </div>
        </div>

        {/* Right: Country Code badge */}
        <div className="text-right shrink-0">
          <span className="font-mono text-[11px] sm:text-xs font-bold text-sand uppercase block">
            {item.countryCode}
          </span>
          <span className="text-[9px] sm:text-[10px] text-ivory/60 font-medium block">
            {item.country}
          </span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-[11px] sm:text-[13px] text-ivory/90 leading-relaxed font-sans mb-2.5 sm:mb-3 font-normal line-clamp-4 sm:line-clamp-none">
        {item.review}
      </p>

      {/* Star Rating Strip */}
      <div className="flex items-center justify-between pt-2 border-t border-sand/15">
        <div className="flex text-sand gap-0.5">
          {[...Array(item.stars || 5)].map((_, s) => (
            <Star key={s} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-sand" />
          ))}
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-sand/80 uppercase">
          Verified Patron
        </span>
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-emerald text-ivory border-b border-sand/30 relative overflow-hidden">
      {/* Background radial sand glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-sand/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4 relative z-10 mb-10 sm:mb-16">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand/20 border border-sand/40 text-sand text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-sand" />
          Client Accolades &amp; Global Voices
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-sand leading-tight">
          Treasured Words from Our Esteemed Patrons
        </h2>
        <p className="text-ivory/80 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
          Hover or tap any review to pause that track and read their story, while the other celebrations continue flowing.
        </p>
      </div>

      {/* FULL-WIDTH EDGE-TO-EDGE 3D MARQUEE WALL */}
      <div className="w-full relative h-[560px] sm:h-[720px] lg:h-[780px] overflow-hidden">
        {/* Top & Bottom Gradient Fog Overlays */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-44 bg-gradient-to-b from-emerald via-emerald/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-44 bg-gradient-to-t from-emerald via-emerald/80 to-transparent z-20 pointer-events-none" />

        {/* 3D Tilted Grid Stage */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            perspective: isMobile ? '1000px' : '1400px',
          }}
        >
          <div
            className="w-[102%] -ml-[1%] sm:w-[125%] sm:-ml-[12.5%] h-[125%] -mt-[12%] sm:h-[155%] sm:-mt-[27%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
            style={{
              transform: isMobile
                ? 'rotateX(6deg) rotateZ(-3deg) scale(0.98)'
                : 'rotateX(14deg) rotateZ(-8deg) skewX(4deg) scale(0.96)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Column 1: Moves UPWARDS */}
            <div
              onClick={() => togglePause(1)}
              className={`marquee-col flex flex-col gap-3 sm:gap-6 animate-marquee-up hover:pause-on-hover ${
                pausedCol === 1 ? '[animation-play-state:paused!important]' : ''
              }`}
            >
              {[...column1, ...column1].map((item, i) => renderCard(item, i))}
            </div>

            {/* Column 2: Moves DOWNWARDS */}
            <div
              onClick={() => togglePause(2)}
              className={`marquee-col flex flex-col gap-3 sm:gap-6 animate-marquee-down hover:pause-on-hover ${
                pausedCol === 2 ? '[animation-play-state:paused!important]' : ''
              }`}
            >
              {[...column2, ...column2].map((item, i) => renderCard(item, i))}
            </div>

            {/* Column 3: Moves UPWARDS (Hidden on mobile, visible from tablet up) */}
            <div
              onClick={() => togglePause(3)}
              className={`marquee-col hidden md:flex flex-col gap-4 sm:gap-6 animate-marquee-up-alt hover:pause-on-hover ${
                pausedCol === 3 ? '[animation-play-state:paused!important]' : ''
              }`}
            >
              {[...column3, ...column3].map((item, i) => renderCard(item, i))}
            </div>

            {/* Column 4: Moves DOWNWARDS (Desktop) */}
            <div
              onClick={() => togglePause(4)}
              className={`marquee-col hidden lg:flex flex-col gap-4 sm:gap-6 animate-marquee-down-alt hover:pause-on-hover ${
                pausedCol === 4 ? '[animation-play-state:paused!important]' : ''
              }`}
            >
              {[...column4, ...column4].map((item, i) => renderCard(item, i))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Publication Logos Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-sand/20 flex flex-wrap items-center justify-center gap-6 sm:gap-16 text-sand/60 font-serif text-xs sm:text-sm tracking-widest uppercase relative z-10">
        <span className="hover:text-sand transition-colors">VOGUE WEDDINGS</span>
        <span className="hover:text-sand transition-colors">HARPER’S BAZAAR</span>
        <span className="hover:text-sand transition-colors">TOWN &amp; COUNTRY</span>
        <span className="hover:text-sand transition-colors">ARCHITECTURAL DIGEST</span>
        <span className="hover:text-sand transition-colors">ROBB REPORT</span>
      </div>
    </section>
  );
}

