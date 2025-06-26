import { useState } from 'react';
import { useLPStats } from '../hooks/useLPStats';
import { useMobilePopover } from '../hooks/useMobilePopover';
import { MobilePopover } from './MobilePopover';

const LPStats = () => {
  const { reserves, isLoading, error } = useLPStats();
  const { bag, blaze, price } = reserves;
  const [txStatus, setTxStatus] = useState('');
  const { activePopover, togglePopover } = useMobilePopover();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-cyan-500/40 rounded-xl shadow-2xl p-6 w-full max-w-4xl mx-auto">
      <h2 className="section-title mb-8">💱 Liquidity Pool Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <p className="viral-label mb-2">💰 $BAG Reserve</p>
          <p className="viral-stat text-amber-400" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {bag}
          </p>
        </div>
        
        <div className="text-center">
          <p className="viral-label mb-2">🔥 $BLAZE Reserve</p>
          <p className="viral-stat text-orange-400" style={{
            background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 50%, #fb923c 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {blaze}
          </p>
        </div>
        
        <div className="text-center">
          <p className="viral-label mb-2">⚖️ Exchange Rate</p>
          <p className="viral-stat text-cyan-400" style={{
            background: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 50%, #22d3ee 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {price}
          </p>
        </div>
      </div>
      
      <div className="text-center">
        <p className="emphasis-text mb-2">
          <MobilePopover 
            id="user-liquidity" 
            content="You provide. The people trade. You win." 
            isActive={activePopover === 'user-liquidity'} 
            onToggle={togglePopover}
          >
            Your Liquidity: 2.4 BLAZE / 1.2M $BAG
          </MobilePopover>
        </p>
      </div>
      
      {txStatus === 'pending' && (
        <p className="mt-4 glow-gold text-xl animate-pulse text-center">
          ⏳ Summoning brains... Waiting for confirmation.
        </p>
      )}

      {txStatus === 'success' && (
        <p className="mt-4 glow-gold text-xl transition-opacity duration-300 text-center">
          ✅ Brains deployed. Transaction confirmed!
        </p>
      )}

      {txStatus === 'error' && (
        <p className="mt-4 glow-gold text-xl transition-opacity duration-300 text-center">
          ❌ Oops. Your bags escaped. Try again.
        </p>
      )}
      
      {error && (
        <div className="mt-4 pt-4 border-t border-red-500/30">
          <p className="text-lg text-red-400">
            Error: {error}
          </p>
        </div>
      )}
      
      {!error && bag !== '--' && (
        <div className="mt-4 pt-4 border-t border-green-500/30">
          <p className="text-lg text-gray-400">
            Live data from blockchain
          </p>
        </div>
      )}
    </div>
  );
};

export default LPStats;