import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Share } from "lucide-react";
import { useMobilePopover } from '../hooks/useMobilePopover';
import { MobilePopover } from './MobilePopover';

interface Meme {
  id: string;
  src: string;
  alt: string;
  title: string;
}

const memes: Meme[] = [
  {
    id: "sonic-bridge",
    src: "/meme-sonic-bridge.png",
    alt: "Just bridged my last two brain cells to Sonic. Still paid gas twice. Worth it.",
    title: "The Bridge Life"
  },
  {
    id: "sonic-brain-cells",
    src: "/meme-sonic-brain-cells.png", 
    alt: "Just bridged my last two brain cells to Sonic. Still paid gas twice. Worth it.",
    title: "Brain Cell Bridge"
  },
  {
    id: "twice-bags-brains",
    src: "/meme-twice-bags-brains.png",
    alt: "I have twice the bags but half the brains",
    title: "Bag Math"
  },
  {
    id: "portfolio-drip",
    src: "/meme-portfolio-drip.png",
    alt: "My portfolio's down but my drip's eternal",
    title: "Eternal Drip"
  },
  {
    id: "bible-markets",
    src: "/meme-bible-markets.png",
    alt: "He who understands memes understands markets",
    title: "Meme Bible"
  },
  {
    id: "apy-gas-broke",
    src: "/meme-apy-gas-broke.png",
    alt: "If APY is 42 and gas is $89, how broke am I?",
    title: "DeFi Math"
  },
  {
    id: "tradition-top",
    src: "/meme-tradition-top.png",
    alt: "Still bought the top. It's tradition.",
    title: "Top Buyer"
  },
  {
    id: "iq-wallet-wrecked",
    src: "/meme-iq-wallet-wrecked.png",
    alt: "Scored 9,500 on the IQ test. Wallet still wrecked.",
    title: "Smart but Broke"
  },
  {
    id: "confusion-gas-fees",
    src: "/meme-confusion-gas-fees.png",
    alt: "Midbaghead confusion: Me calculating gas fees with vibes and vibes only",
    title: "Gas Fee Vibes"
  },
  {
    id: "sonic-rocket",
    src: "/meme-sonic-rocket.png",
    alt: "My transaction IQ is measured in blocks per second",
    title: "Sonic Speed"
  },
  {
    id: "still-holding-genius",
    src: "/meme-still-holding-genius.png",
    alt: "Still holding. Still bagged. Still a genius.",
    title: "Diamond Hands"
  },
  {
    id: "iq-two-confirmed",
    src: "/meme-iq-two-confirmed.png",
    alt: "Scored a 2. Bag confirmed. IQ? Optional.",
    title: "IQ Optional"
  }
];

export default function MemeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { activePopover, togglePopover } = useMobilePopover();

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + memes.length) % memes.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memes.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const currentMeme = memes[currentIndex];

  const shareToTwitter = (meme: Meme) => {
    const text = `Check out this BagBrain meme: ${meme.title} 🧠💰\n\n#BagBrain #DeFi #CryptoMemes #WAGMI`;
    const url = `${window.location.origin}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 animate-gentle-bounce">
      <div className="section-container">
        <h2 className="text-2xl sm:text-3xl font-bold glow-gold text-center mb-6 sm:mb-8">
          🎭 BagBrain Meme Gallery
        </h2>
        
        <div className="relative">
          {/* Main meme display */}
          <div className="relative overflow-hidden rounded-lg bg-black/40 max-w-2xl mx-auto group animate-bounce-meme">
            <img
              src={currentMeme.src}
              alt={currentMeme.alt}
              className="w-full h-auto object-contain transition-opacity duration-500"
              loading="eager"
              style={{
                maxHeight: '400px',
                objectFit: 'contain',
                aspectRatio: 'auto'
              }}
              onLoad={(e) => {
                console.log(`✓ Meme ${currentMeme.id} loaded successfully`);
                e.currentTarget.style.opacity = '1';
              }}
              onError={(e) => {
                console.log(`⚠ Meme ${currentMeme.id} failed to load`);
                e.currentTarget.style.opacity = '0.5';
                e.currentTarget.style.border = '2px dashed #ffd700';
              }}
            />
            
            {/* Twitter Share Button Overlay - Desktop Hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
              <MobilePopover
                id={`share-meme-${currentIndex}`}
                content="Share this BagBrain meme to Twitter and spread the degen wisdom!"
                isActive={activePopover === `share-meme-${currentIndex}`}
                onToggle={togglePopover}
              >
                <button
                  onClick={() => shareToTwitter(currentMeme)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Share to Twitter"
                >
                  <Share className="w-5 h-5" />
                </button>
              </MobilePopover>
            </div>
            
            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-amber-500/50 rounded-full p-2 transition-all duration-300 hover:scale-110"
              aria-label="Previous meme"
            >
              <ChevronLeft className="w-5 h-5 text-amber-400" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-amber-500/50 rounded-full p-2 transition-all duration-300 hover:scale-110"
              aria-label="Next meme"
            >
              <ChevronRight className="w-5 h-5 text-amber-400" />
            </button>
          </div>

          {/* Meme title with mobile share button */}
          <div className="flex items-center justify-between mt-4 mb-6">
            <div className="flex-1 text-center">
              <h3 className="text-lg sm:text-xl font-bold glow-gold">
                {currentMeme.title}
              </h3>
            </div>
            {/* Mobile Share Button */}
            <div className="ml-4 md:hidden">
              <MobilePopover
                id={`share-meme-mobile-${currentIndex}`}
                content="Share this BagBrain meme to Twitter and spread the degen wisdom!"
                isActive={activePopover === `share-meme-mobile-${currentIndex}`}
                onToggle={togglePopover}
              >
                <button
                  onClick={() => shareToTwitter(currentMeme)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Share to Twitter"
                >
                  <Share className="w-4 h-4" />
                </button>
              </MobilePopover>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center space-x-2 mb-4">
            {memes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-amber-400 w-6'
                    : 'bg-amber-400/30 hover:bg-amber-400/60'
                }`}
                aria-label={`Go to meme ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="text-center">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`text-sm px-4 py-2 rounded-lg border transition-all duration-300 ${
                isAutoPlay
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-black/40 border-amber-500/30 text-amber-400/70 hover:border-amber-500/50 hover:text-amber-400'
              }`}
            >
              {isAutoPlay ? '⏸️ Pause' : '▶️ Auto-play'}
            </button>
          </div>

          {/* Meme counter */}
          <div className="text-center mt-3">
            <span className="text-sm text-amber-400/70">
              {currentIndex + 1} of {memes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}