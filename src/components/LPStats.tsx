import { useState } from 'react';
import { useLPStats } from '../hooks/useLPStats';

const LPStats = () => {
  const { reserves, isLoading, error } = useLPStats();
  const { bag, blaze, price } = reserves;
  const [txStatus, setTxStatus] = useState('');

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
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 glow-cyan">💱 Liquidity Pool Stats</h2>
      <p className="mb-2 glow-gold">$BAG Reserve: {bag}</p>
      <p className="mb-2 glow-gold">$BLAZE Reserve: {blaze}</p>
      <p className="mb-2 glow-gold">Exchange Rate: 1 BLAZE = {price} $BAG</p>
      <p className="mb-2 glow-purple" title="You provide. The people trade. You win.">Your Liquidity: 2.4 BLAZE / 1.2M $BAG</p>
      
      {txStatus === 'pending' && (
        <p className="mt-2 text-yellow-300 text-sm animate-pulse">
          ⏳ Summoning brains... Waiting for confirmation.
        </p>
      )}

      {txStatus === 'success' && (
        <p className="mt-2 text-green-400 text-sm transition-opacity duration-300">
          ✅ Brains deployed. Transaction confirmed!
        </p>
      )}

      {txStatus === 'error' && (
        <p className="mt-2 text-red-400 text-sm transition-opacity duration-300">
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