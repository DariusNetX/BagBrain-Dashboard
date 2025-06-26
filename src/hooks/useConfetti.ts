import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const playCelebrationAudio = async () => {
    try {
      console.log('Attempting to play celebration audio...');
      
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.log('Web Audio API not supported');
        return;
      }
      
      const audioContext = new AudioContextClass();
      
      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
        console.log('Audio context resumed from suspended state');
      }
      
      console.log('Audio context state:', audioContext.state);
      
      const createTone = (frequency: number, duration: number, startTime: number) => {
        try {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, startTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0, startTime);
          gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          
          oscillator.start(startTime);
          oscillator.stop(startTime + duration);
          
          console.log(`Tone scheduled: ${frequency}Hz at ${startTime}`);
        } catch (toneError) {
          console.log('Tone creation failed:', toneError);
        }
      };
      
      // Schedule celebration sequence with proper timing
      const now = audioContext.currentTime;
      createTone(523.25, 0.3, now + 0.1);    // C5
      createTone(659.25, 0.3, now + 0.25);   // E5  
      createTone(783.99, 0.3, now + 0.4);    // G5
      createTone(1046.50, 0.5, now + 0.55);  // C6
      
      console.log('Audio celebration sequence scheduled successfully');
      
    } catch (error) {
      console.log('Audio celebration failed:', error);
      
      // Fallback vibration
      if (navigator.vibrate) {
        try {
          navigator.vibrate([100, 50, 100, 50, 200]);
          console.log('Fallback vibration activated');
        } catch (vibrateError) {
          console.log('Vibration fallback also failed:', vibrateError);
        }
      }
    }
  };

  const fireConfetti = async () => {
    console.log('🎉 Firing confetti burst with audio!');
    
    // Check if confetti is available
    if (typeof confetti !== 'function') {
      console.error('Confetti library not loaded');
      return;
    }
    
    const colors = ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'];
    
    try {
      // Trigger audio celebration immediately
      playCelebrationAudio();
      
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