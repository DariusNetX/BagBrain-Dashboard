import { useState } from 'react';

export default function BagBrainCharacters() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative w-32 md:w-40">
          <div className="w-32 h-32 md:w-40 md:h-40 text-6xl md:text-7xl flex items-center justify-center animate-bounce cursor-pointer">
            🧠
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-white shadow-lg z-10"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative w-32 md:w-40">
        <img
          src="/bagbrain-character-clean.png"
          alt="BagBrain Mascot"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl animate-bounce hover:scale-110 transition-all duration-500 cursor-pointer"
          onLoad={() => {
            console.log('BagBrain character loaded successfully');
            setImageLoaded(true);
          }}
          onError={() => {
            console.log('BagBrain character failed to load, showing emoji fallback');
            setImageError(true);
          }}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        
        {!imageLoaded && !imageError && (
          <div className="w-32 h-32 md:w-40 md:h-40 bg-transparent flex items-center justify-center text-6xl md:text-7xl animate-bounce cursor-pointer">
            🧠
          </div>
        )}
        
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-white shadow-lg z-10"></div>
      </div>
    </div>
  );
}