import { useVaultData } from '../hooks/useVaultData';
import { useLPStats } from '../hooks/useLPStats';
import { useConfetti } from '../hooks/useConfetti';
import { useMobilePopover } from '../hooks/useMobilePopover';
import { useEffect, useState } from 'react';
import { MobilePopover } from './MobilePopover';

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

export default function Hero() {
  const { totalStaked } = useVaultData();
  const { reserves } = useLPStats();
  const { bag, blaze } = reserves;
  const { fireConfetti } = useConfetti();
  const { activePopover, togglePopover } = useMobilePopover();
  const [currentMeme, setCurrentMeme] = useState(0);

  useEffect(() => {
    // Set up tagline rotation
    const taglineInterval = setInterval(() => {
      setCurrentMeme((prev) => (prev + 1) % allMemes.length);
    }, 2500);
    
    return () => clearInterval(taglineInterval);
  }, []);

  return (
    <div className="text-center py-16 px-8 relative section-container">
      <div className="mx-auto w-32 md:w-40 mb-6 relative hero-character-container">
        {/* SVG BagBrain Character with transparent background */}
        <div className="w-full h-auto relative z-10 hero-character-clean animate-bounce-slow hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            {/* Golden glow background */}
            <defs>
              <filter id="goldGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Bag head shape */}
            <rect x="50" y="40" width="100" height="120" rx="15" ry="15" 
                  fill="#D4A574" stroke="#8B5A3C" strokeWidth="3" filter="url(#goldGlow)"/>
            
            {/* Brain on top */}
            <ellipse cx="100" cy="30" rx="30" ry="15" fill="#FF69B4"/>
            <path d="M 70 30 Q 85 20 100 30 Q 115 20 130 30" stroke="#FF1493" strokeWidth="2" fill="none"/>
            
            {/* Eyes */}
            <circle cx="80" cy="80" r="12" fill="white"/>
            <circle cx="120" cy="80" r="12" fill="white"/>
            <circle cx="80" cy="80" r="8" fill="black"/>
            <circle cx="120" cy="80" r="8" fill="black"/>
            
            {/* Mouth */}
            <ellipse cx="100" cy="110" rx="20" ry="10" fill="black"/>
            <rect x="90" y="105" width="20" height="8" fill="white"/>
            
            {/* Body/hoodie */}
            <rect x="40" y="160" width="120" height="40" rx="20" ry="20" fill="#1a1a1a"/>
            
            {/* Gold chain */}
            <circle cx="80" cy="175" r="5" fill="#FFD700"/>
            <circle cx="100" cy="175" r="5" fill="#FFD700"/>
            <circle cx="120" cy="175" r="5" fill="#FFD700"/>
            <line x1="80" y1="175" x2="100" y2="175" stroke="#FFD700" strokeWidth="2"/>
            <line x1="100" y1="175" x2="120" y2="175" stroke="#FFD700" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Fallback image for backup */}
        <img
          src="/bagbrain-character-clean.png"
          alt="BagBrain Character Backup"
          className="hidden hero-character w-full h-auto animate-bounce-slow hover:scale-110 transition-transform duration-300 relative z-10"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.2))',
            background: 'transparent'
          }}
          loading="eager"
          onError={(e) => {
            console.log('All character images failed, using fallback');
            const container = e.currentTarget.parentElement;
            if (container) {
                container.innerHTML = '<div class="hero-character bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl md:text-5xl animate-bounce-slow shadow-lg">💰</div>';
              }
            };
          }}
        />

      </div>
      <h1 className="mega-headline text-center mt-10 cursor-pointer hover:scale-105 transition-all duration-300" 
          onClick={() => {
            console.log('🎯 Headline clicked! Triggering confetti...');
            fireConfetti();
          }}>
        Welcome to BagBrain 🧠<br />
        <span className="subtitle-accent">Where Brains Get Bagged</span>
      </h1>
      
      {/* Dynamic rolling taglines */}
      <div className="text-center mt-6">
        <div className="inline-block px-6 py-3 bg-black/60 rounded-xl border border-amber-500/30 backdrop-blur-md">
          <div className="text-2xl md:text-3xl font-semibold glow-gold">
            <div className="animate-fadeIn">
              <span id="dynamic-tagline">{allMemes[currentMeme]}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 mb-4">
        <span className="text-6xl animate-bounce">💰🧠</span>
      </div>
      <p className="viral-subtitle text-center mt-6 leading-tight">
        Stake. Withdraw. Meme. Repeat.
      </p>
      <p className="emphasis-text text-center mt-4">
        The cult of BagBrain has begun.
      </p>
      
      <div className="mt-16 space-y-8">
        <div className="text-center">
          <p className="viral-label mb-2">🧠 Total Brains Deployed</p>
          <p className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2" style={{
            textShadow: '0 0 15px rgba(34, 211, 238, 0.9), 0 0 30px rgba(34, 211, 238, 0.5), 0 3px 6px rgba(0, 0, 0, 0.8)',
            filter: 'brightness(1.3) contrast(1.2)'
          }}>
            <MobilePopover 
              id="staked-info" 
              content="Brains in. Liquidity out." 
              isActive={activePopover === 'staked-info'} 
              onToggle={togglePopover}
            >
              {totalStaked || '0'} $BAG
            </MobilePopover>
          </p>
        </div>
        
        <p className="text-2xl md:text-3xl font-bold text-amber-400 text-center" style={{
          textShadow: '0 0 12px rgba(251, 191, 36, 0.8), 0 0 24px rgba(251, 191, 36, 0.4), 0 2px 4px rgba(0, 0, 0, 0.8)',
          filter: 'brightness(1.2) contrast(1.1)'
        }}>
          💧 <MobilePopover 
            id="pool-info" 
            content="Backed by vibes and bag strength." 
            isActive={activePopover === 'pool-info'} 
            onToggle={togglePopover}
          >
            Total Pool: {blaze || '0'} BLAZE / {bag || '0'} $BAG
          </MobilePopover>
        </p>
      </div>
    </div>
  );
}