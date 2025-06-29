import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useMobilePopover } from '../hooks/useMobilePopover';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { MobilePopover } from './MobilePopover';
import LeaderboardPreview from './LeaderboardPreview';
import { useConfetti } from '../hooks/useConfetti';
import XFeed from './TwitterFeed';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    tooltip: string;
    points: number;
  }[];
}

// Expanded question pool - users will get 10 random questions from this pool
const questionPool: Question[] = [
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
    question: "Your portfolio is down 90%. What's your next move?",
    options: [
      { text: "Buy more to average down", tooltip: "The way of the true believer", points: 20 },
      { text: "Pretend it never happened", tooltip: "Ignorance is bliss strategy", points: 15 },
      { text: "Start a support group", tooltip: "Misery loves company", points: 18 },
      { text: "Blame the whales", tooltip: "Classic deflection technique", points: 12 }
    ]
  },
  {
    id: 5,
    question: "What's the best time to sell?",
    options: [
      { text: "Never", tooltip: "Diamond hands forever", points: 22 },
      { text: "When my mom asks about crypto", tooltip: "Top signal detected", points: 25 },
      { text: "During a family dinner", tooltip: "Maximum FOMO indicator", points: 20 },
      { text: "What is selling?", tooltip: "True HODL spirit", points: 24 }
    ]
  },
  {
    id: 6,
    question: "How do you handle market crashes?",
    options: [
      { text: "Delete all apps", tooltip: "Out of sight, out of mind", points: 15 },
      { text: "Buy the dip with life savings", tooltip: "Ultimate risk tolerance", points: 20 },
      { text: "Meditate with bag emojis", tooltip: "Zen and the art of bag holding", points: 18 },
      { text: "Start a podcast about it", tooltip: "Turn pain into content", points: 16 }
    ]
  },
  {
    id: 7,
    question: "What's your risk management strategy?",
    options: [
      { text: "Risk? Never heard of it", tooltip: "YOLO is the only way", points: 14 },
      { text: "Diversify across 47 memecoins", tooltip: "Maximum diversification", points: 12 },
      { text: "Only invest what I can lose", tooltip: "Boring but smart", points: 25 },
      { text: "Ask the magic 8-ball", tooltip: "Divination-based investing", points: 8 }
    ]
  },
  {
    id: 8,
    question: "How often do you check crypto prices?",
    options: [
      { text: "Every 3 seconds", tooltip: "Chart addiction level: Expert", points: 10 },
      { text: "Only during meals", tooltip: "Moderate addiction", points: 15 },
      { text: "When I remember", tooltip: "Zen master level", points: 22 },
      { text: "What are prices?", tooltip: "Transcended material concerns", points: 25 }
    ]
  },
  {
    id: 9,
    question: "What's your reaction to new crypto projects?",
    options: [
      { text: "FOMO in immediately", tooltip: "First to ape, first to escape", points: 8 },
      { text: "Read the whitepaper", tooltip: "Due diligence warrior", points: 24 },
      { text: "Check if logo is cute", tooltip: "Aesthetic investor", points: 12 },
      { text: "Wait for influencer approval", tooltip: "Follower mentality", points: 6 }
    ]
  },
  {
    id: 10,
    question: "What defines a successful crypto day?",
    options: [
      { text: "Portfolio goes up", tooltip: "Simple pleasures", points: 15 },
      { text: "Learn something new", tooltip: "Knowledge seeker", points: 22 },
      { text: "Don't check prices", tooltip: "Inner peace achieved", points: 25 },
      { text: "Survive another day", tooltip: "Realistic expectations", points: 18 }
    ]
  },
  {
    id: 11,
    question: "You're considering a new DeFi protocol. What's your research strategy?",
    options: [
      { text: "Read the whitepaper thoroughly", tooltip: "Academic approach - good fundamentals", points: 24 },
      { text: "Check if it's trending on Twitter", tooltip: "Social sentiment matters in crypto", points: 16 },
      { text: "See how much APY they're offering", tooltip: "Yield hunter mentality", points: 12 },
      { text: "YOLO if the logo looks cool", tooltip: "Peak degen behavior", points: 8 }
    ]
  },
  {
    id: 12,
    question: "The market crashes 40% overnight. Your move?",
    options: [
      { text: "Buy the dip with everything", tooltip: "Diamond hands activated", points: 20 },
      { text: "Hold and wait it out", tooltip: "Patience is a virtue", points: 24 },
      { text: "Panic sell at the bottom", tooltip: "Classic retail move", points: 6 },
      { text: "Delete all apps and touch grass", tooltip: "Sometimes the best strategy", points: 18 }
    ]
  },
  {
    id: 13,
    question: "You discover a 10,000% APY farm. Your reaction?",
    options: [
      { text: "Immediately ape in with life savings", tooltip: "FOMO overload", points: 4 },
      { text: "Research the tokenomics first", tooltip: "Smart degen behavior", points: 25 },
      { text: "Wait to see if others get rugged", tooltip: "Learning from others' mistakes", points: 22 },
      { text: "Screenshot and meme about it", tooltip: "Social media degen", points: 14 }
    ]
  },
  {
    id: 14,
    question: "Your friend asks for crypto advice. You tell them:",
    options: [
      { text: "Start with Bitcoin and Ethereum", tooltip: "Solid foundation advice", points: 24 },
      { text: "Buy whatever I'm holding", tooltip: "Classic bag holder move", points: 10 },
      { text: "DYOR and never trust anyone", tooltip: "Harsh but true wisdom", points: 25 },
      { text: "Send them to YouTube University", tooltip: "Passing the responsibility", points: 12 }
    ]
  },
  {
    id: 15,
    question: "You're stuck in a liquidity pool with impermanent loss. Strategy?",
    options: [
      { text: "Hold until it recovers", tooltip: "Long-term thinking", points: 22 },
      { text: "Cut losses and exit now", tooltip: "Sometimes necessary", points: 18 },
      { text: "Double down with more liquidity", tooltip: "Averaging down strategy", points: 16 },
      { text: "Pray to the DeFi gods", tooltip: "When all else fails", points: 8 }
    ]
  },
  {
    id: 16,
    question: "New L2 chain launches with airdrops. Your strategy?",
    options: [
      { text: "Bridge immediately for maximum exposure", tooltip: "Early adopter advantage", points: 20 },
      { text: "Wait for the hype to die down", tooltip: "Patient approach", points: 16 },
      { text: "Use multiple wallets for farming", tooltip: "Advanced degen tactics", points: 24 },
      { text: "Ignore it completely", tooltip: "Missing opportunities", points: 6 }
    ]
  },
  {
    id: 17,
    question: "You find a token with a 90% discount from ATH. Thoughts?",
    options: [
      { text: "Obviously a great buying opportunity", tooltip: "Value investing mindset", points: 14 },
      { text: "Research why it fell so hard", tooltip: "Due diligence first", points: 25 },
      { text: "It's probably going to zero", tooltip: "Realistic assessment", points: 18 },
      { text: "Check if the team is still active", tooltip: "Fundamental analysis", points: 22 }
    ]
  },
  {
    id: 18,
    question: "Your portfolio is 80% down but you still believe. You:",
    options: [
      { text: "Keep DCA-ing down", tooltip: "Conviction play", points: 22 },
      { text: "Take a break from charts", tooltip: "Mental health matters", points: 20 },
      { text: "Start a Twitter thread about holding", tooltip: "Copium distribution", points: 12 },
      { text: "Begin the five stages of grief", tooltip: "Natural process", points: 16 }
    ]
  },
  {
    id: 19,
    question: "A new memecoin is pumping 1000%. Your FOMO level?",
    options: [
      { text: "Already bought the top", tooltip: "Classic FOMO victim", points: 4 },
      { text: "Watching from the sidelines", tooltip: "Disciplined approach", points: 24 },
      { text: "Buying a small bag for fun", tooltip: "Controlled gambling", points: 16 },
      { text: "Shorting it at the peak", tooltip: "Contrarian strategy", points: 20 }
    ]
  },
  {
    id: 20,
    question: "You wake up to find your wallet drained by a smart contract exploit. First thought?",
    options: [
      { text: "How did this happen?", tooltip: "Seeking understanding", points: 18 },
      { text: "At least I learned something", tooltip: "Growth mindset", points: 22 },
      { text: "Time to quit crypto forever", tooltip: "Emotional response", points: 8 },
      { text: "This is why I only use testnets", tooltip: "Should have been careful", points: 14 }
    ]
  }
];

