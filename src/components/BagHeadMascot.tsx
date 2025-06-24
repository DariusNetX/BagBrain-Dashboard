import React from 'react';

const BagHeadMascot: React.FC = () => {
  return (
    <div
      data-tooltip-id="bagheadTip"
      data-tooltip-content="👑 The Vault Guardian. Don't tap the bag unless you're ready."
      style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 50,
        width: '80px',
        height: '80px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
    >
      <img
        src="/baghead-mascot.png"
        alt="BagHead Mascot"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default BagHeadMascot;