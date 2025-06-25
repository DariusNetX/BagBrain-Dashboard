export default function BagBrainCharacters() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative w-32 md:w-40">
        {/* Immediate fallback visible while image loads */}
        <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center text-4xl md:text-5xl animate-bounce shadow-2xl border-4 border-white cursor-pointer">
          🧠
        </div>
        
        {/* Image overlay that replaces fallback when loaded */}
        <img
          src="/new-bagbrain.png"
          alt="BagBrain Mascot"
          className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl animate-bounce hover:scale-110 transition-all duration-500 cursor-pointer opacity-0"
          onLoad={(e) => {
            console.log('BagBrain mascot loaded successfully');
            const img = e.currentTarget as HTMLImageElement;
            img.style.opacity = '1';
            const fallback = img.previousElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'none';
          }}
          onError={(e) => {
            console.log('BagBrain mascot failed to load, trying baghead fallback');
            const img = e.currentTarget as HTMLImageElement;
            img.src = '/baghead-mascot.png';
            img.onerror = () => {
              console.log('All images failed, keeping emoji fallback visible');
              img.style.display = 'none';
            };
          }}
        />
        
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-3 border-white shadow-lg z-10"></div>
      </div>
    </div>
  );
}