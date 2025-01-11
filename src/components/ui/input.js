import React from 'react';

export const Input = ({ type, placeholder, value, onChange }) => (
  <input 
    type={type} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
    className="p-2 border rounded w-full"
  />
);
