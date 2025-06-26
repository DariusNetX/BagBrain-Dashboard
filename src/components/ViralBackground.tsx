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
        <div className="character-bg confused" style={{
          backgroundImage: `url(/attached_assets/537030C6-924F-4D87-8A8A-3118C7567FA5_1750909130574.png)`,
          top: '20%',
          left: '5%',
          width: '120px',
          height: '120px',
          opacity: 0.06,
          animationDelay: '1s'
        }} />
        
        <div className="character-bg cool" style={{
          backgroundImage: `url(/attached_assets/AF238323-E4EA-4162-B88A-81DF270E8A05_1750909130574.png)`,
          bottom: '20%',
          right: '5%',
          width: '140px',
          height: '140px',
          opacity: 0.08,
          animationDelay: '3s'
        }} />

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