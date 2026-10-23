import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import CtaSection from './components/CtaSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [selectedService, setSelectedService] = useState('');

  return (
    <div className="min-h-screen bg-ivory font-sans text-emerald selection:bg-maroon selection:text-white flex flex-col">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Home / Hero */}
        <Hero />

        {/* 2. About Us */}
        <About />

        {/* 3. Services */}
        <Services onSelectService={(service) => setSelectedService(service)} />

        {/* 4. Gallery */}
        <Gallery />

        {/* Prestige & Testimonials */}
        <Testimonials />

        {/* Living Gradients in Motion CTA Section */}
        <CtaSection />

        {/* 5. Contact Us */}
        <Contact preselectedService={selectedService} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
