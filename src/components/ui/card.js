import React from 'react';

export const Card = ({ children, className, style, onMouseEnter, onMouseLeave }) => (
  <div 
    className={`bg-white shadow-md rounded-lg ${className}`} 
    style={style} 
    onMouseEnter={onMouseEnter} 
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`border-b-2 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>
);
