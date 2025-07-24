'use client';

const features = [
  {
    title: 'Nationwide Reach',
    desc: 'We deliver to all major regions with unmatched speed and accuracy.',
  },
  {
    title: 'Live Order Tracking',
    desc: 'Customers stay informed with real-time updates (coming soon).',
  },
  {
    title: 'Secure Handling',
    desc: 'We protect every shipment with smart safeguards and logistics.',
  },
  {
    title: 'Priority Support',
    desc: 'Our team is available to handle urgent needs 24/7.',
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose UrgentShip?</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feat) => (
            <div key={feat.title} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-gray-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
