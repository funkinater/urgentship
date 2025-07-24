'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TrackingProgress from '@/components/TrackingProgress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TrackPage() {
  const searchParams = useSearchParams();
  const trackingNumber = searchParams.get('number') || '';
  const zipCode = searchParams.get('zip') || '';

  const [formTracking, setFormTracking] = useState(trackingNumber);
  const [formZip, setFormZip] = useState(zipCode);

  const [data, setData] = useState<{ status: string; statusUpdates: any[] } | null>(null);
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
    window.location.href = `/track?number=${formTracking}&zip=${formZip}`;
  };

  function mapToStep(status: string): string {
  const normalized = status.toLowerCase();

  if (
    normalized.includes('submitted') ||
    normalized.includes('order received') ||
    normalized.includes('received') ||
    normalized.includes('confirmed')
  ) {
    return 'Shipping Information Received';
  }

  if (normalized.includes('possession') || normalized.includes('picked up')) {
    return 'Picked up';
  }

  if (normalized.includes('check') || normalized.includes('scanned at hub')) {
    return 'Checked in';
  }

  if (normalized.includes('out for delivery')) {
    return 'Out for Delivery';
  }

  if (normalized.includes('delivered')) {
    return 'Delivered';
  }

  // fallback
  return 'Shipping Information Received';
}

function getVisualProgressPhase(tracking: { status: string }[]): string {
  const statuses = tracking.map(t => t.status.toLowerCase());

  if (statuses.includes('delivered')) {
    return 'Delivered';
  }

  if (statuses.includes('out_for_delivery')) {
    return 'Out for Delivery';
  }

  if (statuses.includes('possession') || statuses.includes('confirmed')) {
    return 'Picked up';
  }

  if (statuses.length > 0) {
    return 'Shipping Information Received';
  }

  return 'Shipping Information Received'; // fallback
}



  return (
    <>
    <Navbar />
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Track Your Delivery</h1>

        {/* Form if no params */}
        {!trackingNumber || !zipCode ? (
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
        ) : null}

        {/* Loading or Error */}
        {loading && <p>Loading...</p>}
        {notFound && <p className="text-red-500">Tracking info not found.</p>}

        {/* Success: render progress */}
        {data && (
          <>
            <TrackingProgress currentStatus={getVisualProgressPhase(data.statusUpdates)} />
            <div className="mt-12">
              <h2 className="text-lg font-bold mb-4">Status Updates</h2>
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.statusUpdates.map((update, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 px-4">{new Date(update.status_time).toLocaleString()}</td>
                      <td className="py-2 px-4">{update.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}