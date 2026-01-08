import React from 'react';

const Gallery = () => {
  // Create an array of 10 items for placeholders
  const placeholders = Array.from({ length: 10 });

  return (
    <div className="space-y-[65px]">
      {placeholders.map((_, index) => (
        <div 
          key={index}
          className="w-full aspect-[1100/700] border border-border bg-muted/5 flex items-center justify-center text-muted text-sm rounded-[8px]"
        >
          Design Shot {index + 1} (1100x700)
        </div>
      ))}
    </div>
  );
};

export default Gallery;