// Function to get random questions from the pool
const getRandomQuestions = (pool: Question[], count: number): Question[] => {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, index) => ({ ...q, id: index + 1 }));
};

export default function BagBrainIQTest() {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [username, setUsername] = useState('');
  const [isHighScore, setIsHighScore] = useState(false);
  const [autoRevealLeaderboard, setAutoRevealLeaderboard] = useState(false);

  const { activePopover, togglePopover } = useMobilePopover();
  const { addScore, data: leaderboardData } = useLeaderboard();
  const { fireConfetti } = useConfetti();

  // Check if score qualifies for leaderboard and trigger effects
  useEffect(() => {
    if (showResults) {
      const celebrateResults = () => {
        console.log('Triggering celebration effects...');
        fireConfetti(); // This now includes audio
      };
      
      // Small delay to ensure DOM is ready
      setTimeout(celebrateResults, 100);
      
      // Auto-reveal leaderboard after 2 seconds
      setTimeout(() => {
        setAutoRevealLeaderboard(true);
      }, 2000);
    }
  }, [showResults, fireConfetti]);

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateIQ = () => {
    const totalPoints = answers.reduce((sum, points) => sum + points, 0);
    const maxPoints = selectedQuestions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.points)), 0);
    const baseScore = Math.floor((totalPoints / maxPoints) * 8000) + Math.floor(Math.random() * 2000);
    return Math.min(baseScore, 10000);
  };

  const getMemeGrade = (iq: number) => {
    // Different meme grades for each score range - randomized each time
    const gradesByRange = {
      legendary: [
        "🧠 Supreme Baglord",
        "💎 Diamond-Handed Deity", 
        "🚀 Galactic Bagmaster",
        "⚡ Transcendent Degen",
        "🏆 Omega Brain Champion"
      ],
      elite: [
        "💎 Elite Bag Strategist",
        "🔥 Master of the Bags", 
        "⚡ High IQ Degen",
        "🎯 Apex Bag Holder",
        "🧠 Big Brain Energy"
      ],
      advanced: [
        "🚀 Advanced Bag Scientist",
        "💰 Professional Hodler",
        "📈 Crypto Sage",
        "🎯 Strategic Bag Manager",
        "⚡ Lightning Brain"
      ],
      intermediate: [
        "🔥 Developing Bag Wisdom",
        "📊 Chart Reading Apprentice",
        "💡 Growing Brain Power",
        "🌟 Rising Degen Star",
        "🎲 Calculated Risk Taker"
      ],
      beginner: [
        "🌱 Baby Bag Holder",
        "📚 Crypto Student",
        "🎯 Learning the Ropes",
        "💭 Thoughtful Newbie",
        "🔰 Promising Padawan"
      ],
      potato: [
        "🥔 Lovable Potato Brain",
        "😅 Adorable Smooth Brain", 
        "🎪 Magnificent Disaster",
        "🤡 Endearing Chaos Agent",
        "💫 Beautiful Hot Mess"
      ]
    };

    let grades;
    if (iq >= 8500) grades = gradesByRange.legendary;
    else if (iq >= 7000) grades = gradesByRange.elite;
    else if (iq >= 5000) grades = gradesByRange.advanced;
    else if (iq >= 3000) grades = gradesByRange.intermediate;
    else if (iq >= 1500) grades = gradesByRange.beginner;
    else grades = gradesByRange.potato;

    // Return random grade from the appropriate range
    return grades[Math.floor(Math.random() * grades.length)];
  };

  const getIQRating = (iq: number) => {
    if (iq >= 9000) return "Over 9000! Legendary Status Achieved";
    if (iq >= 8000) return "Elite Tier - Diamond Brain Overlord";
    if (iq >= 7000) return "Galaxy Brain - Rocket Fuel Intelligence";
    if (iq >= 6000) return "Big Brain Energy - High Voltage Thinking";
    if (iq >= 5000) return "Above Average - Master Strategist";
    if (iq >= 4000) return "Respectable - Solid Foundation";
    if (iq >= 3000) return "On the Rise - Growing Power";
    if (iq >= 2000) return "Learning Mode - Developing Wisdom";
    if (iq >= 1000) return "Chaos Theory - Random Walk Brain";
    return "Potato Brain (But we love you anyway)";
  };

  const handleClaimBadge = () => {
    fireConfetti();
    setClaimed(true);
    console.log("🏆 BagBrain IQ Badge claimed successfully!");
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
    setAutoRevealLeaderboard(false);
    setSelectedQuestions([]); // Clear questions to generate new random set
    setShowIntro(true);
  };

  const startTest = () => {
    // Generate random set of 10 questions when starting the test
    const randomQuestions = getRandomQuestions(questionPool, 10);
    setSelectedQuestions(randomQuestions);
    setShowIntro(false);
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

  const shareToX = (iq: number, memeGrade: string, rating: string) => {
    const text = `I just scored ${iq.toLocaleString()} on the BagBrain IQ Test! I'm officially a ${memeGrade}! 🧠💰 Join the cult of BagBrain and test your own intelligence at`;
    const url = window.location.origin;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(xUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = (iq: number, memeGrade: string, rating: string) => {
    const url = window.location.origin;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`I scored ${iq.toLocaleString()} on the BagBrain IQ Test! I'm a ${memeGrade}! Test your BagBrain intelligence now!`)}`;
    window.open(facebookUrl, '_blank', 'width=580,height=296');
  };

  const shareToInstagram = (iq: number, memeGrade: string, rating: string) => {
    // Instagram doesn't have direct URL sharing, so we copy to clipboard with instructions
    const shareText = `I scored ${iq.toLocaleString()} on the BagBrain IQ Test! I'm a ${memeGrade}! 🧠💰\n\nTest your BagBrain intelligence: ${window.location.origin}\n\n#BagBrain #IQTest #Meme #Crypto`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Share text copied to clipboard! Paste it in your Instagram story or post.');
    });
  };

  const shareGeneric = (iq: number, memeGrade: string, rating: string) => {
    const shareData = {
      title: 'BagBrain IQ Test Results',
      text: `I scored ${iq.toLocaleString()} on the BagBrain IQ Test! I'm a ${memeGrade}! Test your own BagBrain intelligence.`,
      url: window.location.origin
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback to clipboard
      const shareText = `${shareData.text}\n\n${shareData.url}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Share text copied to clipboard!');
      });
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/bagbrain-intro.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-4xl mx-auto text-center px-2 sm:px-4">
            <div className="bg-black/50 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-4 sm:p-8 md:p-12">
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold glow-gold mb-4 sm:mb-6">
                🧠 The IQ Test for Degens
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl glow-text mb-6 sm:mb-8">
                Prove you've got Bags for Brains
              </p>
              
              <div className="text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2">
                <p className="glow-text">
                  🎯 <strong>Random questions every time</strong> - Get 10 unique questions from our pool of crypto wisdom
                </p>
                <p className="glow-text">
                  💰 <strong>Score up to 10,000 points</strong> based on your DeFi intelligence and meme knowledge
                </p>
                <p className="glow-text">
                  🏆 <strong>Claim your place</strong> on the BagBrain leaderboard and flex your IQ
                </p>
                <p className="glow-text">
                  🔄 <strong>Take it again:</strong> Different questions each time means unlimited chances to prove your genius
                </p>
                <p className="glow-text">
                  🧠 <strong>Remember:</strong> In the world of bags and brains, intelligence is optional but bags are forever
                </p>
              </div>
              
              <button
                onClick={startTest}
                className="btn-lg btn-primary px-6 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider w-full sm:w-auto"
              >
                🚀 Start the Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const iq = calculateIQ();
    const memeGrade = getMemeGrade(iq);
    const rating = getIQRating(iq);

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/bagbrain-results-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-4xl mx-auto text-center px-2 sm:px-4">
            <div className="bg-black/60 backdrop-blur-lg border border-amber-500/40 rounded-2xl p-4 sm:p-8 md:p-12">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold glow-gold mb-6 sm:mb-8">
                🧠 Your IQ Results
              </h1>
              
              <div className="mb-6 sm:mb-8">
                <div className="text-4xl sm:text-6xl md:text-8xl font-bold glow-gold mb-4">
                  {iq.toLocaleString()}
                </div>
                
                {/* Meme Grade - Prominent Display */}
                <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-amber-500/50 rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 mx-2 sm:mx-0">
                  <div className="text-xl sm:text-3xl md:text-4xl font-bold glow-purple mb-2">
                    🏅 Your Meme Grade
                  </div>
                  <div className="text-lg sm:text-2xl md:text-3xl glow-gold font-bold break-words">
                    {memeGrade}
                  </div>
                </div>
                
                <div className="text-base sm:text-xl md:text-2xl glow-text mb-4 sm:mb-6 px-2">
                  {rating}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 px-2 sm:px-0">
                <button
                  onClick={restartTest}
                  className="btn-lg btn-primary w-full mb-4"
                >
                  🎲 Get New Random Questions
                </button>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <button
                    onClick={() => shareToX(iq, memeGrade, rating)}
                    className="btn-lg bg-black hover:bg-gray-900 text-white border-2 border-gray-600 hover:border-gray-400"
                  >
                    🅧 X
                  </button>
                  <button
                    onClick={() => shareToFacebook(iq, memeGrade, rating)}
                    className="btn-lg bg-blue-700 hover:bg-blue-800 text-white"
                  >
                    📘 Facebook
                  </button>
                  <button
                    onClick={() => shareToInstagram(iq, memeGrade, rating)}
                    className="btn-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    📷 Instagram
                  </button>
                  <button
                    onClick={() => shareGeneric(iq, memeGrade, rating)}
                    className="btn-lg bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    📤 Share
                  </button>
                </div>
              </div>

              {/* Leaderboard Section */}
              {autoRevealLeaderboard && (
                <div className="mt-6 sm:mt-8 fade-in px-2 sm:px-0">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold glow-gold mb-4 sm:mb-6">
                    🏆 Current Leaderboard
                  </h3>
                  <LeaderboardPreview />
                </div>
              )}

              {/* Twitter Feed Section */}
              <div className="mt-8 sm:mt-12 px-2 sm:px-0">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold glow-gold mb-4 sm:mb-6">
                  🅧 Follow @ImBaggedUp
                </h3>
                <XFeed 
                  username="ImBaggedUp" 
                  height={300}
                  theme="dark"
                  className="max-w-full sm:max-w-2xl mx-auto"
                />
              </div>

              <div className="mt-6 sm:mt-8 px-2 sm:px-0">
                <Link href="/">
                  <button className="btn-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto">
                    🏠 Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = selectedQuestions[currentQuestion];

  return (
    <div 
      className="min-h-screen p-2 sm:p-4 md:p-6 flex items-center justify-center relative"
      style={{
        backgroundImage: `url(/bagbrain-q${currentQuestion + 1}.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Simplified overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"></div>
      
      <div className="w-full max-w-4xl bg-black/85 rounded-lg border-2 border-amber-500/50 p-3 sm:p-6 md:p-10 relative z-10 overflow-hidden backdrop-blur-sm shadow-2xl mx-2 sm:mx-4">
        <div className="mb-6 sm:mb-10 md:mb-12 relative z-10">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold glow-gold">🧠 BagBrain IQ Test</h1>
              <Link href="/">
                <button className="text-lg sm:text-xl md:text-2xl glow-gold opacity-75 hover:opacity-100 px-2 sm:px-4 py-1 sm:py-2">
                  ← Back
                </button>
              </Link>
            </div>
            <div className="text-center">
              <div className="text-base sm:text-xl md:text-2xl glow-gold opacity-75">
                Question {currentQuestion + 1} of {selectedQuestions.length}
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-3 sm:h-4 mb-4 sm:mb-6">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 sm:h-4 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6 sm:mb-10 md:mb-12">
          <h2 className="text-lg sm:text-3xl md:text-5xl glow-gold mb-6 sm:mb-8 md:mb-12 text-center leading-relaxed px-1 sm:px-2">
            {question.question}
          </h2>
          
          <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6">
            {question.options.map((option, index) => (
              <MobilePopover 
                key={index}
                id={`q${question.id}-option${index}`} 
                content={`${option.tooltip} [${option.points} points]`}
                isActive={activePopover === `q${question.id}-option${index}`} 
                onToggle={togglePopover}
              >
                <button
                  onClick={() => handleAnswer(option.points)}
                  className="iq-answer-choice w-full p-3 sm:p-6 md:p-8 bg-black border-2 border-amber-500/40 rounded-xl text-left glow-gold hover:border-amber-500/80 transition-all duration-300 text-base sm:text-3xl md:text-4xl leading-relaxed hover:scale-[1.02] active:scale-[0.98] min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] flex items-center cursor-help"
                >
                  <span className="font-bold text-amber-400 mr-2 sm:mr-4 md:mr-6 text-lg sm:text-4xl md:text-5xl flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
                  <span className="flex-1 break-words">{option.text}</span>
                </button>
              </MobilePopover>
            ))}
          </div>
        </div>

        <div className="text-center text-base sm:text-lg glow-gold opacity-50 pt-4 sm:pt-6">
          <MobilePopover 
            id="disclaimer" 
            content="This is a fun meme quiz - results are for entertainment only!" 
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