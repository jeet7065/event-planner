import React, { useState } from 'react';
import { Sparkles, Send, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Contact({ preselectedService }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '100 - 250 Guests',
    budgetRange: '$100,000 - $250,000',
    vision: '',
  });

  const currentEventType = formData.eventType || preselectedService || 'Haute Couture Weddings';
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state displayed
    }, 4000);
  };

  const faqs = [
    {
      q: 'How far in advance should we secure our celebration date?',
      a: 'Due to our strict bespoke policy of accepting only 15 premier commissions annually, we advise reaching out 9 to 18 months prior to your target date, especially for European destinations.',
    },
    {
      q: 'Do you manage destination events across international borders?',
      a: 'Yes. Over 60% of our productions take place across international borders. We maintain active production partners and customs logistics across France, Italy, the UK, Japan, UAE, and the Caribbean.',
    },
    {
      q: 'Can our inquiry remain strictly confidential under NDA?',
      a: 'Always. We regularly work with high-profile families, royal patrons, and corporate leadership with strict Non-Disclosure Agreements and discreet privacy controls.',
    },
    {
      q: 'What is included in the initial discovery consultation?',
      a: 'Our initial 45-minute consultation with Helena Vance and a Senior Producer reviews your venue preferences, spatial inspiration, logistical timeline, and provides a ballpark feasibility assessment.',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-purewhite border-b border-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/50 border border-sand text-maroon text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-maroon" />
            Initiate Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-emerald leading-tight">
            Reserve Your Date & <br className="hidden sm:inline" />
            <span className="italic font-normal text-maroon">Private Discovery</span>
          </h2>
          <p className="text-emerald/80 text-sm sm:text-base leading-relaxed">
            Every grand journey begins with a conversation. Share your preliminary vision below and our executive team will reply within 24 hours.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Atelier Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-ivory p-8 rounded-3xl border-2 border-sand/70 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-emerald">The Ateliers</h3>
              <p className="text-xs sm:text-sm text-emerald/80 leading-relaxed">
                We welcome clients by appointment only at our design studios in Paris and Manhattan, or via private video conciergerie.
              </p>

              {/* Locations */}
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald text-sand flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-sand" />
                  </div>
                  <div>
                    <strong className="text-emerald text-sm block font-serif">Paris Flagship Atelier</strong>
                    <span className="text-emerald/70">18 Place Vendôme, 75001 Paris, France</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald text-sand flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-sand" />
                  </div>
                  <div>
                    <strong className="text-emerald text-sm block font-serif">New York Salon</strong>
                    <span className="text-emerald/70">650 Madison Avenue, New York, NY 10022</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald text-sand flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-sand" />
                  </div>
                  <div>
                    <strong className="text-emerald text-sm block font-serif">Concierge Direct</strong>
                    <span className="text-emerald/70">+1 (800) 555-0199 / +33 1 42 68 55 00</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald text-sand flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-sand" />
                  </div>
                  <div>
                    <strong className="text-emerald text-sm block font-serif">Private Inquiries</strong>
                    <span className="text-emerald/70">concierge@veloreandco.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald text-sand flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-sand" />
                  </div>
                  <div>
                    <strong className="text-emerald text-sm block font-serif">Studio Hours</strong>
                    <span className="text-emerald/70">Monday – Saturday: 9:00 AM – 7:00 PM CET</span>
                  </div>
                </div>
              </div>

              {/* Discreet Guarantee */}
              <div className="pt-4 border-t border-sand/50 flex items-center gap-3 text-xs text-maroon font-semibold">
                <ShieldCheck className="w-5 h-5 text-maroon shrink-0" />
                <span>NDA & Client Privacy Strictly Observed</span>
              </div>
            </div>

            {/* Quick FAQ Dropdowns */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-emerald">Frequently Asked Inquiries</h4>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border-2 border-sand/60 rounded-2xl bg-white overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-emerald hover:text-maroon transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-maroon transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-emerald/80 leading-relaxed border-t border-sand/30 pt-2 bg-ivory">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-ivory p-8 sm:p-10 rounded-3xl border-2 border-sand shadow-lg">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald text-sand flex items-center justify-center mx-auto border-2 border-sand shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-sand" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-emerald">Inquiry Received with Distinction</h3>
                  <p className="text-xs sm:text-sm text-emerald/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-emerald">{formData.fullName || 'esteemed guest'}</strong>. Our Lead Producer is reviewing your brief and will contact you via {formData.email || 'your email'} within 24 hours to schedule your discovery call.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-maroon text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-emerald">The Discovery Brief</h3>
                    <p className="text-xs text-emerald/70 mt-1">Please provide initial details regarding your celebration.</p>
                  </div>

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-emerald mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-emerald/30 bg-white text-emerald text-xs focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-emerald mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. eleanor@vance-holdings.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-emerald/30 bg-white text-emerald text-xs focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone and Event Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-emerald mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-emerald/30 bg-white text-emerald text-xs focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-emerald mb-1.5">
                        Celebration Scope
                      </label>
                      <select
                        value={currentEventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-emerald/30 bg-white text-emerald text-xs focus:outline-none focus:border-maroon"
                      >
                        <option value="Haute Couture Weddings">Haute Couture Weddings</option>
                        <option value="Corporate Galas & Brand Summits">Corporate Galas & Brand Summits</option>
                        <option value="Private Estate & Milestone Soirées">Private Estate & Milestone Soirées</option>
                        <option value="Floral Scenography & Spatial Fabrication">Floral Scenography & Fabrication</option>
                        <option value="Destination Weekend Experiences">Destination Weekend Experiences</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Target Date and Guest Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-emerald mb-1.5">
                        Target Date or Season
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. September 2026 / Spring 2027"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-emerald/30 bg-white text-emerald text-xs focus:outline-none focus:border-maroon"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-emerald mb-1.5">
                        Estimated Guest Count
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-emerald/30 bg-white text-emerald text-xs focus:outline-none focus:border-maroon"
                      >
                        <option value="Intimate (< 50 Guests)">Intimate (&lt; 50 Guests)</option>
                        <option value="50 - 150 Guests">50 - 150 Guests</option>
                        <option value="150 - 350 Guests">150 - 350 Guests</option>
                        <option value="Grand Gala (350+ Guests)">Grand Gala (350+ Guests)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Budget Range */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-emerald mb-1.5">
                      Anticipated Production Budget
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-emerald/30 bg-white text-emerald text-xs focus:outline-none focus:border-maroon"
                    >
                      <option value="$50,000 - $100,000">$50,000 – $100,000 USD</option>
                      <option value="$100,000 - $250,000">$100,000 – $250,000 USD</option>
                      <option value="$250,000 - $500,000">$250,000 – $500,000 USD</option>
                      <option value="$500,000+ Premier Production">$500,000+ USD Premier Commission</option>
                    </select>
                  </div>

                  {/* Row 5: Vision Note */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-emerald mb-1.5">
                      Your Vision, Destination Preferences & Aesthetic
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Share details regarding your preferred venue style (château, beachfront, palazzo, penthouse), color moods, floral dreams, or multi-day itinerary..."
                      value={formData.vision}
                      onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-emerald/30 bg-white text-emerald text-xs focus:outline-none focus:border-maroon"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-maroon hover:bg-[#521116] text-white py-4 rounded-full font-serif text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2 border border-maroon"
                  >
                    <span>Submit Confidential Inquiry</span>
                    <Send className="w-4 h-4 text-sand" />
                  </button>

                  <p className="text-[11px] text-center text-emerald/60">
                    We honor your time and absolute privacy. You will never receive automated newsletters from this inquiry.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
