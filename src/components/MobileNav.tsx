'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  // { label: 'Contact', href: '/contact' },
  { label: 'Tracking', href: '/track' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        className="md:hidden p-2 text-gray-800"
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 shadow-lg transition-all">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Menu</span>
            <button
              className="p-2"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
