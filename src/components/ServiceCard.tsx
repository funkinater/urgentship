'use client';

import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  href?: string;
  className?: string;
  children: ReactNode;
}

export default function ServiceCard({
  icon,
  href,
  className = '',
  children,
}: ServiceCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border hover:shadow-md transition p-8 text-center flex flex-col items-center ${className}`}
    >
      <div className="text-blue-600 text-5xl mb-4">{icon}</div>
      <div className="flex-grow">{children}</div>
      {href && (
        <a href={href} className="mt-6 text-blue-600 text-sm font-medium inline-flex items-center hover:underline">
          Learn More <span className="ml-1">→</span>
        </a>
      )}
    </div>
  );
}
