import { useState, useEffect } from 'react';

export default function BagBrainCharacters() {
  const [currentCharacter, setCurrentCharacter] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCharacter(prev => prev === 1 ? 2 : 1);
    }, 8000); // Switch characters every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div className="relative w-24 md:w-32">
        <img
          src={`/bagbrain-character-${currentCharacter}.png`}
          alt={`BagBrain Character ${currentCharacter}`}
          className="w-full h-auto drop-shadow-xl animate-bounce-slow hover:scale-110 transition-all duration-500"
          onError={(e) => {
            console.log(`Character ${currentCharacter} failed to load`);
            const container = e.currentTarget.parentElement;
            if (container) {
              container.innerHTML = '<div class="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl md:text-3xl animate-bounce-slow shadow-lg">💰</div>';
            }
          }}
        />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>
    </div>
  );
}