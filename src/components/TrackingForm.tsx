'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackingForm() {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber && zipCode) {
      router.push(`/track?number=${encodeURIComponent(trackingNumber)}&zip=${encodeURIComponent(zipCode)}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-300 via-blue-300 to-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
          Waiting for a delivery? <span className="text-blue-800">Track it here.</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 items-stretch justify-center"
        >
          <input
            type="text"
            placeholder="Tracking Number"
            className="flex-grow bg-white px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="ZIP Code"
            className="md:w-32 bg-white px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition whitespace-nowrap"
          >
            Track Your Delivery
          </button>
        </form>
      </div>
    </section>
  );
}
