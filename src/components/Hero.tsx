'use client';

import { Link as ScrollLink } from 'react-scroll';

export default function Hero() {
  return (
    <section className="bg-[url('/bg-hero.jpg')] bg-cover bg-center text-center py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <img
          src="/urgent-ship-logo.png"
          alt="UrgentShip Logo"
          className="mx-auto h-24 mb-8"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Ultra Fast Delivery for Your Business
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Smart. Scalable. Same-Day Shipping for Critical Packages.
        </p>

        <ScrollLink
          to="features"
          smooth={true}
          duration={500}
          offset={-80} // adjust for fixed nav height
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition cursor-pointer"
        >
          See Features
        </ScrollLink>


        
      </div>
    </section>
  );
}
