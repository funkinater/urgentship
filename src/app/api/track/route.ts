import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { trackingNumber, zipCode } = await request.json();

  if (!trackingNumber || !zipCode) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const trackingRes = await fetch(`${process.env.TRACKING_URL!}/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.TRACKING_API_KEY!,
      }
    });

    if (!trackingRes.ok) {
      const errorText = await trackingRes.text();
      console.error('Tracking API error:', errorText);
      return NextResponse.json({ error: 'Tracking service failed' }, { status: trackingRes.status });
    }

    const result = await trackingRes.json();

    if (zipCode !== result.destination?.zip?.trim().substring(0, 5)) {
      return NextResponse.json({ error: 'Zip code does not match recipient' }, { status: 401 });
    }

    const lastEvent = result.events?.[result.events.length - 1];
    const baseUrl = new URL(process.env.TRACKING_URL!).origin;

    return NextResponse.json({
      status: lastEvent?.status ?? '',
      statusUpdates: (result.events ?? []).map((e: { status: string; description: string; timestamp: string }) => ({
        status: e.status,
        comment: e.description,
        status_time: e.timestamp,
      })),
      deliveryDetails: result.pod ? {
        pod_name: result.pod.name,
        image: `${baseUrl}${result.pod.image}`,
        lat: null,
        lng: null,
      } : {},
      recipient: result.destination ? {
        name: result.destination.name,
        address_one: result.destination.address_one,
        address_two: result.destination.address_two ?? '',
        city: result.destination.city,
        state: result.destination.state,
        zip: result.destination.zip,
        phone: result.destination.phone ?? '',
        email: result.destination.email ?? '',
        note: result.destination.note ?? '',
        contact: '',
        reference: '',
      } : {},
      reference: result.reference ?? null,
    });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
