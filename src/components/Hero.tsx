import { useVaultData } from '../hooks/useVaultData';
import { useLPStats } from '../hooks/useLPStats';
import { useConfetti } from '../hooks/useConfetti';
import { useMobilePopover } from '../hooks/useMobilePopover';
import { useEffect, useState } from 'react';
import { removeBackground } from '../utils/imageUtils';
import { MobilePopover } from './MobilePopover';

export default function Hero() {
  const { totalStaked } = useVaultData();
  const { reserves } = useLPStats();
  const { bag, blaze } = reserves;
  const { fireConfetti } = useConfetti();
  const { activePopover, togglePopover } = useMobilePopover();
  const [processedImage, setProcessedImage] = useState<string>('');

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
  }, []);

  return (
    <div className="text-center py-16 px-8 relative bg-black/40 backdrop-blur-md rounded-xl border border-yellow-500/30 shadow-2xl">
      <div className="mx-auto w-36 md:w-44 mb-6 relative">
        {/* Background Character Elements */}
        <div className="absolute -top-6 -left-6 w-20 h-20 opacity-25 animate-pulse hidden md:block">
          <img
            src="/bagbrain-confused.png"
            alt="Confused BagBrain"
            className="w-full h-full object-contain"
            loading="eager"
            onLoad={() => console.log('✓ Hero confused BagBrain loaded')}
          />
        </div>
        
        <img
          src={processedImage || "/bagbrain-character-2.png"}
          alt="BagBrain Character"
          className="w-full h-auto animate-bounce-slow hover:scale-110 transition-transform duration-300 relative z-10"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.2))',
            background: 'transparent'
          }}
          onLoad={() => console.log('BagBrain character loaded successfully')}
          onError={(e) => {
            console.log('Character image failed, trying backup');
            e.currentTarget.src = '/bagbrain-character-1.png';
            e.currentTarget.onError = () => {
              console.log('All character images failed, using fallback');
              const container = e.currentTarget.parentElement;
              if (container) {
                container.innerHTML = '<div class="w-36 h-36 md:w-44 md:h-44 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl md:text-5xl animate-bounce-slow shadow-lg">💰</div>';
              }
            };
          }}
        />
        
        <div className="absolute -top-6 -right-6 w-16 h-16 opacity-20 animate-float-delayed-2 hidden md:block">
          <img
            src="/bagbrain-cool.png"
            alt="Cool BagBrain"
            className="w-full h-full object-contain"
            loading="eager"
            onLoad={() => console.log('✓ Hero cool BagBrain loaded')}
          />
        </div>
      </div>
      <h1 className="hero-title text-center mt-10 cursor-pointer hover:scale-105 transition-all duration-300" 
          onClick={(e) => {
            console.log('🎯 Headline clicked! Triggering confetti...');
            fireConfetti();
          }}>
        I Have Bags For Brains
      </h1>
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
          <p className="viral-stat">
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
        
        <p className="glow-gold font-mono text-3xl text-center">
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