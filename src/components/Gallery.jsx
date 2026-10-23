import React, { useState } from 'react';
import { Sparkles, X, MapPin } from 'lucide-react';
import WorksWheel from './ui/works-wheel';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'The Balbiano Vows',
      category: 'Haute Weddings',
      categoryKey: 'weddings',
      location: 'Lake Como, Italy',
      guests: '240 Guests',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      description:
        'A 3-day matrimonial weekend framed by vintage wooden speedboats, 15,000 garden roses, and candlelit waterfront dining beneath a transparent glass pavilion.',
      paletteNotes: 'Warm Sand, Soft Ivory, and Burgundy accents harmonized with historic stone masonry.',
      year: '2025',
    },
    {
      id: 2,
      title: 'The Louvre Midsummer Gala',
      category: 'Executive Galas',
      categoryKey: 'galas',
      location: 'Paris, France',
      guests: '600 Attendees',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      description:
        'Annual heritage conservation charity gala. Featuring bespoke monolithic crystal chandeliers, orchestral staging, and an exclusive banquet menu curated by a 3-Michelin-star chef.',
      paletteNotes: 'Deep Emerald green drapery with polished gold and maroon floral highlights.',
      year: '2025',
    },
    {
      id: 3,
      title: 'Botanical Canopy Pavilion',
      category: 'Floral & Decor',
      categoryKey: 'floral',
      location: 'Kyoto, Japan',
      guests: '120 Guests',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      description:
        'Living ceiling installation incorporating rare Japanese wisteria, hanging orchids, and custom blown-glass ambient pendants suspended above minimalist natural timber tables.',
      paletteNotes: 'Soft ivory florals floating over warm nude tones and emerald foliage.',
      year: '2026',
    },
    {
      id: 4,
      title: 'Saint-Tropez Sunset Soirée',
      category: 'Private Soirées',
      categoryKey: 'soirees',
      location: 'French Riviera',
      guests: '180 Guests',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
      description:
        'Private cliffside estate 40th birthday celebration with floating infinity pool lounge platforms, acoustic sunset session, and midnight pyro-musical display over the Mediterranean.',
      paletteNotes: 'Warm sunset sands transitioning into deep night tones with crimson spotlights.',
      year: '2025',
    },
    {
      id: 5,
      title: 'Château de Chantilly Nuptials',
      category: 'Haute Weddings',
      categoryKey: 'weddings',
      location: 'Chantilly, France',
      guests: '320 Guests',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      description:
        'Baroque castle ceremony with a 60-meter custom mirrored aisle, live harpist ensemble, and a private horse-drawn carriage grand entrance.',
      paletteNotes: 'Pure white floral colonnade with sand silk textiles and maroon velour seating.',
      year: '2024',
    },
    {
      id: 6,
      title: 'The Solstice Brand Summit',
      category: 'Executive Galas',
      categoryKey: 'galas',
      location: 'Geneva, Switzerland',
      guests: '450 Delegates',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      description:
        'High-horology luxury timepiece unveiling event. Holographic stage architecture, curated private lounges, and customized culinary gastronomy.',
      paletteNotes: 'Deep emerald structural surrounds with crisp white light beams.',
      year: '2025',
    },
    {
      id: 7,
      title: 'Orangerie Candlelit Tablescape',
      category: 'Floral & Decor',
      categoryKey: 'floral',
      location: 'Cotswolds, England',
      guests: '90 Guests',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
      description:
        'Custom hand-calligraphed linen menus, heirloom silver tableware, taper candles in hand-carved stone holders, and continuous runner of gardenias and wild foliage.',
      paletteNotes: 'Ivory parchment, warm sand ribbons, and deep emerald greens.',
      year: '2025',
    },
    {
      id: 8,
      title: 'High-Altitude Alpine Chalet Gala',
      category: 'Private Soirées',
      categoryKey: 'soirees',
      location: 'St. Moritz, Switzerland',
      guests: '150 Guests',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      description:
        'Winter wonderland celebration on a private mountain terrace with cashmere fur wraps, outdoor ice bar, fire pits, and Michelin-standard fondue tasting stations.',
      paletteNotes: 'Snow pure white accented with warm sand wood textures and rich maroon blankets.',
      year: '2026',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'weddings', label: 'Haute Weddings' },
    { id: 'galas', label: 'Executive Galas' },
    { id: 'floral', label: 'Floral & Scenography' },
    { id: 'soirees', label: 'Private Soirées' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.categoryKey === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-ivory border-b border-sand/50 relative overflow-hidden">
      
      {/* SECTION HEADER & CATEGORY FILTER BAR */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand/50 border border-sand text-maroon text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-maroon" />
          3D Works Wheel & Visual Archive
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-emerald leading-tight">
          The Gallery of <span className="italic font-normal text-maroon">Masterpieces</span>
        </h2>
        <p className="text-emerald/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Experience our portfolio via the cinematic 3D works wheel. Transform from circular ring perspective to the vertical rotating couture drum using mouse, touch, or arrow keys.
        </p>

        {/* Category Filters */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'bg-maroon text-white border-maroon shadow-md'
                  : 'bg-white text-emerald border-sand hover:bg-sand/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FULL-WIDTH EDGE-TO-EDGE WORKS WHEEL CONTAINER */}
      <div className="w-full relative">
        <WorksWheel
          key={activeCategory} // Reset smooth arrangement on category switch
          items={filteredItems}
          galleryLabel="Curated Works Wheel"
          actionText="View Brief"
          onSelectProject={(project) => setSelectedItem(project)}
        />
      </div>

      {/* Lightbox / Project Brief Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-ivory rounded-3xl border-2 border-sand max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-emerald text-sand flex items-center justify-center hover:bg-maroon transition-colors shadow"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Hero Image */}
            <div className="h-64 sm:h-80 w-full relative shrink-0 bg-emerald">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald/90 via-emerald/30 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sand text-xs font-mono uppercase tracking-widest bg-emerald/80 px-2.5 py-1 rounded border border-sand/40">
                    {selectedItem.location} • {selectedItem.guests}
                  </span>
                  {selectedItem.year && (
                    <span className="text-white/80 text-xs font-mono">
                      Edition {selectedItem.year}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-maroon mb-1">
                  Design Architecture & Scenography Brief
                </h4>
                <p className="text-sm text-emerald/90 leading-relaxed font-sans">
                  {selectedItem.description}
                </p>
              </div>

              {selectedItem.paletteNotes && (
                <div className="bg-white p-4 rounded-xl border border-sand/70 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-emerald">
                    Materiality, Textures & Palette:
                  </span>
                  <p className="text-xs text-emerald/80">{selectedItem.paletteNotes}</p>
                </div>
              )}

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-sand/40">
                <div className="flex items-center gap-1.5 text-xs text-emerald/70">
                  <MapPin className="w-3.5 h-3.5 text-maroon" />
                  <span>Available for custom venue commissions</span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedItem(null)}
                  className="bg-maroon hover:bg-[#521116] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95"
                >
                  Inquire For This Concept
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
