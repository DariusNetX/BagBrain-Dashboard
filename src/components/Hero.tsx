import { useVaultData } from '../hooks/useVaultData';
import { useLPStats } from '../hooks/useLPStats';
import { useConfetti } from '../hooks/useConfetti';

export default function Hero() {
  const { totalStaked } = useVaultData();
  const { reserves } = useLPStats();
  const { bag, blaze } = reserves;
  const { fireConfetti } = useConfetti();

  return (
    <div className="text-center py-12 px-6">
      <img
        src="/baghead-mascot.png"
        alt="BagHead Mascot"
        className="mx-auto w-28 md:w-36 mb-4 drop-shadow-xl"
      />
      <h1 
        className="text-4xl md:text-5xl glow-text text-center mt-8 cursor-pointer hover:scale-105 transition-transform" 
        onClick={fireConfetti}
      >
        I Have Bags For Brains 💰🧠
      </h1>
      <p className="mt-4 text-lg text-gray-700 font-body">
        Stake. Withdraw. Meme. Repeat. <br /> The cult of BagBrain has begun.
      </p>
      
      <div className="mt-8 space-y-3">
        <p className="text-blue-600 font-mono text-xl md:text-2xl animate-pulse tracking-wide" title="Brains in. Liquidity out.">
          🧠 {totalStaked || '0'} $BAG staked
        </p>
        
        <p className="text-purple-600 font-mono text-sm md:text-base" title="Backed by vibes and bag strength.">
          💧 Total Pool: {blaze || '0'} BLAZE / {bag || '0'} $BAG
        </p>
      </div>
    </div>
  );
}