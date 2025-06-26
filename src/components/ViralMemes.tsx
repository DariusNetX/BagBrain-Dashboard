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
        return 'top-4 left-4 xl:left-8';
      case 'bottom':
        return 'bottom-4 right-4 xl:right-8';
      case 'center':
        return 'top-1/3 right-4 xl:right-8 transform -translate-y-1/2';
      default:
        return 'top-2/3 left-4 xl:left-8 transform -translate-y-1/2';
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
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Main rotating meme */}
      <div 
        className={`fixed ${getPositionClasses(currentMeme.position)} transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className={`bg-black/80 backdrop-blur-md border border-amber-500/60 rounded-xl p-3 max-w-48 ${getAnimationClasses(currentMeme.animation)}`}>
          <div className="text-center">
            <div className="text-xl mb-1">{currentMeme.emoji}</div>
            <p className="text-amber-300 font-bold text-xs leading-tight">
              {currentMeme.text}
            </p>
          </div>
        </div>
      </div>

      {/* Static corner memes - repositioned */}
      <div className="fixed top-24 right-4 xl:right-8 bg-black/70 backdrop-blur-sm border border-purple-500/40 rounded-lg p-2 max-w-40 animate-pulse hidden lg:block">
        <div className="text-center">
          <div className="text-lg mb-1">🤡</div>
          <p className="text-purple-300 font-semibold text-xs">
            "Not gambling!"
          </p>
        </div>
      </div>

      <div className="fixed bottom-24 left-4 xl:left-8 bg-black/70 backdrop-blur-sm border border-green-500/40 rounded-lg p-2 max-w-40 animate-bounce-slow hidden lg:block">
        <div className="text-center">
          <div className="text-lg mb-1">🐂</div>
          <p className="text-green-300 font-semibold text-xs">
            "This time!"
          </p>
        </div>
      </div>

      {/* Floating meme bubbles - smaller and repositioned */}
      <div className="fixed top-1/4 left-8 animate-float-delayed hidden xl:block">
        <div className="bg-black/50 border border-cyan-500/30 rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-lg">🍕</span>
        </div>
      </div>

      <div className="fixed bottom-1/4 right-8 animate-float-delayed-2 hidden xl:block">
        <div className="bg-black/50 border border-pink-500/30 rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-lg">🦍</span>
        </div>
      </div>
    </div>
  );
};

export default ViralMemes;