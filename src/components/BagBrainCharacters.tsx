import { useState, useEffect } from 'react';

const interactivePhrases = [
  "👋 Hey there, fellow degen!",
  "💰 Ready to bag some gains?",
  "🧠 Your brain looks well-bagged today!",
  "🚀 To the moon we go!",
  "💎 Diamond hands activated!",
  "🎯 HODL strong, anon!",
  "⚡ Feeling bullish today!",
  "🔥 This is the way!"
];

export default function BagBrainCharacters() {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [touchStartTime, setTouchStartTime] = useState(0);

  // Handle click interactions
  const handleClick = () => {
    console.log('Mascot clicked! Event fired successfully');
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Show speech bubble with random phrase
    const randomPhrase = interactivePhrases[Math.floor(Math.random() * interactivePhrases.length)];
    setCurrentPhrase(randomPhrase);
    setShowSpeech(true);
    
    // Create floating particles
    const newParticles = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: Math.random() * 40 - 20
    }));
    setFloatingParticles(prev => [...prev, ...newParticles]);
    
    // Clear speech bubble after 3 seconds
    setTimeout(() => setShowSpeech(false), 3000);
    
    // Remove particles after animation
    setTimeout(() => {
      setFloatingParticles(prev => 
        prev.filter(p => !newParticles.some(np => np.id === p.id))
      );
    }, 2000);

    // Special effects for multiple clicks
    if (newCount >= 5) {
      setCurrentPhrase("🎉 Wow! You really love clicking me! 🎉");
      // Trigger confetti effect if available
      try {
        if (typeof (window as any).confetti === 'function') {
          (window as any).confetti({
            particleCount: 50,
            spread: 70,
            origin: { x: 0.9, y: 0.8 }
          });
        }
      } catch (error) {
        console.log('Confetti not available');
      }
      setClickCount(0); // Reset counter
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center touch-manipulation cursor-pointer bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Container clicked');
          handleClick();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          setTouchStartTime(Date.now());
          console.log('Touch started on mascot container at:', Date.now());
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const touchDuration = Date.now() - touchStartTime;
          console.log('Touch ended after', touchDuration, 'ms - triggering click');
          setIsHovered(false);
          
          // Only trigger if it was a quick tap (not a long press or drag)
          if (touchDuration < 500) {
            setTimeout(() => {
              console.log('Executing handleClick after touch');
              handleClick();
            }, 10);
          }
        }}
        onTouchMove={(e) => {
          // Prevent default to stop scrolling, but don't prevent the click
          e.preventDefault();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          touchAction: 'manipulation'
        }}
      >
        {/* Floating Particles */}
        {floatingParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute pointer-events-none text-xl animate-ping opacity-80"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              animation: 'floatUp 2s ease-out forwards'
            }}
          >
            💫
          </div>
        ))}

        {/* Speech Bubble */}
        {showSpeech && (
          <div className="absolute bottom-full right-0 mb-2 bg-white text-black px-3 py-2 rounded-lg shadow-xl border-2 border-amber-400 text-sm font-medium whitespace-nowrap animate-fadeIn pointer-events-none">
            <div className="relative">
              {currentPhrase}
              {/* Speech bubble tail */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              <div className="absolute top-full right-4 mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-400"></div>
            </div>
          </div>
        )}

        {/* Debug Touch Area - Remove after testing */}
        <div className={`absolute inset-0 border-2 border-red-500 opacity-20 ${isHovered ? 'bg-red-500' : ''} pointer-events-none`}></div>
        
        {/* Mascot Character */}
        <img
          src="/bagbrain-character-clean.png"
          alt="BagBrain Mascot"
          className={`w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-xl pointer-events-none transition-all duration-500 select-none ${
            isHovered ? 'animate-pulse scale-125 brightness-110' : 'animate-bounce hover:scale-110'
          }`}
          onError={(e) => {
            console.log('BagBrain character failed to load, hiding completely');
            e.currentTarget.style.display = 'none';
          }}
          style={{
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'none'
          }}
        />

        {/* Floating Ring Effect on Hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full border-4 border-amber-400 opacity-60 animate-ping pointer-events-none"></div>
        )}

        {/* Status Indicator */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-lg z-10 transition-all duration-300 pointer-events-none ${
          isHovered ? 'bg-amber-400 animate-bounce' : 'bg-green-400 animate-pulse'
        }`}></div>

        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none ${
          isHovered ? 'shadow-lg shadow-amber-400/50' : ''
        }`}></div>
      </div>
    </div>
  );
}