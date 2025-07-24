'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/urgent-ship-logo.png" alt="UrgentShip Logo" className="h-10 w-auto" />
          <span className="text-lg font-bold text-gray-800 hidden sm:inline">UrgentShip</span>
        </Link>
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/track">Tracking</Link>
        </nav>
        <Link
          href="/contact"
          className="ml-4 inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
