import { useVaultData } from '../hooks/useVaultData';
import { useLPStats } from '../hooks/useLPStats';
import { useConfetti } from '../hooks/useConfetti';
import { useEffect } from 'react';

export default function Hero() {
  const { totalStaked } = useVaultData();
  const { reserves } = useLPStats();
  const { bag, blaze } = reserves;
  const { fireConfetti } = useConfetti();

  useEffect(() => {
    console.log('Hero component mounted');
  }, []);

  return (
    <div className="text-center py-12 px-6">
      <img
        src="/baghead-mascot.png"
        alt="BagHead Mascot"
        className="mx-auto w-28 md:w-36 mb-4 drop-shadow-xl"
        loading="eager"
        onError={(e) => {
          console.error('Image failed to load:', e.currentTarget.src);
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.insertAdjacentHTML('beforebegin', '<div style="width: 112px; height: 112px; background: #FFD700; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 48px; margin: 0 auto 16px;">💰</div>');
        }}
        onLoad={() => console.log('Baghead image loaded successfully')}
      />
      <h1 
        className="text-4xl md:text-5xl glow-text text-center mt-8 cursor-pointer hover:scale-110 transition-all duration-300" 
        onClick={(e) => {
          console.log('🎯 Headline clicked! Triggering confetti...');
          fireConfetti();
        }}
        style={{
          textShadow: '0 0 8px #ffd700, 0 0 16px #ffa500, 0 0 24px #ff8c00',
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