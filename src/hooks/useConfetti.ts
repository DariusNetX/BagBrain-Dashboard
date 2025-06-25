import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fireConfetti = () => {
    // Golden confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520']
    });
    
    // Secondary burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500']
      });
    }, 200);
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500']
      });
    }, 400);
  };

  return { fireConfetti };
};