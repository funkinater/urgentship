'use client';

import { useState } from 'react';
import Modal from '@/components/Modal'; 

interface CallToActionProps {
  onSubmit?: (email: string) => void;
}

export default function CallToAction({ onSubmit }: CallToActionProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch('/api/contact-sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        if (onSubmit) onSubmit(email);
      }
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <section className="bg-blue-700 text-white text-center py-16 rounded-lg shadow-inner space-y-6 px-4">
      <h2 className="text-3xl font-bold">Don&#39;t delay. Contact us today!</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-2 items-center justify-center"
      >
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full sm:w-auto flex-grow px-5 py-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition whitespace-nowrap"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <Modal onClose={() => setSubmitted(false)}>
          <h3 className="text-xl font-bold mb-4">Thank you for your interest!</h3>
          <p className="text-gray-700">
            Someone from our team will be in contact with you soon to see how we can be of assistance.
          </p>
        </Modal>
      )}
    </section>
  );
}