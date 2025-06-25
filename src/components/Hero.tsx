import { useVaultData } from '../hooks/useVaultData';
import { useLPStats } from '../hooks/useLPStats';
import { useConfetti } from '../hooks/useConfetti';
import { useEffect, useState } from 'react';
import { removeBackground } from '../utils/imageUtils';

export default function Hero() {
  const { totalStaked } = useVaultData();
  const { reserves } = useLPStats();
  const { bag, blaze } = reserves;
  const { fireConfetti } = useConfetti();
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
    <div className="text-center py-12 px-6 relative bg-black/30 backdrop-blur-sm rounded-lg mx-4 mb-8 border border-yellow-500/20">
      <div className="mx-auto w-32 md:w-40 mb-4">
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
                container.innerHTML = '<div class="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl md:text-5xl animate-bounce-slow shadow-lg">💰</div>';
              }
            };
          }}
        />
      </div>
      <h1 
        className="text-4xl md:text-5xl glow-text text-center mt-8 cursor-pointer hover:scale-110 transition-all duration-300" 
        onClick={(e) => {
          console.log('🎯 Headline clicked! Triggering confetti...');
          fireConfetti();
        }}
        style={{
          textShadow: '0 0 4px #ffd700, 0 0 8px #ffa500, 0 0 12px #ff8c00',
          color: '#fff700'
        }}
      >
        I Have Bags For Brains 💰🧠
      </h1>
      <p className="mt-4 text-lg glow-gold font-body">
        Stake. Withdraw. Meme. Repeat. <br /> The cult of BagBrain has begun.
      </p>
      
      <div className="mt-8 space-y-3">
        <p className="glow-cyan font-mono text-xl md:text-2xl animate-pulse tracking-wide" title="Brains in. Liquidity out.">
          🧠 {totalStaked || '0'} $BAG staked
        </p>
        
        <p className="glow-purple font-mono text-sm md:text-base" title="Backed by vibes and bag strength.">
          💧 Total Pool: {blaze || '0'} BLAZE / {bag || '0'} $BAG
        </p>
      </div>
    </div>
  );
}