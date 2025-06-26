import { useEffect, useState } from 'react';

const ViralBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, emoji: string, x: number, delay: number}>>([]);

  useEffect(() => {
    // Create money rain particles
    const moneyEmojis = ['💰', '💎', '🪙', '$', '💵', '🤑', '🧠', '⭐'];
    const newParticles: Array<{id: number, emoji: string, x: number, delay: number}> = [];
    
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)],
        x: (i * 4) % 100, // Better distribution
        delay: (i * 0.6) % 15
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
        
        {/* BagBrain Character Backgrounds - Full Coverage */}
        {/* Top Section */}
        <div className="absolute top-10 left-8 w-24 md:w-32 h-24 md:h-32 opacity-10 animate-float-delayed">
          <img
            src="/bagbrain-confused.png"
            alt="Confused BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        
        <div className="absolute top-16 right-12 w-20 md:w-28 h-20 md:h-28 opacity-8 animate-float-delayed-2">
          <img
            src="/bagbrain-cool.png"
            alt="Cool BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        
        {/* Middle Section */}
        <div className="absolute top-1/2 left-1/4 w-28 md:w-36 h-28 md:h-36 opacity-12 animate-float-delayed hidden md:block">
          <img
            src="/bagbrain-mascot-new.png"
            alt="Mascot BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        
        <div className="absolute top-1/2 right-1/3 w-24 md:w-30 h-24 md:h-30 opacity-8 animate-float-delayed-3">
          <img
            src="/bagbrain-confused.png"
            alt="Confused BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        
        {/* Bottom Section */}
        <div className="absolute bottom-20 left-1/3 w-32 md:w-40 h-32 md:h-40 opacity-15 animate-float-delayed-2">
          <img
            src="/bagbrain-cool.png"
            alt="Cool BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        
        <div className="absolute bottom-24 right-16 w-26 md:w-32 h-26 md:h-32 opacity-10 animate-float-delayed">
          <img
            src="/bagbrain-mascot-new.png"
            alt="Mascot BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        
        {/* Corner Coverage */}
        <div className="absolute top-5 right-5 w-18 md:w-24 h-18 md:h-24 opacity-6 animate-float-delayed-3">
          <img
            src="/bagbrain-confused.png"
            alt="Corner BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        
        <div className="absolute bottom-8 left-8 w-20 md:w-26 h-20 md:h-26 opacity-8 animate-float-delayed">
          <img
            src="/bagbrain-cool.png"
            alt="Corner Cool BagBrain Background"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>

        {/* Additional coverage for larger screens */}
        <div className="absolute top-1/3 left-12 w-22 md:w-28 h-22 md:h-28 opacity-7 animate-float-delayed-2 hidden lg:block">
          <img
            src="/bagbrain-mascot-new.png"
            alt="Extra Coverage BagBrain"
            className="w-full h-full object-contain"
            loading="eager"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>

        {/* Floating brain particles - Enhanced Coverage */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`brain-${i}`}
            className="brain-particle"
            style={{
              left: `${5 + i * 8}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${18 + (i % 4)}s`
            }}
          >
            🧠
          </div>
        ))}
        
        {/* Golden sparkles - Full Coverage */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="brain-particle"
            style={{
              left: `${3 + i * 6.5}%`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${16 + (i % 5)}s`,
              fontSize: '16px'
            }}
          >
            {['✨', '⭐', '💫'][i % 3]}
          </div>
        ))}
        
        {/* Rocket particles for movement */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`rocket-${i}`}
            className="brain-particle"
            style={{
              left: `${10 + i * 11}%`,
              animationDelay: `${i * 4}s`,
              animationDuration: `${20 + (i % 3)}s`,
              fontSize: '18px'
            }}
          >
            🚀
          </div>
        ))}
      </div>
    </>
  );
};

export default ViralBackground;