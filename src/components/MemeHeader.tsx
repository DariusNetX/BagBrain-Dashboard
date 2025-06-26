import { useState, useEffect } from 'react';

const memeHeaders = [
  "Welcome to the BagBrain Ecosystem 🧠💰",
  "Where Smooth Brains Meet Diamond Hands 💎🙌", 
  "Professional Bag Holders Unite! 💼📉",
  "Turning FOMO into YOLO since 2024 🎰🚀",
  "Your Favorite Degen Destination 🤡💸",
  "Making Unrealistic Gains Realistic 📈🦄",
  "Hopium Dealer & Dream Maker ✨💫",
  "From Zero to Hero (or Hero to Zero) 📊🎭"
];

const MemeHeader = () => {
  const [currentHeader, setCurrentHeader] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentHeader((prev) => (prev + 1) % memeHeaders.length);
        setIsVisible(true);
      }, 300);
      
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-6">
      <div 
        className={`transition-all duration-300 ${
          isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
        }`}
      >
        <p className="text-lg md:text-xl font-bold mb-3 text-amber-300">
          {memeHeaders[currentHeader]}
        </p>
        <div className="flex justify-center space-x-1">
          {memeHeaders.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentHeader 
                  ? 'bg-amber-400 scale-125' 
                  : 'bg-amber-400/30 scale-100'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeHeader;