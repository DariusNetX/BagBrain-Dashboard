import { useEffect, useState } from 'react';

const ViralBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, emoji: string, x: number, delay: number}>>([]);

  useEffect(() => {
    // Create money rain particles
    const moneyEmojis = ['💰', '💎', '🪙', '$', '💵', '🤑', '🧠', '⭐'];
    const newParticles: Array<{id: number, emoji: string, x: number, delay: number}> = [];
    
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: i,
        emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
        x: Math.random() * 100,
        delay: Math.random() * 15
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
        
        {/* BagBrain Character Backgrounds */}
        <div className="absolute top-1/4 left-8 w-32 h-32 opacity-15 animate-float-delayed hidden lg:block">
          <img
            src="/bagbrain-confused.png"
            alt="Confused BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onLoad={() => console.log('✓ Confused BagBrain background loaded successfully')}
            onError={(e) => {
              console.error('✗ Failed to load confused BagBrain background');
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        <div className="absolute bottom-1/4 right-8 w-36 h-36 opacity-20 animate-float-delayed-2 hidden lg:block">
          <img
            src="/bagbrain-cool.png"
            alt="Cool BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onLoad={() => console.log('✓ Cool BagBrain background loaded successfully')}
            onError={(e) => {
              console.error('✗ Failed to load cool BagBrain background');
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Floating brain particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`brain-${i}`}
            className="brain-particle"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${18 + Math.random() * 4}s`
            }}
          >
            🧠
          </div>
        ))}
        
        {/* Golden sparkles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="brain-particle"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${16 + Math.random() * 6}s`,
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