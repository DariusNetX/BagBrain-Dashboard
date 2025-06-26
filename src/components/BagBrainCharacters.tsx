export default function BagBrainCharacters() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative w-32 md:w-40">
        <img
          src="/bagbrain-character-clean.png"
          alt="BagBrain Mascot"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl animate-bounce hover:scale-110 transition-all duration-500 cursor-pointer"
          onError={(e) => {
            console.log('BagBrain character failed to load, hiding completely');
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-white shadow-lg z-10"></div>
      </div>
    </div>
  );
}