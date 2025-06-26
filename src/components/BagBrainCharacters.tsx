export default function BagBrainCharacters() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative w-32 md:w-40">
        {/* Direct image display with multiple fallbacks */}
        <img
          src="/new-bagbrain.png"
          alt="BagBrain Mascot"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl animate-bounce hover:scale-110 transition-all duration-500 cursor-pointer"
          onError={(e) => {
            console.log('Primary image failed, trying bagbrain-results.png');
            const img = e.currentTarget as HTMLImageElement;
            img.src = '/bagbrain-results.png';
            img.onerror = () => {
              console.log('Secondary image failed, trying bagbrain-mascot-new.png');
              img.src = '/bagbrain-mascot-new.png';
              img.onerror = () => {
                console.log('All images failed, replacing with emoji');
                img.style.display = 'none';
                const container = img.parentElement;
                if (container) {
                  container.innerHTML = `
                    <div class="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center text-4xl md:text-5xl animate-bounce shadow-2xl border-4 border-white cursor-pointer">
                      🧠
                    </div>
                    <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-3 border-white shadow-lg z-10"></div>
                  `;
                }
              };
            };
          }}
        />
        
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-3 border-white shadow-lg z-10"></div>
      </div>
    </div>
  );
}