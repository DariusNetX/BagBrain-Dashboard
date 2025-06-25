// Simplified component - no longer needs state management

export default function BagBrainCharacters() {
  // No longer need character switching since we're using a single new mascot image

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div className="relative w-24 md:w-32">
        <img
          src="/bagbrain-mascot-new.png"
          alt="BagBrain Mascot"
          className="w-full h-auto drop-shadow-xl animate-bounce-slow hover:scale-110 transition-all duration-500"
          onError={(e) => {
            console.log('New BagBrain mascot failed to load, using fallback');
            const container = e.currentTarget.parentElement;
            if (container) {
              container.innerHTML = '<img src="/baghead-mascot.png" alt="BagHead Mascot" class="w-full h-auto drop-shadow-xl animate-bounce-slow hover:scale-110 transition-all duration-500" />';
            }
          }}
        />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>
    </div>
  );
}