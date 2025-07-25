'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-24">
          <section className="text-center space-y-8">
            <h1 className="text-4xl font-bold text-blue-700">We&#39;re the Experts Behind Every On-Time Arrival</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <strong>Seconds count. Minutes matter.</strong> At UrgentShip, we understand that in the
              world of critical deliveries, there is no room for delay. Whether you&#39;re sending
              time-sensitive medical supplies or fulfilling an urgent e-commerce order, we treat every
              package with the urgency it deserves.
            </p>
          </section>

          <section className="text-center space-y-8">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              With <strong>over two decades of experience</strong> in pharmaceutical and e-commerce
              shipping, our team brings deep expertise, precision, and care to every delivery. We&#39;ve built
              our reputation on trust, reliability, and a relentless commitment to getting it right — the
              first time, every time.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-14 text-left">
            <div className="bg-white shadow-md rounded-lg p-10 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-800">E-Commerce Solutions</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Next-day and two-day residential deliveries</li>
                <li>Final-mile fulfillment optimized for speed and reliability</li>
                <li>Seamless integration with your order management system</li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-10 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-800">Pharma & Medical Logistics</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Same-day STAT deliveries for hospitals, clinics, and labs</li>
                <li>“Hotshot” service options (1-hour, 2-hour, 4-hour windows)</li>
                <li>Secure, temperature-sensitive handling when it matters most</li>
              </ul>
            </div>
          </section>

          <section className="space-y-16">
            <h2 className="text-3xl font-bold text-blue-700 text-center">Why UrgentShip?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'On-Time. Every Time.',
                  desc: 'Precision logistics with real-time tracking and proactive communication.',
                },
                {
                  title: 'White-Glove Treatment.',
                  desc: 'From pickup to final delivery, we go the extra mile for your customers.',
                },
                {
                  title: 'People Who Get It.',
                  desc: 'Veteran support teams who understand high-stakes delivery environments.',
                },
                {
                  title: 'Scalable & Adaptable.',
                  desc: 'Whether 10 packages or 10,000, we flex to meet your needs.',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-md space-y-2">
                  <h3 className="text-xl font-semibold text-blue-800">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center pt-12 space-y-6">
            <p className="text-lg font-semibold text-gray-800">
              At UrgentShip, your delivery isn&#39;t just another package — it&#39;s a promise.
            </p>
            <p className="text-blue-700 text-2xl font-bold">
              And we deliver on that promise — fast, secure, and always on time.
            </p>
          </section>

          {/* Call to Action */}
          <CallToAction />
        </div>
      </main>

      <Footer />
    </>
  );
}
