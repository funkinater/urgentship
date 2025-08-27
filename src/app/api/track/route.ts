import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { trackingNumber, zipCode } = await request.json();

  if (!trackingNumber || !zipCode) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const azureRes = await fetch(`${process.env.TRACKING_URL!}/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.TRACKING_API_KEY!,
      }
    });

    if (!azureRes.ok) {
      const errorText = await azureRes.text();
      console.error('Azure error:', errorText);
      return NextResponse.json({ error: 'Azure Function failed' }, { status: azureRes.status });
    }

    const result = await azureRes.json();

    if(zipCode != result.recipient.zip?.trim().substring(0, 5)) {
      return NextResponse.json({ error: 'Zip code does not match recipient'}, { status: 401 });
    }

    return NextResponse.json({
      status: result.tracking[result.tracking.length - 1].status,
      statusUpdates: result.tracking || [],
      deliveryDetails: result.delivery || {},
      recipient: result.recipient || {}
    });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
