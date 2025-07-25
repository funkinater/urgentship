// app/track/page.tsx
import { Suspense } from 'react';
import TrackPageClient from './TrackPageClient';

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen px-4 py-12">Loading...</div>}>
      <TrackPageClient />
    </Suspense>
  );
}
