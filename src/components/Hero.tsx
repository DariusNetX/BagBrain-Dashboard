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
      <div className="mx-auto w-36 md:w-44 mb-6">
        <img
          src={processedImage || "/bagbrain-character-2.png"}
          alt="BagBrain Character"
          className="w-full h-auto animate-bounce-slow hover:scale-110 transition-transform duration-300"
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
      </div>
      <h1 className="text-6xl md:text-7xl glow-text text-center mt-10 cursor-pointer hover:scale-105 transition-all duration-300 font-bold" 
          onClick={(e) => {
            console.log('🎯 Headline clicked! Triggering confetti...');
            fireConfetti();
          }}>
        I Have Bags For Brains 💰🧠
      </h1>
      <p className="mt-8 text-2xl glow-gold text-center font-medium leading-relaxed">
        Stake. Withdraw. Meme. Repeat. <br /> The cult of BagBrain has begun.
      </p>
      
      <div className="mt-12 space-y-6">
        <p className="glow-gold font-mono text-3xl animate-pulse tracking-wide text-center">
          🧠 <MobilePopover 
            id="staked-info" 
            content="Brains in. Liquidity out." 
            isActive={activePopover === 'staked-info'} 
            onToggle={togglePopover}
          >
            {totalStaked || '0'} $BAG staked
          </MobilePopover>
        </p>
        
        <p className="glow-gold font-mono text-2xl text-center">
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