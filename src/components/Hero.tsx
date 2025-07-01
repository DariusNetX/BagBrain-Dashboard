import { useVaultData } from '../hooks/useVaultData';
import { useLPStats } from '../hooks/useLPStats';
import { useConfetti } from '../hooks/useConfetti';
import { useMobilePopover } from '../hooks/useMobilePopover';
import { useEffect, useState } from 'react';
import { removeBackground } from '../utils/imageUtils';
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
  const [processedImage, setProcessedImage] = useState<string>('');
  const [currentMeme, setCurrentMeme] = useState(0);

  useEffect(() => {
    console.log('Hero component mounted');
    
    // Process image to remove background
    const processImage = async () => {
      try {
        const processed = await removeBackground('/bagbrain-character-2.png');
        setProcessedImage(processed);
      } catch (error) {
        console.log('Background removal failed, using original image');
      }
    };
    
    processImage();
    
    // Set up tagline rotation
    const taglineInterval = setInterval(() => {
      setCurrentMeme((prev) => (prev + 1) % allMemes.length);
    }, 2500);
    
    return () => clearInterval(taglineInterval);
  }, []);

  return (
    <div className="text-center py-16 px-8 relative section-container">
      <div className="mx-auto w-32 md:w-40 mb-6 relative">
        {/* Removed overlapping background character */}
        
        <img
          src={processedImage || "/bagbrain-character-2.png"}
          alt="BagBrain Character"
          className="hero-character w-full h-auto animate-bounce-slow hover:scale-110 transition-transform duration-300 relative z-10"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.2))',
            background: 'transparent',
            imageRendering: '-webkit-optimize-contrast'
          }}
          loading="eager"
          onLoad={() => console.log('BagBrain character loaded successfully')}
          onError={(e) => {
            console.log('Character image failed, trying backup');
            e.currentTarget.src = '/bagbrain-character-1.png';
            e.currentTarget.onerror = () => {
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