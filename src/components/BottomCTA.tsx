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
    <div className="mt-16 p-8 bg-black/60 rounded-lg border border-amber-500/30 text-center">
      <h2 className="text-2xl font-bold mb-4 glow-gold">
        🎭 Join the BagBrain Cult
      </h2>
      
      <p className="mb-6 glow-gold text-base">
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