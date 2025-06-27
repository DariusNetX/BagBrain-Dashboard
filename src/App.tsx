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

import MemeCarousel from './components/MemeCarousel';


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

        
        {/* Hero Section */}
        <div className="w-full max-w-6xl">
          <Hero />
        </div>
        
        <hr className="section-divider w-full max-w-4xl" />
        
        {/* Main Content */}
        <div className="w-full space-y-12 flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <Vault />
          </div>
          
          <hr className="section-divider w-full max-w-4xl" />
          
          <div data-tooltip-id="lpTip" data-tooltip-content="📊 These bags are swimming in liquidity." className="w-full max-w-4xl">
            <LPStats />
          </div>
          
          <hr className="section-divider w-full max-w-4xl" />
          
          <div className="w-full max-w-4xl">
            <BottomCTA />
          </div>

          {/* Meme Carousel */}
          <div className="w-full max-w-6xl">
            <MemeCarousel />
          </div>
        </div>

        {/* Enhanced Footer Section */}
        <footer className="w-full max-w-6xl mx-auto mt-16 mb-8">
          <div className="section-container bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 text-center enhanced-hover">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-xl font-bold glow-gold text-center sm:text-left">
                🚀 Join the BagBrain Revolution
              </div>
              
              <a
                href="https://twitter.com/ImBaggedUp"
                target="_blank"
                rel="noopener noreferrer"
                className="twitter-enhanced-button group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-[#1DA1F2] via-[#1991DB] to-[#0d8ddb] text-white font-bold rounded-xl hover:from-[#0d8ddb] hover:via-[#1991DB] hover:to-[#1DA1F2] transition-all duration-500 shadow-xl hover:shadow-2xl border-2 border-blue-400/40 hover:border-blue-300/60 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                {/* Animated background shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                
                {/* Twitter icon with enhanced styling */}
                <div className="relative z-10 p-1 bg-white/10 rounded-full group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.06 9.06 0 0 1-2.89 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.51 2.16-4.51 4.83 0 .38.04.75.12 1.1-3.75-.2-7.07-2.04-9.3-4.83a5.05 5.05 0 0 0-.61 2.43c0 1.67.83 3.14 2.1 4a4.41 4.41 0 0 1-2.05-.59v.06c0 2.33 1.59 4.27 3.7 4.7a4.52 4.52 0 0 1-2.03.08 4.55 4.55 0 0 0 4.24 3.24A9.05 9.05 0 0 1 0 19.54 12.82 12.82 0 0 0 7 21c8.26 0 12.8-7.1 12.8-13.26 0-.2 0-.41-.02-.61A9.36 9.36 0 0 0 23 3z" />
                  </svg>
                </div>
                
                <div className="relative z-10 flex flex-col items-start">
                  <span className="text-lg font-bold tracking-wide group-hover:tracking-wider transition-all duration-300">Follow @ImBaggedUp</span>
                  <span className="text-xs opacity-90 font-medium">Join the BagBrain revolution</span>
                </div>
                
                {/* Pulse ring effect */}
                <div className="absolute inset-0 rounded-xl ring-2 ring-blue-400/0 group-hover:ring-blue-300/40 group-hover:ring-4 transition-all duration-300"></div>
              </a>
            </div>
            
            <div className="mt-4 text-sm glow-cyan opacity-80">
              Stay updated with the latest BagBrain developments and memes
            </div>
          </div>
        </footer>

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
    <div className="App relative min-h-screen w-full">
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