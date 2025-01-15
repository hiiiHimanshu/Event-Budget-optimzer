import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-scale-in ${className}`}>
      {children}
    </div>
  );
}