'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 text-center text-sm text-gray-600 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} UrgentShip Delivery. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
