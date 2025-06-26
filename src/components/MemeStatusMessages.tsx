import { useState, useEffect } from 'react';

interface MemeStatusProps {
  status: 'idle' | 'pending' | 'success' | 'error';
  type: 'stake' | 'withdraw';
}

const memeMessages = {
  stake: {
    pending: [
      "🧠 Feeding the vault with your precious bags...",
      "💰 Your bags are being processed by the meme gods...",
      "🎰 Rolling the dice with your hard-earned $BAG...",
      "⏳ Patience, young grasshopper. Rome wasn't built in a day!"
    ],
    success: [
      "🎉 Bags successfully deployed! You're officially a degen!",
      "✅ Your bags are now working overtime in the vault!",
      "🚀 Mission accomplished! Your bags are moonbound!",
      "💎 Diamond hands activated! Welcome to the club!"
    ],
    error: [
      "😅 Oops! Even degens make mistakes sometimes...",
      "🤡 Transaction failed! Time to touch grass?",
      "💸 The blockchain gods have spoken... negatively.",
      "🦄 Error detected! This isn't supposed to happen!"
    ]
  },
  withdraw: {
    pending: [
      "💰 Extracting your bags from the vault of dreams...",
      "🏃‍♂️ Your bags are sprinting back to your wallet...",
      "⏰ Summoning the liquidity spirits...",
      "🎪 The great bag escape is in progress..."
    ],
    success: [
      "🎊 Bags retrieved! Time to buy a Lambo?",
      "✨ Withdrawal complete! You're still a legend!",
      "💪 Bags secured! Living up to that diamond hand reputation!",
      "🏆 Success! Your bags are free to roam again!"
    ],
    error: [
      "😬 Withdrawal hiccup! Even legends face challenges...",
      "🚫 Error encountered! The vault is being protective...",
      "🤷‍♂️ Something went wrong! Try again, brave soul!",
      "⚠️ Transaction rejected! The blockchain is moody today!"
    ]
  }
};

const MemeStatusMessages: React.FC<MemeStatusProps> = ({ status, type }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      setIsVisible(false);
      return;
    }

    const messages = memeMessages[type]?.[status] || [];
    if (messages.length > 0) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
      setIsVisible(true);

      // Auto-hide success messages after 5 seconds
      if (status === 'success') {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [status, type]);

  if (!isVisible || !currentMessage) return null;

  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'text-amber-400 animate-pulse border-amber-500/40';
      case 'success':
        return 'text-green-400 border-green-500/40';
      case 'error':
        return 'text-red-400 border-red-500/40';
      default:
        return 'text-gray-400 border-gray-500/40';
    }
  };

  return (
    <div className={`mt-4 p-4 bg-black/60 backdrop-blur-sm border rounded-lg text-center transition-all duration-300 ${getStatusStyles()}`}>
      <p className="font-bold text-lg">
        {currentMessage}
      </p>
    </div>
  );
};

export default MemeStatusMessages;