// Removed unused React import
import { useLPStats } from '../hooks/useLPStats';
import { useMobilePopover } from '../hooks/useMobilePopover';
import { MobilePopover } from './MobilePopover';

const LPStats = () => {
  const { reserves, isLoading, error, retry } = useLPStats();
  const { bag, blaze, price } = reserves;
  const { activePopover, togglePopover } = useMobilePopover();

  // Enhanced error state with retry functionality
  if (error && bag === '---' && blaze === '---') {
    return (
      <div className="bg-red-900/20 backdrop-blur-md border border-red-500/40 rounded-xl p-6 w-full max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">📊💥</div>
          <h3 className="text-2xl font-bold glow-red mb-4">LP Data Connection Error</h3>
          <p className="text-lg mb-4 opacity-80">{error}</p>
          <div className="space-y-3">
            <button
              onClick={retry}
              className="btn-primary bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              🔄 Retry LP Data
            </button>
            <p className="text-sm opacity-60">
              Unable to fetch liquidity pool data. Check network connection.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-black/60 backdrop-blur-md border border-cyan-500/40 rounded-xl p-6 w-full max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="flex justify-center items-center py-8">
            <div className="text-4xl animate-bounce">📊</div>
            <span className="ml-3 text-lg glow-text">Loading LP data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-cyan-500/40 rounded-xl shadow-2xl p-6 w-full max-w-4xl mx-auto relative overflow-hidden">
      {/* Removed overlapping confused BagBrain character */}
      <h2 className="section-title mb-8 relative z-10">💱 Liquidity Pool Stats</h2>
      
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
            <MobilePopover 
              id="bag-reserve" 
              content={bag !== '---' ? "Amount of $BAG tokens currently in the liquidity pool available for trading" : "Loading $BAG reserve data from blockchain... This shows how much liquidity is available for trading"} 
              isActive={activePopover === 'bag-reserve'} 
              onToggle={togglePopover}
            >
              {bag}
            </MobilePopover>
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
            <MobilePopover 
              id="blaze-reserve" 
              content={blaze !== '---' ? "Amount of $BLAZE tokens in the liquidity pool paired with $BAG for trading" : "Loading $BLAZE reserve data from blockchain... This shows the other side of the trading pair"} 
              isActive={activePopover === 'blaze-reserve'} 
              onToggle={togglePopover}
            >
              {blaze}
            </MobilePopover>
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
            <MobilePopover 
              id="exchange-rate" 
              content={price !== '---' ? "Current exchange rate between $BAG and $BLAZE based on pool reserves. Rate changes with each trade!" : "Loading exchange rate... This shows how many $BLAZE you get per $BAG token"} 
              isActive={activePopover === 'exchange-rate'} 
              onToggle={togglePopover}
            >
              {price}
            </MobilePopover>
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

      
      {error && (
        <div className="mt-4 pt-4 border-t border-red-500/30">
          <p className="text-lg text-red-400">
            Error: {error}
          </p>
        </div>
      )}
      
      {!error && bag !== '---' && (
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