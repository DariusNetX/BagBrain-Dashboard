import { useState, useEffect } from 'react';

const allMemes = [
  "💰 Number Go Up Technology",
  "🧠 Weaponized Autism Engaged", 
  "💎 Diamond Hands Activated",
  "🚀 Destination: Moon Base Alpha",
  "📈 Stonks Only Go Up Mode",
  "🎯 Maximum Degen Protocol",
  "⚡ Big Brain Energy Deployed",
  "🔥 This Is The Way Forward",
  "🎪 Welcome to the Circus",
  "💸 Money Printer Go Brrr",
  "🎭 Peak Performance Mode",
  "🌙 Wen Moon? Soon Moon!",
  "🎲 YOLO Capital Deployed",
  "🧬 DNA: Degen Not Advised",
  "🎯 Bags Status: Secured",
  "⭐ Main Character Energy",
  "🎨 Turning Red Into Green",
  "🔮 Future Millionaire Vibes",
  "🎪 Clown Market Activated",
  "💫 Generational Wealth Loading"
];

const MemeHeader = () => {
  const [currentMeme, setCurrentMeme] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMeme((prev) => (prev + 1) % allMemes.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-6 mb-6">
      <div className="inline-block px-6 py-3 bg-black/60 rounded-xl border border-amber-500/30 backdrop-blur-md">
        <h2 className="text-lg md:text-xl glow-gold transition-all duration-500">
          {allMemes[currentMeme]}
        </h2>
        
        <div className="flex justify-center mt-3 gap-1 flex-wrap max-w-md mx-auto">
          {allMemes.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentMeme ? 'bg-amber-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeHeader;