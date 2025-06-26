import { useState, useEffect } from 'react';

interface Meme {
  id: string;
  text: string;
  emoji: string;
  position: 'top' | 'bottom' | 'center';
  animation: 'bounce' | 'pulse' | 'float' | 'shake';
}

const bagBrainMemes: Meme[] = [
  {
    id: 'diamond-hands',
    text: "When you HODL $BAG through -90% 💎🙌",
    emoji: "💎",
    position: 'top',
    animation: 'bounce'
  },
  {
    id: 'brain-smooth',
    text: "My brain is so smooth it's aerodynamic 🧠✈️",
    emoji: "🧠",
    position: 'center',
    animation: 'float'
  },
  {
    id: 'bag-holder',
    text: "Professional bag holder since 2021 💼📉",
    emoji: "💼",
    position: 'bottom',
    animation: 'shake'
  },
  {
    id: 'wen-moon',
    text: "Wen moon? Soon moon! 🚀🌙",
    emoji: "🚀",
    position: 'top',
    animation: 'pulse'
  },
  {
    id: 'degen-life',
    text: "Living the degen life one trade at a time 🎰🔥",
    emoji: "🎰",
    position: 'center',
    animation: 'bounce'
  },
  {
    id: 'ngmi-wagmi',
    text: "NGMI? Nah fam, we're all gonna make it! 💪🚀",
    emoji: "💪",
    position: 'bottom',
    animation: 'float'
  },
  {
    id: 'hopium',
    text: "Injecting pure hopium into my veins 💉📈",
    emoji: "💉",
    position: 'top',
    animation: 'pulse'
  },
  {
    id: 'number-go-up',
    text: "Number go up = brain go brrr 📊🧠",
    emoji: "📊",
    position: 'center',
    animation: 'shake'
  }
];

const ViralMemes = () => {
  const [currentMeme, setCurrentMeme] = useState<Meme>(bagBrainMemes[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * bagBrainMemes.length);
        setCurrentMeme(bagBrainMemes[randomIndex]);
        setIsVisible(true);
      }, 500);
      
    }, 8000); // Change meme every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top':
        return 'top-20 left-4';
      case 'bottom':
        return 'bottom-20 right-4';
      case 'center':
        return 'top-1/2 left-4 transform -translate-y-1/2';
      default:
        return 'top-1/2 right-4 transform -translate-y-1/2';
    }
  };

  const getAnimationClasses = (animation: string) => {
    switch (animation) {
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse';
      case 'float':
        return 'animate-bounce-slow';
      case 'shake':
        return 'animate-ping';
      default:
        return 'animate-pulse';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Main rotating meme */}
      <div 
        className={`fixed ${getPositionClasses(currentMeme.position)} transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className={`bg-black/80 backdrop-blur-md border border-amber-500/60 rounded-xl p-4 max-w-xs ${getAnimationClasses(currentMeme.animation)}`}>
          <div className="text-center">
            <div className="text-3xl mb-2">{currentMeme.emoji}</div>
            <p className="text-amber-300 font-bold text-sm leading-tight">
              {currentMeme.text}
            </p>
          </div>
        </div>
      </div>

      {/* Static corner memes */}
      <div className="fixed top-32 right-4 bg-black/70 backdrop-blur-sm border border-purple-500/40 rounded-lg p-3 max-w-48 animate-pulse">
        <div className="text-center">
          <div className="text-2xl mb-1">🤡</div>
          <p className="text-purple-300 font-semibold text-xs">
            "I'm not gambling, I'm investing!"
          </p>
        </div>
      </div>

      <div className="fixed bottom-32 left-4 bg-black/70 backdrop-blur-sm border border-green-500/40 rounded-lg p-3 max-w-48 animate-bounce-slow">
        <div className="text-center">
          <div className="text-2xl mb-1">🐂</div>
          <p className="text-green-300 font-semibold text-xs">
            "Bull market is permanent this time!"
          </p>
        </div>
      </div>

      {/* Floating meme bubbles */}
      <div className="fixed top-40 left-1/4 animate-float-delayed">
        <div className="bg-black/60 border border-cyan-500/30 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-2xl">🍕</span>
        </div>
      </div>

      <div className="fixed bottom-40 right-1/4 animate-float-delayed-2">
        <div className="bg-black/60 border border-pink-500/30 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-2xl">🦍</span>
        </div>
      </div>
    </div>
  );
};

export default ViralMemes;