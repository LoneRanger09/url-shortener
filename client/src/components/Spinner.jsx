// client/src/components/Spinner.jsx

import React from 'react';

const Spinner = ({ size }) => {
  const sizeClass = size === 'small' ? 'w-3 h-3 border' : 'w-5 h-5 border-[1.5px]';
  return (
    <div 
      className={`animate-spin border-zinc-200 border-t-purple-600 rounded-none ${sizeClass} mx-auto`} 
      data-testid="spinner"
    ></div>
  );
};

export default Spinner;