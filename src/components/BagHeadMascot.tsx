import { useMemeTooltip } from '../hooks/useMemeTooltip';
import React, { useState } from 'react';
import './BagHead.css';

const BagHeadMascot = () => {
  const [quote, setQuote] = useState('');
  const meme = useMemeTooltip();

  const handleClick = () => {
    setQuote(meme);
    setTimeout(() => setQuote(''), 3000); // clear after 3 seconds
  };

  return (
    <div className="baghead-wrapper" onClick={handleClick}>
      <img src="/baghead-mascot.png" alt="BagHead" className="baghead-img" />
      {quote && <div className="baghead-bubble">{quote}</div>}
    </div>
  );
};

export default BagHeadMascot;