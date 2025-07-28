// app/api/contact-sales/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { EmailClient } from '@azure/communication-email';

const emailClient = new EmailClient(process.env.AZURE_EMAIL_CONNECTION_STRING!);
const sender = process.env.AZURE_EMAIL_SENDER!;
const logoUrl = process.env.URGENTSHIP_LOGO_URL! || 'https://www.urgentship.com/logo.png';

async function getGeoInfo(ip: string) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json`);
    const jsonResponse = await res.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';
    const geo = await getGeoInfo(ip);
    const location = geo ? `${geo.city}, ${geo.region}, ${geo.country_name}` : 'Unknown location';
    const timestamp = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(new Date());

    // 1. Notify sales
    await emailClient.beginSend({
      senderAddress: sender,
      recipients: {
        to: [{ address: 'support@urgentship.com' }],
      },
      content: {
        subject: `New Contact Request from ${email}`,
        plainText: [
          `New inquiry from website contact form:`,
          `Email: ${email}`,
          `IP: ${ip}`,
          `Location: ${location}`,
          `Received: ${timestamp}`,
        ].join('\n'),
      },
    });

    // 2. Confirm to user
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <img
          src="${logoUrl}"
          alt="UrgentShip Logo"
          style="max-width: 200px; height: auto; display: block; margin: 0 auto 20px auto;"
        />
        <h2 style="color: #222;">Thank you for reaching out!</h2>
        <p>We’ve received your request and someone from our team will be in touch shortly to assist you.</p>
        <p style="margin-top: 30px;">– The UrgentShip Team</p>
      </div>
    `;

    const subject = `We’ve received your request – UrgentShip`;

    await emailClient.beginSend({
      senderAddress: sender,
      recipients: {
        to: [{ address: email }],
      },
      content: {
        subject,
        html,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
