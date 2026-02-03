import React from 'react';

export const MainBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(135deg, #94a3b8 12%, transparent 12.5%, transparent 87%, #94a3b8 87.5%, #94a3b8),
            linear-gradient(135deg, #94a3b8 12%, transparent 12.5%, transparent 87%, #94a3b8 87.5%, #94a3b8)
          `,
          backgroundSize: '120px 120px',
          backgroundPosition: '0 0, 60px 60px',
          maskImage: 'linear-gradient(to bottom right, black 20%, transparent 80%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom right, black 20%, transparent 80%, black 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 100px, #64748b 100px, #64748b 101px)',
        }}
      />
    </div>
  );
};