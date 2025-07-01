import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  emoji: string;
  delay: number;
}

const particleEmojis = ['💰', '🧠', '💎', '🚀', '⚡', '🔥', '💫', '✨'];

interface FloatingParticlesProps {
  density?: number; // Number of particles (default: 6)
  speed?: number; // Animation speed multiplier (default: 1)
}

export default function FloatingParticles({ density = 6, speed = 1 }: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < density; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.8 + 0.5, // 0.5 to 1.3
          speed: (Math.random() * 0.5 + 0.5) * speed, // 0.5 to 1.0 * speed
          emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
          delay: Math.random() * 5 // Random delay 0-5 seconds
        });
      }
      setParticles(newParticles);
    };

    createParticles();
  }, [density, speed]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-pulse opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}rem`,
            animationDuration: `${3 / particle.speed}s`,
            animationDelay: `${particle.delay}s`,
            transform: 'translate(-50%, -50%)',
            animation: `floatAround ${15 / particle.speed}s ease-in-out infinite`
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
}