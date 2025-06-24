import { useState, useEffect } from 'react';

const phrases = [
  "🧠 I have bags for brains",
  "💰 Vaults don't lie",
  "🚀 Bag it before it moons",
  "👽 Degens welcome",
  "👜 Heavy bags = heavy gains",
  "📈 This is the way",
  "🐸 Only brains survive"
];

export const useMemeTooltip = () => {
  const [phrase, setPhrase] = useState(phrases[0]);

  useEffect(() => {
    const rotate = () => {
      const random = Math.floor(Math.random() * phrases.length);
      setPhrase(phrases[random]);
    };
    rotate();
  }, []);

  return phrase;
};