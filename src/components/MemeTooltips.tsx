import { useMobilePopover } from '../hooks/useMobilePopover';
import { MobilePopover } from './MobilePopover';

const memeTooltips = [
  {
    id: 'hodl-meme',
    text: 'HODL',
    tooltip: "Hold On for Dear Life! 💎🙌 Never selling, only buying more dips!"
  },
  {
    id: 'wagmi-meme', 
    text: 'WAGMI',
    tooltip: "We're All Gonna Make It! 🚀 Together we moon, together we win!"
  },
  {
    id: 'ngmi-meme',
    text: 'Paper Hands',
    tooltip: "NGMI - Not Gonna Make It 📄🙌 Selling at the first red candle!"
  },
  {
    id: 'diamond-meme',
    text: 'Diamond Hands',
    tooltip: "💎🙌 Holding through -90% because we believe in the tech!"
  },
  {
    id: 'ape-meme',
    text: 'Going Full Ape',
    tooltip: "🦍 Buying without research because monkey see, monkey do!"
  },
  {
    id: 'rekt-meme',
    text: 'Absolutely REKT',
    tooltip: "💀 When your portfolio goes to zero but you're still vibing!"
  }
];

const MemeTooltips = () => {
  const { activePopover, togglePopover } = useMobilePopover();

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-8 mb-6">
      {memeTooltips.map((meme) => (
        <MobilePopover
          key={meme.id}
          id={meme.id}
          content={meme.tooltip}
          isActive={activePopover === meme.id}
          onToggle={togglePopover}
        >
          <span className="bg-black/60 border border-amber-500/40 rounded-full px-4 py-2 text-amber-300 font-bold text-sm cursor-pointer hover:bg-black/80 hover:border-amber-500/60 transition-all duration-300 hover:scale-105">
            {meme.text}
          </span>
        </MobilePopover>
      ))}
    </div>
  );
};

export default MemeTooltips;