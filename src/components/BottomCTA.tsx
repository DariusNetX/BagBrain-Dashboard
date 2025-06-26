import { useMobilePopover } from '../hooks/useMobilePopover';
import { MobilePopover } from './MobilePopover';

export default function BottomCTA() {
  const { activePopover, togglePopover } = useMobilePopover();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'BagBrain Dashboard - I Have Bags for Brains',
        text: 'Join the cult of BagBrain! Stake $BAG, embrace the chaos, become the meme.',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share the BagBrain madness.');
    }
  };

  const handleClaimNFT = () => {
    // Placeholder for NFT claiming functionality
    alert('🎭 BagHead NFT claiming coming soon! The bags are being prepared...');
  };

  return (
    <div className="p-10 bg-black/60 rounded-xl border border-amber-500/30 text-center shadow-2xl">
      <h2 className="section-title mb-6 text-center">
        🎉 Share + Claim BagHead NFT
      </h2>
      <p className="emphasis-text mb-4 text-center max-w-2xl mx-auto">
        Join the cult. Share your score. Claim your place in BagBrain history.
      </p>
      
      {/* Meme Callouts - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 max-w-3xl mx-auto">
        <div className="bg-black/40 border border-green-500/30 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">📈</div>
          <p className="text-green-400 font-bold text-xs">Number Go Up</p>
        </div>
        <div className="bg-black/40 border border-purple-500/30 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">🤝</div>
          <p className="text-purple-400 font-bold text-xs">Apes Strong</p>
        </div>
        <div className="bg-black/40 border border-amber-500/30 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">🚀</div>
          <p className="text-amber-400 font-bold text-xs">This Time</p>
        </div>
      </div>
      
      <p className="mb-6 viral-label text-center">
        <MobilePopover 
          id="cult-message" 
          content="Spread the madness. Claim your identity." 
          isActive={activePopover === 'cult-message'} 
          onToggle={togglePopover}
        >
          Share the dashboard and claim your exclusive BagHead NFT
        </MobilePopover>
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <MobilePopover 
          id="share-btn" 
          content="Spread the BagBrain gospel to the masses" 
          isActive={activePopover === 'share-btn'} 
          onToggle={togglePopover}
        >
          <button 
            onClick={handleShare}
            className="btn-primary px-8 py-3 text-lg font-bold w-full sm:w-auto"
          >
            📢 Share Dashboard
          </button>
        </MobilePopover>
        
        <MobilePopover 
          id="nft-btn" 
          content="Exclusive BagHead identity for true believers" 
          isActive={activePopover === 'nft-btn'} 
          onToggle={togglePopover}
        >
          <button 
            onClick={handleClaimNFT}
            className="btn-primary px-8 py-3 text-lg font-bold w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600"
          >
            🎭 Claim BagHead NFT
          </button>
        </MobilePopover>
      </div>
      
      <p className="mt-4 text-sm glow-gold opacity-75">
        <MobilePopover 
          id="disclaimer" 
          content="Not financial advice. Pure meme energy." 
          isActive={activePopover === 'disclaimer'} 
          onToggle={togglePopover}
        >
          * BagBrain is a meme project. Bags may contain actual brains.
        </MobilePopover>
      </p>
    </div>
  );
}