'use client';

import Link from 'next/link';
import MobileNav from './MobileNav';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
    {/* Logo */}
    <Link href="/" className="flex items-center space-x-2">
      <img
        src="/urgent-ship-logo.png"
        alt="UrgentShip Logo"
        className="h-10 w-auto"
      />
      <span className="text-lg font-bold text-gray-800 hidden sm:inline">
        UrgentShip
      </span>
    </Link>

    {/* Desktop Nav */}
    <nav className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/track">Tracking</Link>
    </nav>

    {/* Right Side Buttons */}
    <div className="flex items-center space-x-4">
      <Link
        href="https://my.urgentship.com"
        className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
      >
        MyUrgentShip Login
      </Link>

      {/* Mobile Nav Trigger */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  </div>
</header>

  );
}
