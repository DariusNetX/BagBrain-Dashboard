import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fireConfetti = async () => {
    console.log('🎉 Firing confetti burst!');
    
    // Check if confetti is available
    if (typeof confetti !== 'function') {
      console.error('Confetti library not loaded');
      return;
    }
    
    const colors = ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'];
    
    try {
      // Use imported confetti directly
      
      // Main burst
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: colors,
        scalar: 1.5,
        gravity: 1,
        drift: 0
      });
      
      // Left side burst
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 100,
          origin: { x: 0, y: 0.7 },
          colors: colors,
          scalar: 1.2
        });
      }, 200);
      
      // Right side burst  
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 100,
          origin: { x: 1, y: 0.7 },
          colors: colors,
          scalar: 1.2
        });
      }, 400);
      
      console.log('Confetti sequence complete!');
    } catch (error) {
      console.error('Confetti error:', error);
    }
  };

  return { fireConfetti };
};