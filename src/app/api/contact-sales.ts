import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const zendeskSubdomain = process.env.ZENDESK_SUBDOMAIN!;
  const zendeskToken = process.env.ZENDESK_API_TOKEN!;
  const zendeskEmail = process.env.ZENDESK_EMAIL!;

  const auth = Buffer.from(`${zendeskEmail}/token:${zendeskToken}`).toString('base64');

  const payload = {
    ticket: {
      subject: `Sales Inquiry from ${email}`,
      requester: { name: email, email },
      comment: {
        body: `A user submitted their email through the website CTA: ${email}`,
      },
      tags: ['website', 'sales', 'lead'],
      priority: 'normal',
    },
  };

  try {
    const zendeskRes = await fetch(`https://${zendeskSubdomain}.zendesk.com/api/v2/tickets.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!zendeskRes.ok) {
      const error = await zendeskRes.text();
      return res.status(500).json({ error: 'Zendesk error', details: error });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err });
  }
}
