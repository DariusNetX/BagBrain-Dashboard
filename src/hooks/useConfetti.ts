import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fireConfetti = () => {
    console.log('Firing confetti!'); // Debug log
    
    try {
      // Golden confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520']
      });
      
      console.log('Confetti fired successfully');
    } catch (error) {
      console.error('Confetti error:', error);
    }
  };

  return { fireConfetti };
};