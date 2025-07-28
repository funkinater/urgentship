'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TrackingProgress from '@/components/TrackingProgress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

interface StatusUpdate {
  status: string;
  comment: string;
  status_time: Date;
}

interface DeliveryDetails {
  pod_name: string;
  image: string;
  lat: number;
  lng: number;
}

export default function TrackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackingNumber = searchParams.get('number') || '';
  const zipCode = searchParams.get('zip') || '';

  const [formTracking, setFormTracking] = useState(trackingNumber);
  const [formZip, setFormZip] = useState(zipCode);

  const [data, setData] = useState<{ status: string; statusUpdates: StatusUpdate[], deliveryDetails: DeliveryDetails } | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTracking = async () => {
      if (!trackingNumber || !zipCode) return;

      setLoading(true);
      try {
        const res = await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackingNumber, zipCode }),
        });

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const result = await res.json();
        setData({
          status: result.status,
          statusUpdates: result.statusUpdates || [],
          deliveryDetails: result.deliveryDetails || null
        });
        
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [trackingNumber, zipCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTracking || !formZip) return;
    // window.location.href = `/track?number=${formTracking}&zip=${formZip}`;
    router.push(`/track?number=${formTracking}&zip=${formZip}`);
  };

  function FormattedDate({ date }: { date: string | Date }) {
  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    setFormatted(new Date(date).toLocaleString());
  }, [date]);

  return <>{formatted}</>;
}

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Track Your Delivery</h1>

           <form onSubmit={handleSubmit} className="mb-10 flex flex-col sm:flex-row gap-4 max-w-xl">
              <input
                type="text"
                placeholder="Tracking Number"
                className="flex-grow px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formTracking}
                onChange={(e) => setFormTracking(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="w-32 px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formZip}
                onChange={(e) => setFormZip(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition whitespace-nowrap"
              >
                Track
              </button>
            </form>

          {loading && <p>Loading...</p>}
          {notFound && <p className="text-red-500">Tracking info not found.</p>}

          {data && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700">Tracking Number:</h2>
                <p className="text-xl font-bold text-blue-700 tracking-wider">{trackingNumber}</p>
              </div>

              <TrackingProgress currentStatus={(data.status)} />

              {data.deliveryDetails && (
                
              )};

              <div className="mt-12 mx-auto">
                <h2 className="text-lg font-bold mb-4">Status Updates</h2>
                
                  <div className="max-w-3xl mx-auto mt-8">
                    <table className="w-full text-sm text-left border-collapse border-blue-400 border-2">
                      <thead className="bg-blue-50 text-blue-800 uppercase text-xs font-semibold">
                        <tr>
                          <th className="px-3 py-2 border-b w-52 whitespace-nowrap">Date</th>
                          <th className="px-3 py-2 border-b">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.statusUpdates.map((update, idx) => (
                          <tr key={idx} className="hover:bg-blue-50">
                            <td className="px-3 py-2 border-b text-gray-700 whitespace-nowrap">
                                <FormattedDate date={update.status_time} />
                            </td>
                            <td className="px-3 py-2 border-b text-gray-900">
                              {update.comment}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
