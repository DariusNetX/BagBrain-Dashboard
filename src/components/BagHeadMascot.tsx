import React from 'react';

const BagHeadMascot: React.FC = () => {
  return (
    <div
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
      title="🧠 I have bags for brains"
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