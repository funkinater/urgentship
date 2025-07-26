import ServiceCard from '@/components/ServiceCard';
import { FaTruck, FaBoxOpen, FaUserClock } from 'react-icons/fa'; // example icons

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[url('/bg-hero.jpg')] bg-cover px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Delivery Services</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <ServiceCard icon={<FaTruck />} href="/services/sameday">
          <h3 className="text-xl font-semibold mb-2">Sameday</h3>
          <p className="text-gray-600 text-sm">
            On-demand, Messenger, Milk-run, Scheduled Sameday Services
          </p>
        </ServiceCard>

        <ServiceCard icon={<FaBoxOpen />} href="/services/nextday">
          <h3 className="text-xl font-semibold mb-2">Nextday</h3>
          <p className="text-gray-600 text-sm">
            Distribution, Routed, Scheduled, B2C, B2B, Ecomm
          </p>
        </ServiceCard>

        <ServiceCard icon={<FaUserClock />} href="/services/2-4day">
          <h3 className="text-xl font-semibold mb-2">2–4 Day</h3>
          <p className="text-gray-600 text-sm">
            Zones 1–8, Air Freight, DDU Delivery Services
          </p>
        </ServiceCard>
      </div>
    </section>
  );
}
