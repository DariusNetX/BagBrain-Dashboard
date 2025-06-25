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
      <h2 className="text-2xl font-bold mb-6 glow-gold">💱 Liquidity Pool Stats</h2>
      <p className="mb-3 glow-gold text-base">$BAG Reserve: {bag}</p>
      <p className="mb-3 glow-gold text-base">$BLAZE Reserve: {blaze}</p>
      <p className="mb-3 glow-gold text-base">Exchange Rate: 1 BLAZE = {price} $BAG</p>
      <p className="mb-4 glow-gold text-base">
        <MobilePopover 
          id="user-liquidity" 
          content="You provide. The people trade. You win." 
          isActive={activePopover === 'user-liquidity'} 
          onToggle={togglePopover}
        >
          Your Liquidity: 2.4 BLAZE / 1.2M $BAG
        </MobilePopover>
      </p>
      
      {txStatus === 'pending' && (
        <p className="mt-4 glow-gold text-base animate-pulse text-center">
          ⏳ Summoning brains... Waiting for confirmation.
        </p>
      )}

      {txStatus === 'success' && (
        <p className="mt-4 glow-gold text-base transition-opacity duration-300 text-center">
          ✅ Brains deployed. Transaction confirmed!
        </p>
      )}

      {txStatus === 'error' && (
        <p className="mt-4 glow-gold text-base transition-opacity duration-300 text-center">
          ❌ Oops. Your bags escaped. Try again.
        </p>
      )}
      
      {error && (
        <div className="mt-4 pt-4 border-t border-red-500/30">
          <p className="text-sm text-red-400">
            Error: {error}
          </p>
        </div>
      )}
      
      {!error && bag !== '--' && (
        <div className="mt-4 pt-4 border-t border-green-500/30">
          <p className="text-sm text-gray-400">
            Live data from blockchain
          </p>
        </div>
      )}
    </div>
  );
};

export default LPStats;