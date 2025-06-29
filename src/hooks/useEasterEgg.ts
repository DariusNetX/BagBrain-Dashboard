import { useState, useCallback } from 'react';

interface EasterEggState {
  isActive: boolean;
  clickCount: number;
  message: string;
}

export const useEasterEgg = (requiredClicks: number = 3, resetTime: number = 2000) => {
  const [easterEgg, setEasterEgg] = useState<EasterEggState>({
    isActive: false,
    clickCount: 0,
    message: ''
  });
  const [lastClickTime, setLastClickTime] = useState(0);

  const easterEggMessages = [
    "🎉 You found the secret! BagBrain acknowledges your persistence!",
    "🚀 Multi-click master! Your dedication to clicking is unmatched!",
    "💎 You've awakened the hidden BagBrain powers! Legendary status achieved!",
    "🧠 Big brain discovery! You unlocked the secret wisdom of the bags!",
    "⚡ Lightning reflexes! The vault recognizes your superior clicking technique!",
    "🏆 Click champion detected! Your finger game is absolutely elite!",
    "🌟 Secret agent status: ACTIVATED! You've mastered the art of the click!",
    "🎯 Precision clicking! You've discovered the hidden BagBrain easter egg!"
  ];

  const triggerClick = useCallback(() => {
    const now = Date.now();
    
    // Reset count if too much time has passed
    if (now - lastClickTime > resetTime) {
      setEasterEgg(prev => ({ ...prev, clickCount: 1 }));
    } else {
      setEasterEgg(prev => ({ ...prev, clickCount: prev.clickCount + 1 }));
    }
    
    setLastClickTime(now);
    
    // Check if we've reached the required clicks
    if (easterEgg.clickCount + 1 >= requiredClicks) {
      const randomMessage = easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)];
      setEasterEgg({
        isActive: true,
        clickCount: 0,
        message: randomMessage
      });
      
      // Auto-reset after 3 seconds
      setTimeout(() => {
        setEasterEgg(prev => ({ ...prev, isActive: false, message: '' }));
      }, 3000);
    }
  }, [easterEgg.clickCount, lastClickTime, requiredClicks, resetTime]);

  const reset = useCallback(() => {
    setEasterEgg({ isActive: false, clickCount: 0, message: '' });
  }, []);

  return {
    isActive: easterEgg.isActive,
    clickCount: easterEgg.clickCount,
    message: easterEgg.message,
    triggerClick,
    reset
  };
};