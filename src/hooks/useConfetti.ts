import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const fireConfetti = () => {
    console.log('🎉 Firing confetti burst!');
    
    // Create multiple confetti bursts for maximum effect
    const colors = ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'];
    
    // Main burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.7 },
      colors: colors,
      scalar: 1.2
    });
    
    // Left side burst
    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 60,
        spread: 80,
        origin: { x: 0.1, y: 0.8 },
        colors: colors
      });
    }, 150);
    
    // Right side burst  
    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 120,
        spread: 80,
        origin: { x: 0.9, y: 0.8 },
        colors: colors
      });
    }, 300);
    
    console.log('✨ Confetti sequence complete!');
  };

  return { fireConfetti };
};