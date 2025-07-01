import { useEffect, useState } from 'react';

const ViralBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, emoji: string, x: number, delay: number}>>([]);

  useEffect(() => {
    // Create money rain particles
    const moneyEmojis = ['💰', '💎', '🪙', '$', '💵', '🤑', '🧠', '⭐'];
    const newParticles: Array<{id: number, emoji: string, x: number, delay: number}> = [];
    
    for (let i = 0; i < 4; i++) {
      newParticles.push({
        id: i,
        emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
        x: (i * 25) % 100, // More spaced out
        delay: i * 3
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Shimmer overlay */}
      <div className="shimmer-overlay" />
      
      {/* Money rain container */}
      <div className="viral-money-rain">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="money-particle"
            style={{
              left: `${particle.x}%`,
              animationDelay: `${particle.delay}s`,
              fontSize: particle.emoji === '🧠' ? '28px' : '24px'
            }}
          >
            {particle.emoji}
          </div>
        ))}
        
        {/* Single BagBrain Character Background - Removed overlapping images */}

        {/* Reduced floating particles to prevent clutter */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`brain-${i}`}
            className="brain-particle"
            style={{
              left: `${15 + i * 25}%`,
              animationDelay: `${i * 4}s`,
              animationDuration: `${20 + (i % 2) * 2}s`
            }}
          >
            🧠
          </div>
        ))}
        
        {[...Array(2)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="brain-particle"
            style={{
              left: `${30 + i * 40}%`,
              animationDelay: `${i * 6}s`,
              animationDuration: `${18 + i * 2}s`,
              fontSize: '16px'
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </>
  );
};

export default ViralBackground;