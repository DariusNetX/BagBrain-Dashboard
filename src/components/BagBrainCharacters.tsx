// Simplified component - no longer needs state management

export default function BagBrainCharacters() {
  // No longer need character switching since we're using a single new mascot image

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div className="relative w-24 md:w-32">
        <img
          src="/new-bagbrain.png"
          alt="BagBrain Mascot"
          className="w-full h-auto drop-shadow-xl animate-bounce-slow hover:scale-110 transition-all duration-500"
          onError={(e) => {
            console.log('New BagBrain mascot failed to load, using fallback');
            // Try the original baghead mascot first, then fall back to gold circle
            const img = e.currentTarget as HTMLImageElement;
            img.src = '/baghead-mascot.png';
            img.onerror = () => {
              const container = img.parentElement;
              if (container) {
                container.innerHTML = '<div class="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl md:text-3xl animate-bounce-slow shadow-lg">💰</div>';
              }
            };
          }}
        />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>
    </div>
  );
}