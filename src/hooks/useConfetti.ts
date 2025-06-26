import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const playCelebrationAudio = async () => {
    try {
      console.log('🔊 Attempting to play celebration audio...');
      
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.log('Web Audio API not supported - using vibration fallback');
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200, 100, 300]);
        }
        return;
      }
      
      const audioContext = new AudioContextClass();
      console.log('Initial audio context state:', audioContext.state);
      
      // Force resume audio context for browsers that suspend it
      if (audioContext.state !== 'running') {
        try {
          await audioContext.resume();
          console.log('Audio context resumed, new state:', audioContext.state);
        } catch (resumeError) {
          console.log('Failed to resume audio context:', resumeError);
        }
      }
      
      // Only proceed if audio context is running
      if (audioContext.state !== 'running') {
        console.log('Audio context not running, using vibration fallback');
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200, 100, 300]);
        }
        return;
      }
      
      const createTone = (frequency: number, duration: number, startTime: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
        
        console.log(`🎵 Tone created: ${frequency}Hz at ${startTime}`);
      };
      
      // Create celebration chord sequence
      const now = audioContext.currentTime;
      createTone(523.25, 0.4, now + 0.1);    // C5
      createTone(659.25, 0.4, now + 0.3);    // E5  
      createTone(783.99, 0.4, now + 0.5);    // G5
      createTone(1046.50, 0.6, now + 0.7);   // C6
      
      console.log('🎉 Audio celebration sequence started successfully!');
      
    } catch (error) {
      console.log('Audio celebration error:', error);
      
      // Enhanced vibration fallback
      if (navigator.vibrate) {
        try {
          navigator.vibrate([200, 100, 200, 100, 300]);
          console.log('✨ Vibration celebration activated');
        } catch (vibrateError) {
          console.log('Vibration also failed:', vibrateError);
        }
      }
    }
  };

  const fireConfetti = async () => {
    console.log('🎉 Starting celebration sequence with confetti and audio!');
    
    // Check if confetti is available
    if (typeof confetti !== 'function') {
      console.error('Confetti library not loaded');
      return;
    }
    
    const colors = ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'];
    
    try {
      // Trigger audio celebration with slight delay to ensure confetti starts first
      setTimeout(() => {
        playCelebrationAudio();
      }, 50);
      
      // Main confetti burst
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
      
      console.log('✨ Complete celebration sequence launched!');
    } catch (error) {
      console.error('Celebration error:', error);
    }
  };

  return { fireConfetti };
};