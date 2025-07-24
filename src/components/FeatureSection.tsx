'use client';

import { FaMapMarkedAlt, FaLock, FaClock, FaRoute } from 'react-icons/fa';
import AnimatedOnScroll from '@/components/AnimatedOnScroll';

const features = [
  {
    title: 'Nationwide Reach',
    desc: 'We deliver to all major regions with unmatched speed and accuracy.',
    icon: <FaMapMarkedAlt size={24} className="text-blue-500" />,
  },
  {
    title: 'Live Order Tracking',
    desc: 'Customers stay informed with real-time updates.',
    icon: <FaRoute size={24} className="text-blue-500" />,
  },
  {
    title: 'Secure Handling',
    desc: 'Every package is protected using smart safeguards and audit controls.',
    icon: <FaLock size={24} className="text-blue-500" />,
  },
  {
    title: 'Priority Support',
    desc: 'Our operations team monitors and escalates time-critical orders 24/7.',
    icon: <FaClock size={24} className="text-blue-500" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-gray-50 py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          Why Choose <span className="text-blue-600">UrgentShip</span>
        </h2>

        <div className="space-y-8">
          {features.map((feature, i) => (
            <AnimatedOnScroll key={i} delay={i * 0.1}>
              <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-3 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {feature.icon}
                    <span>{feature.title}</span>
                  </div>
                  <div className="mt-3 md:mt-0 text-gray-500 md:max-w-xl md:text-right text-sm">
                    {feature.desc}
                  </div>
                </div>
              </div>
            </AnimatedOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
