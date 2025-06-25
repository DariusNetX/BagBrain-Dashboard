import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useMobilePopover } from '../hooks/useMobilePopover';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { MobilePopover } from './MobilePopover';
import { useConfetti } from '../hooks/useConfetti';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    tooltip: string;
    points: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your investment strategy?",
    options: [
      { text: "Buy high, sell higher", tooltip: "The optimist's guide to financial ruin", points: 12 },
      { text: "HODL 'til Valhalla", tooltip: "Diamond hands meet Norse mythology", points: 18 },
      { text: "All in on BagBrain", tooltip: "The only logical choice for cultured individuals", points: 25 },
      { text: "Ask my cat", tooltip: "Feline financial advice is surprisingly accurate", points: 15 }
    ]
  },
  {
    id: 2,
    question: "How do you identify a true bag holder?",
    options: [
      { text: "They check charts every 30 seconds", tooltip: "Chart addiction is a lifestyle choice", points: 12 },
      { text: "They have diamond tattoos", tooltip: "Permanent commitment to the cause", points: 18 },
      { text: "They speak only in rocket emojis", tooltip: "🚀🚀🚀 The universal language", points: 16 },
      { text: "They still believe in their 2021 portfolio", tooltip: "Hope dies last, bags die never", points: 25 }
    ]
  },
  {
    id: 3,
    question: "What's the scientific name for bag brain syndrome?",
    options: [
      { text: "Crypticus Obsessicus", tooltip: "A highly contagious condition", points: 14 },
      { text: "Diamond Handicus", tooltip: "The medical term for unshakeable grip", points: 17 },
      { text: "Moonboy Maximus", tooltip: "Advanced stage of hopium addiction", points: 19 },
      { text: "All of the above", tooltip: "Big brain energy detected", points: 22 }
    ]
  },
  {
    id: 4,
    question: "When someone says 'This is financial advice':",
    options: [
      { text: "Take out a second mortgage", tooltip: "Leveraging your home for memes? Bold.", points: 8 },
      { text: "Run away screaming", tooltip: "Sometimes retreat is the wisest strategy", points: 15 },
      { text: "Double down immediately", tooltip: "Go big or go broke. No middle ground.", points: 20 },
      { text: "Ask for their license number", tooltip: "Boring but technically correct", points: 5 }
    ]
  },
  {
    id: 5,
    question: "The best time to buy crypto is:",
    options: [
      { text: "When your wife's boyfriend approves", tooltip: "Consensual financial decisions matter", points: 13 },
      { text: "During a family dinner argument", tooltip: "Peak emotional trading for maximum losses", points: 18 },
      { text: "At 3 AM after scrolling crypto Twitter", tooltip: "The witching hour of bad decisions", points: 21 },
      { text: "Never, I only stake $BAG", tooltip: "Cultured individual detected", points: 30 }
    ]
  },
  {
    id: 6,
    question: "How many brain cells does it take to understand DeFi?",
    options: [
      { text: "All of them", tooltip: "Every single neuron working overtime", points: 12 },
      { text: "What are brain cells?", tooltip: "Transcended beyond biological limitations", points: 25 },
      { text: "Just the smooth ones", tooltip: "Smooth brain = smooth sailing", points: 20 },
      { text: "I put my brain in the bag", tooltip: "The ultimate BagBrain enlightenment", points: 35 }
    ]
  },
  {
    id: 7,
    question: "The ultimate sign of BagBrain mastery is:",
    options: [
      { text: "Explaining blockchain to your grandmother", tooltip: "Teaching the ancient arts to elders", points: 16 },
      { text: "Dreaming in candlestick patterns", tooltip: "When charts invade your subconscious", points: 18 },
      { text: "Converting your salary to $BAG tokens", tooltip: "Living the full BagBrain lifestyle", points: 28 },
      { text: "I AM the bag", tooltip: "Achieved perfect unity with the bags", points: 40 }
    ]
  },
  {
    id: 8,
    question: "What's your preferred method of FOMO management?",
    options: [
      { text: "Buy first, research later", tooltip: "The classic impulse purchase strategy", points: 12 },
      { text: "Set price alerts then ignore them", tooltip: "The art of selective hearing", points: 16 },
      { text: "Join every Discord and panic equally", tooltip: "Democratic distribution of anxiety", points: 20 },
      { text: "Embrace the chaos, become one with FOMO", tooltip: "Zen master of market madness", points: 25 }
    ]
  },
  {
    id: 9,
    question: "When the market crashes, you:",
    options: [
      { text: "Sell everything and hide", tooltip: "Sometimes survival instincts kick in", points: 8 },
      { text: "Buy the dip with your lunch money", tooltip: "Ramen noodles for financial freedom", points: 18 },
      { text: "Tattoo 'HODL' on your forehead", tooltip: "Permanent commitment to the cause", points: 22 },
      { text: "Thank the market for the discount", tooltip: "Advanced BagBrain enlightenment achieved", points: 30 }
    ]
  },
  {
    id: 10,
    question: "Complete this sentence: 'Wen moon?'",
    options: [
      { text: "Soon™", tooltip: "The eternal promise of crypto", points: 14 },
      { text: "After I sell", tooltip: "Murphy's Law of cryptocurrency", points: 19 },
      { text: "Moon is a state of mind", tooltip: "Philosophy meets portfolio", points: 24 },
      { text: "We ARE the moon", tooltip: "Ultimate BagBrain transcendence", points: 35 }
    ]
  }
];

