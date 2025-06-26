import { useEffect, useState } from 'react';

const ViralBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, emoji: string, x: number, delay: number}>>([]);

  useEffect(() => {
    // Create money rain particles
    const moneyEmojis = ['💰', '💎', '🪙', '$', '💵', '🤑', '🧠', '⭐'];
    const newParticles: Array<{id: number, emoji: string, x: number, delay: number}> = [];
    
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i,
        emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
        x: (i * 12.5) % 100, // Evenly spaced
        delay: i * 2
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
        
        {/* Simplified BagBrain Character Backgrounds */}
        <div className="absolute top-1/4 left-12 w-24 md:w-32 h-24 md:h-32 opacity-8 animate-float-delayed">
          <img
            src="/bagbrain-confused.png"
            alt="BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        
        <div className="absolute bottom-1/3 right-12 w-28 md:w-36 h-28 md:h-36 opacity-10 animate-float-delayed-2">
          <img
            src="/bagbrain-cool.png"
            alt="BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>

        {/* Simplified floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`brain-${i}`}
            className="brain-particle"
            style={{
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${18 + (i % 3)}s`
            }}
          >
            🧠
          </div>
        ))}
        
        {[...Array(4)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="brain-particle"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 4}s`,
              animationDuration: `${16 + i}s`,
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