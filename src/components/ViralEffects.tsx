import { useEffect, useState } from 'react';

const ViralEffects = () => {
  const [effects, setEffects] = useState<Array<{id: number, type: string, x: number, delay: number}>>([]);

  useEffect(() => {
    // Create periodic money explosions
    const createMoneyExplosion = () => {
      const explosionEmojis = ['💰', '💎', '🤑', '💵', '🪙', '⭐', '✨'];
      const newEffects: Array<{id: number, type: string, x: number, delay: number}> = [];
      
      for (let i = 0; i < 8; i++) {
        newEffects.push({
          id: Date.now() + i,
          type: explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)],
          x: Math.random() * 100,
          delay: Math.random() * 2
        });
      }
      
      setEffects(prev => [...prev, ...newEffects]);
      
      // Remove effects after animation
      setTimeout(() => {
        setEffects(prev => prev.filter(effect => !newEffects.some(newEffect => newEffect.id === effect.id)));
      }, 4000);
    };

    // Trigger money explosions every 8-12 seconds
    const interval = setInterval(createMoneyExplosion, 8000 + Math.random() * 4000);
    
    // Initial explosion
    createMoneyExplosion();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Periodic money explosions */}
      {effects.map((effect) => (
        <div
          key={effect.id}
          className="absolute text-2xl animate-ping"
          style={{
            left: `${effect.x}%`,
            top: '50%',
            animationDelay: `${effect.delay}s`,
            animationDuration: '3s',
            fontSize: effect.type === '💰' ? '32px' : '24px'
          }}
        >
          {effect.type}
        </div>
      ))}
      
      {/* Floating success messages */}
      <div className="absolute top-1/4 left-1/4 text-amber-400/30 text-sm animate-pulse">
        "Diamond hands activated"
      </div>
      <div className="absolute top-3/4 right-1/4 text-green-400/20 text-xs animate-bounce delay-1000">
        "To the moon! 🚀"
      </div>
      <div className="absolute top-1/2 left-1/6 text-purple-400/25 text-sm animate-pulse delay-2000">
        "Bags secured"
      </div>
    </div>
  );
};

export default ViralEffects;