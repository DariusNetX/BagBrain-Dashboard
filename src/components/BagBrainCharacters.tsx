export default function BagBrainCharacters() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative w-16 md:w-20">
        <img
          src="/bagbrain-character-clean.png"
          alt="BagBrain Mascot"
          className="bottom-character w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-xl animate-bounce hover:scale-110 transition-all duration-500 cursor-pointer"
          onError={(e) => {
            console.log('BagBrain character failed to load, hiding completely');
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white shadow-lg z-10"></div>
      </div>
    </div>
  );
}