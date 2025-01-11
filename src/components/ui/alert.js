import React from 'react';

export const Alert = ({ children, className }) => (
  <div className={`bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 ${className}`}>
    {children}
  </div>
);

export const AlertDescription = ({ children }) => (
  <div className="text-sm">
    {children}
  </div>
);