export default function BagBrainIQTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [username, setUsername] = useState('');
  const [isHighScore, setIsHighScore] = useState(false);
  const { activePopover, togglePopover } = useMobilePopover();
  const { fireConfetti } = useConfetti();
  const { topScores, addScore, isAddingScore, checkHighScore } = useLeaderboard();

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateIQ = () => {
    const totalPoints = answers.reduce((sum, points) => sum + points, 0);
    const maxPoints = questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.points)), 0);
    const baseScore = Math.floor((totalPoints / maxPoints) * 8000) + Math.floor(Math.random() * 2000);
    return Math.min(baseScore, 10000);
  };

  const getIQRating = (iq: number) => {
    if (iq >= 9000) return "🧠 Transcendent BagBrain Deity - Over 9000!";
    if (iq >= 8000) return "💎 Diamond Brain Overlord - Elite Tier";
    if (iq >= 7000) return "🚀 Rocket Fuel Intelligence - Galaxy Brain";
    if (iq >= 6000) return "⚡ High Voltage Brain - Big Brain Energy";
    if (iq >= 5000) return "🎯 Master Bag Strategist - Above Average";
    if (iq >= 4000) return "🔥 Solid Brain Foundation - Respectable";
    if (iq >= 3000) return "📈 Growing Brain Power - On the Rise";
    if (iq >= 2000) return "🌱 Developing Bag Wisdom - Learning Mode";
    if (iq >= 1000) return "🎲 Random Walk Brain - Chaos Theory";
    return "🥔 Potato Brain (But we love you anyway)";
  };

  const handleClaimBadge = () => {
    fireConfetti();
    setClaimed(true);
    console.log("🏆 BagBrain IQ Badge claimed successfully!");
    setTimeout(() => {
      alert("🎭 Your BagBrain IQ Badge has been minted to your soul! Check your inner consciousness for confirmation.");
    }, 1000);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setClaimed(false);
    setShowLeaderboard(false);
    setShowUsernameInput(false);
    setUsername('');
    setIsHighScore(false);
  };

  const handleSubmitUsername = () => {
    if (username.trim()) {
      const iq = calculateIQ();
      addScore({ username: username.trim(), score: iq });
      setShowUsernameInput(false);
      setShowLeaderboard(true);
      fireConfetti();
    }
  };

  const shareToTwitter = (iq: number, rating: string) => {
    const text = `I just scored ${iq.toLocaleString()} on the BagBrain IQ Test! I'm officially ${rating}! 🧠💰 Join the cult of BagBrain and test your own intelligence at`;
    const url = window.location.origin;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = (iq: number, rating: string) => {
    const url = window.location.origin;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`I scored ${iq.toLocaleString()} on the BagBrain IQ Test! I'm ${rating}! Test your BagBrain intelligence now!`)}`;
    window.open(facebookUrl, '_blank', 'width=580,height=296');
  };

  const shareToInstagram = (iq: number, rating: string) => {
    // Instagram doesn't have direct URL sharing, so we copy to clipboard with instructions
    const shareText = `I scored ${iq.toLocaleString()} on the BagBrain IQ Test! I'm ${rating}! 🧠💰\n\nTest your BagBrain intelligence: ${window.location.origin}\n\n#BagBrain #IQTest #Meme #Crypto`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Share text copied to clipboard! Paste it in your Instagram story or post.');
    });
  };

  const shareGeneric = (iq: number, rating: string) => {
    const shareData = {
      title: 'BagBrain IQ Test Results',
      text: `I scored ${iq.toLocaleString()} on the BagBrain IQ Test! I'm ${rating}! Test your own BagBrain intelligence.`,
      url: window.location.origin
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      const shareText = `${shareData.text}\n\n${shareData.url}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Share text copied to clipboard!');
      });
    }
  };

  // Check if score qualifies for leaderboard when results are shown
  useEffect(() => {
    if (showResults && !isHighScore) {
      const iq = calculateIQ();
      checkHighScore(iq).then((result) => {
        setIsHighScore(result);
        console.log('High score check:', iq, result);
      });
    }
  }, [showResults, isHighScore, checkHighScore]);

  if (showLeaderboard) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-black/60 rounded-lg border border-amber-500/30 p-10 text-center">
          <h1 className="text-5xl font-bold mb-10 glow-gold">
            🏆 BagBrain IQ Leaderboard
          </h1>
          
          <div className="mb-12">
            {topScores.length > 0 ? (
              <div className="space-y-6">
                {topScores.map((score, index) => (
                  <div 
                    key={score.id} 
                    className={`p-6 rounded-lg border ${
                      index === 0 ? 'border-yellow-500/50 bg-yellow-900/20' :
                      index === 1 ? 'border-gray-400/50 bg-gray-800/20' :
                      'border-amber-600/50 bg-amber-900/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                        <span className="text-2xl glow-gold font-bold">
                          {score.username}
                        </span>
                      </div>
                      <span className="text-2xl glow-gold font-bold">
                        {score.score.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="glow-gold text-xl">No scores recorded yet. Be the first!</p>
            )}
          </div>

          <div className="flex gap-6 justify-center">
            <button 
              onClick={restartTest}
              className="btn-primary px-8 py-4 text-lg"
            >
              🔄 Test Again
            </button>
            
            <Link href="/">
              <button className="btn-primary px-8 py-4 text-lg">
                🏠 Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const iq = calculateIQ();
    const rating = getIQRating(iq);

    return (
      <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-black/60 rounded-lg border border-amber-500/30 p-6 sm:p-10 text-center mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10 glow-gold">
            🧠 Your BagBrain IQ Results
          </h1>
          
          <div className="mb-10 sm:mb-12">
            <div className="text-5xl sm:text-7xl font-bold glow-gold mb-4 sm:mb-6">
              {iq.toLocaleString()}
            </div>
            <div className="text-2xl sm:text-4xl glow-gold mb-4 sm:mb-6 px-4 break-words">
              {rating}
            </div>
            <p className="glow-gold text-lg sm:text-xl opacity-75 leading-relaxed px-4 mb-6 sm:mb-8">
              <MobilePopover 
                id="iq-explanation" 
                content="Your BagBrain intelligence quotient, scientifically calculated by meme algorithms on a scale of 0-10,000" 
                isActive={activePopover === 'iq-explanation'} 
                onToggle={togglePopover}
              >
                Calculated using advanced BagBrain quantum mechanics (0-10,000 scale)
              </MobilePopover>
            </p>
            
            {/* BagBrain Character Image */}
            <div className="flex justify-center mb-8">
              <img 
                src="/bagbrain-results.png" 
                alt="BagBrain Character celebrating your results" 
                className="w-48 h-48 sm:w-64 sm:h-64 object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 247, 0, 0.3))'
                }}
                onError={(e) => {
                  console.log('BagBrain results character failed to load');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          <div className="bg-black/40 border border-amber-500/30 rounded-lg p-6 sm:p-8 mb-8">
            <h3 className="text-2xl sm:text-3xl glow-gold mb-4 sm:mb-6">🎭 Share Your BagBrain Achievement</h3>
            <p className="glow-gold mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed px-2">
              <MobilePopover 
                id="share-achievement" 
                content="Spread the BagBrain consciousness across the digital realm" 
                isActive={activePopover === 'share-achievement'} 
                onToggle={togglePopover}
              >
                <span className="cursor-pointer underline decoration-dotted">
                  Let the world know you've ascended to {rating} status! 
                </span>
              </MobilePopover>
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <button 
                onClick={() => shareToTwitter(iq, rating)}
                className="btn-primary px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center gap-2"
              >
                🐦 Twitter
              </button>
              
              <button 
                onClick={() => shareToFacebook(iq, rating)}
                className="btn-primary px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 flex items-center justify-center gap-2"
              >
                📘 Facebook
              </button>
              
              <button 
                onClick={() => shareToInstagram(iq, rating)}
                className="btn-primary px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 flex items-center justify-center gap-2"
              >
                📸 Instagram
              </button>
            </div>
            
            <button 
              onClick={() => shareGeneric(iq, rating)}
              className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full max-w-md mx-auto block"
            >
              📤 Share Anywhere
            </button>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {!claimed ? (
              <div className="flex justify-center">
                <MobilePopover 
                  id="claim-badge" 
                  content="Mint your achievement to the blockchain of consciousness" 
                  isActive={activePopover === 'claim-badge'} 
                  onToggle={togglePopover}
                >
                  <button 
                    onClick={handleClaimBadge}
                    className="btn-primary px-8 sm:px-10 py-4 sm:py-5 text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600"
                  >
                    🏆 Claim Your Badge
                  </button>
                </MobilePopover>
              </div>
            ) : (
              <div className="text-green-400 text-xl sm:text-2xl glow-gold py-4">
                ✅ Badge Claimed! You are now officially certified BagBrain.
              </div>
            )}

            {(isHighScore || calculateIQ() >= 5000) && !showUsernameInput && !showLeaderboard && (
              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6 sm:p-8 mx-auto max-w-2xl">
                <h3 className="text-xl sm:text-2xl glow-gold mb-4 sm:mb-6">🎉 HIGH SCORE ACHIEVED!</h3>
                <p className="glow-gold mb-4 sm:mb-6 text-base sm:text-lg">Your score of {calculateIQ().toLocaleString()} qualifies for the leaderboard!</p>
                <button 
                  onClick={() => setShowUsernameInput(true)}
                  className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-orange-600 hover:to-yellow-600"
                >
                  📝 Enter Leaderboard
                </button>
              </div>
            )}

            {showUsernameInput && (
              <div className="bg-black/40 border border-amber-500/30 rounded-lg p-6 sm:p-8 mx-auto max-w-2xl">
                <h3 className="text-xl sm:text-2xl glow-gold mb-4 sm:mb-6">Enter Your Username</h3>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your BagBrain alias..."
                  maxLength={20}
                  className="input-standard w-full mb-4 sm:mb-6 text-base sm:text-lg p-3 sm:p-4"
                />
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button 
                    onClick={handleSubmitUsername}
                    disabled={!username.trim() || isAddingScore}
                    className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                  >
                    {isAddingScore ? 'Adding...' : '🏆 Submit'}
                  </button>
                  <button 
                    onClick={() => setShowUsernameInput(false)}
                    className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg opacity-75"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4 sm:pt-6">
              <button 
                onClick={restartTest}
                className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg order-3 sm:order-1"
              >
                🔄 Test Again
              </button>
              
              <button 
                onClick={() => setShowLeaderboard(true)}
                className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg order-2 sm:order-2"
              >
                🏆 View Leaderboard
              </button>
              
              <Link href="/">
                <button className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg order-1 sm:order-3">
                  🏠 Back to Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-black/60 rounded-lg border border-amber-500/30 p-6 sm:p-10">
        <div className="mb-10 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h1 className="text-3xl sm:text-5xl font-bold glow-gold">🧠 BagBrain IQ Test</h1>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-lg sm:text-xl glow-gold opacity-75">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <Link href="/">
                <button className="text-lg sm:text-xl glow-gold opacity-75 hover:opacity-100 px-4 py-2">
                  ← Back
                </button>
              </Link>
            </div>
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-4 mb-6">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-amber-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl glow-gold mb-8 sm:mb-12 text-center leading-relaxed px-2">
            {question.question}
          </h2>
          
          <div className="flex flex-col space-y-4 sm:space-y-6">
            {question.options.map((option, index) => (
              <MobilePopover 
                key={index}
                id={`q${question.id}-option${index}`} 
                content={option.tooltip}
                isActive={activePopover === `q${question.id}-option${index}`} 
                onToggle={togglePopover}
              >
                <button
                  onClick={() => handleAnswer(option.points)}
                  className="w-full p-6 sm:p-8 bg-black/40 border-2 border-amber-500/20 rounded-xl text-left glow-gold hover:border-amber-500/60 hover:bg-black/70 transition-all duration-300 text-lg sm:text-xl leading-relaxed hover:scale-[1.02] active:scale-[0.98] min-h-[4rem] sm:min-h-[5rem] flex items-center"
                >
                  <span className="font-bold text-amber-400 mr-4 sm:mr-6 text-2xl sm:text-3xl flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
                  <span className="flex-1">{option.text}</span>
                </button>
              </MobilePopover>
            ))}
          </div>
        </div>

        <div className="text-center text-base sm:text-lg glow-gold opacity-50 pt-4 sm:pt-6">
          <MobilePopover 
            id="disclaimer" 
            content="No actual brains were harmed in the making of this test" 
            isActive={activePopover === 'disclaimer'} 
            onToggle={togglePopover}
          >
            * Results are 100% scientifically accurate and legally binding
          </MobilePopover>
        </div>
      </div>
    </div>
  );
}