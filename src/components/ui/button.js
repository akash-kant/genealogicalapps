import React from 'react';

export const Button = ({ children, onClick, variant, size, className }) => (
  <button 
    className={`px-4 py-2 rounded ${variant === 'outline' ? 'border' : 'bg-blue-500 text-white'} ${size === 'sm' ? 'text-sm' : 'text-lg'} ${className}`} 
    onClick={onClick}
  >
    {children}
  </button>
);
