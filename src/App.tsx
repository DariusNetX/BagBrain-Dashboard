import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Tooltip } from 'react-tooltip';
import { Router, Route, Switch, Link } from 'wouter';
import { useState } from 'react';
import Hero from './components/Hero';
import Vault from './components/Vault';
import LPStats from './components/LPStats';
import BagHeadMascot from './components/BagHeadMascot';
import BagBrainCharacters from './components/BagBrainCharacters';
import BottomCTA from './components/BottomCTA';
import BagBrainIQTest from './components/BagBrainIQTest';
import LeaderboardPreview from './components/LeaderboardPreview';
import ViralBackground from './components/ViralBackground';
import MemeHeader from './components/MemeHeader';
import { WalletConnect } from './components/WalletConnect';

function Dashboard() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <>
      {/* Sticky IQ Test Button with Leaderboard Preview */}
      <div className="fixed top-4 right-4 z-40">
        <div className="relative">
          <Link href="/iq">
            <button 
              className="viral-button-text bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl border-2 border-purple-500/50 hover:border-purple-400/80 transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setShowLeaderboard(true)}
              onMouseLeave={() => setShowLeaderboard(false)}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3), 0 0 30px rgba(236, 72, 153, 0.2)'
              }}
            >
              🧠 Test Your IQ
            </button>
          </Link>
          
          {/* Leaderboard Preview Tooltip */}
          {showLeaderboard && (
            <div 
              className="absolute top-full right-0 mt-2 z-50 animate-fadeIn"
              onMouseEnter={() => setShowLeaderboard(true)}
              onMouseLeave={() => setShowLeaderboard(false)}
            >
              <LeaderboardPreview />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col min-h-screen w-full items-center justify-start p-6 gap-8">
        {/* Meme Header */}
        <div className="w-full max-w-6xl mt-4">
          <MemeHeader />
        </div>
        
        {/* Hero Section */}
        <div className="w-full max-w-6xl">
          <Hero />
        </div>
        

        
        {/* Main Content */}
        <div className="w-full space-y-10 flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <Vault />
          </div>
          
          <div data-tooltip-id="lpTip" data-tooltip-content="📊 These bags are swimming in liquidity." className="w-full max-w-4xl">
            <LPStats />
          </div>
          
          <div className="w-full max-w-4xl">
            <BottomCTA />
          </div>
        </div>

        {/* Bottom Mascot */}
        <div className="w-32 md:w-40 mt-8 mb-6">
          <BagHeadMascot />
        </div>
      </div>
      
      <BagBrainCharacters />
    </>
  );
}

function App() {
  return (
    <div className="App relative min-h-screen">
      <ViralBackground />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/iq" component={BagBrainIQTest} />
          </Switch>
        </Router>

        <Tooltip 
          id="stakeTip" 
          className="bag-tooltip" 
          place="top" 
        />
        <Tooltip 
          id="lpTip" 
          className="bag-tooltip" 
          place="bottom" 
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;