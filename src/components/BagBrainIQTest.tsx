import { useState } from 'react';
import { Link } from 'wouter';
import { useMobilePopover } from '../hooks/useMobilePopover';
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
  }
];

export default function BagBrainIQTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const { activePopover, togglePopover } = useMobilePopover();
  const { fireConfetti } = useConfetti();

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
    const baseIQ = Math.floor((totalPoints / maxPoints) * 100) + Math.floor(Math.random() * 50) + 100;
    return Math.min(baseIQ, 420); // Cap at meme number
  };

  const getIQRating = (iq: number) => {
    if (iq >= 300) return "🧠 Transcendent BagBrain Deity";
    if (iq >= 250) return "💎 Diamond Brain Overlord";
    if (iq >= 200) return "🚀 Rocket Fuel Intelligence";
    if (iq >= 150) return "⚡ High Voltage Brain";
    if (iq >= 100) return "🎯 Standard Issue Bag Holder";
    return "🥔 Potato Brain (But we love you)";
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
  };

  if (showResults) {
    const iq = calculateIQ();
    const rating = getIQRating(iq);

    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-black/60 rounded-lg border border-amber-500/30 p-8 text-center">
          <h1 className="text-4xl font-bold mb-6 glow-gold">
            🧠 BagBrain IQ Results
          </h1>
          
          <div className="mb-8">
            <div className="text-6xl font-bold glow-gold mb-4">
              {iq}
            </div>
            <div className="text-2xl glow-gold mb-4">
              {rating}
            </div>
            <p className="glow-gold text-base opacity-75">
              <MobilePopover 
                id="iq-explanation" 
                content="Your BagBrain intelligence quotient, scientifically calculated by meme algorithms" 
                isActive={activePopover === 'iq-explanation'} 
                onToggle={togglePopover}
              >
                Calculated using advanced BagBrain quantum mechanics
              </MobilePopover>
            </p>
          </div>

          <div className="space-y-4">
            {!claimed ? (
              <MobilePopover 
                id="claim-badge" 
                content="Mint your achievement to the blockchain of consciousness" 
                isActive={activePopover === 'claim-badge'} 
                onToggle={togglePopover}
              >
                <button 
                  onClick={handleClaimBadge}
                  className="btn-primary px-8 py-4 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600"
                >
                  🏆 Claim Your Badge
                </button>
              </MobilePopover>
            ) : (
              <div className="text-green-400 text-xl glow-gold">
                ✅ Badge Claimed! You are now officially certified BagBrain.
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={restartTest}
                className="btn-primary px-6 py-3"
              >
                🔄 Test Again
              </button>
              
              <Link href="/">
                <button className="btn-primary px-6 py-3">
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
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-black/60 rounded-lg border border-amber-500/30 p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold glow-gold">🧠 BagBrain IQ Test</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm glow-gold opacity-75">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <Link href="/">
                <button className="text-sm glow-gold opacity-75 hover:opacity-100">
                  ← Back
                </button>
              </Link>
            </div>
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl glow-gold mb-6 text-center">
            {question.question}
          </h2>
          
          <div className="space-y-4">
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
                  className="w-full p-4 bg-black/40 border border-amber-500/20 rounded-lg text-left glow-gold hover:border-amber-500/50 hover:bg-black/60 transition-all"
                >
                  <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option.text}
                </button>
              </MobilePopover>
            ))}
          </div>
        </div>

        <div className="text-center text-sm glow-gold opacity-50">
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