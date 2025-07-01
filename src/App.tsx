import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

import { Router, Route, Switch, Link } from 'wouter';
import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Vault from './components/Vault';
import LPStats from './components/LPStats';
// Removed unused BagHeadMascot import
import BagBrainCharacters from './components/BagBrainCharacters';
import BottomCTA from './components/BottomCTA';
import BagBrainIQTestNew from './components/BagBrainIQTestNew';
import LeaderboardPreview from './components/LeaderboardPreview';
import ViralBackground from './components/ViralBackground';
import ArcadePage from './components/ArcadePage';

import MemeCarousel from './components/MemeCarousel';


function Dashboard() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <>
      {/* Sticky Arcade Button */}
      <div className="fixed top-4 right-4 z-40">
        <Link href="/arcade">
          <button 
            className="viral-button-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl border-2 border-indigo-500/50 hover:border-indigo-400/80 transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              boxShadow: '0 4px 20px rgba(79, 70, 229, 0.3), 0 0 30px rgba(124, 58, 237, 0.2)',
              animation: 'arcadeShimmer 2s ease-in-out infinite alternate'
            }}
          >
            🎮 BagBrain Arcade
          </button>
        </Link>
      </div>

      {/* Sticky IQ Test Button with Leaderboard Preview */}
      <div className="fixed top-20 right-4 z-40">
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
          
          <div className="w-full max-w-4xl">
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

        {/* Removed arcade teaser section - now using sticky button */}

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
                className="btn-lg btn-primary group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold rounded-lg border-2 border-blue-400/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 glow-text uppercase tracking-wide text-lg"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.06 9.06 0 0 1-2.89 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.51 2.16-4.51 4.83 0 .38.04.75.12 1.1-3.75-.2-7.07-2.04-9.3-4.83a5.05 5.05 0 0 0-.61 2.43c0 1.67.83 3.14 2.1 4a4.41 4.41 0 0 1-2.05-.59v.06c0 2.33 1.59 4.27 3.7 4.7a4.52 4.52 0 0 1-2.03.08 4.55 4.55 0 0 0 4.24 3.24A9.05 9.05 0 0 1 0 19.54 12.82 12.82 0 0 0 7 21c8.26 0 12.8-7.1 12.8-13.26 0-.2 0-.41-.02-.61A9.36 9.36 0 0 0 23 3z" />
                </svg>
                Follow @ImBaggedUp
              </a>
            </div>
            
            <div className="mt-6 text-center space-y-3">
              <div className="text-sm glow-cyan opacity-80">
                Stay updated with the latest BagBrain developments and memes
              </div>
              
              {/* Copyright and Disclaimer */}
              <div className="border-t border-blue-500/20 pt-4 space-y-2">
                <div className="text-sm glow-gold opacity-70">
                  © 2025 BagBrain. All Rights Reserved.
                </div>
                <div className="text-xs opacity-60 italic">
                  Not financial advice. Just vibes and bags.
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Removed overlapping bottom mascot - keeping only BagBrainCharacters */}
      </div>
      
      <BagBrainCharacters />
    </>
  );
}

function App() {
  useEffect(() => {
    // Comprehensive blank tooltip prevention
    const removeBlankTooltips = () => {
      // Remove all problematic tooltip attributes
      const elements = document.querySelectorAll('.mobile-hint, [data-tooltip], [title]');
      elements.forEach(el => {
        const tooltip = el.getAttribute('data-tooltip');
        const title = el.getAttribute('title');
        
        // Remove empty or problematic data-tooltip attributes
        if (tooltip !== null && (!tooltip || tooltip.trim() === '' || tooltip === 'undefined' || tooltip === 'null')) {
          el.removeAttribute('data-tooltip');
          el.classList.remove('mobile-hint');
          // Also remove any hover styling that might cause blank tooltips
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            htmlEl.style.textDecoration = 'none';
          }
          console.warn('Removed blank tooltip from element:', el.tagName, el.className);
        }
        
        // Remove empty title attributes
        if (title !== null && (!title || title.trim() === '')) {
          el.removeAttribute('title');
        }
      });
      
      // Additional check for any CSS pseudo-elements that might create blank tooltips
      const mobileHints = document.querySelectorAll('.mobile-hint');
      mobileHints.forEach(el => {
        const tooltip = el.getAttribute('data-tooltip');
        if (!tooltip || tooltip.trim() === '') {
          el.classList.remove('mobile-hint');
          el.removeAttribute('data-tooltip');
          console.warn('Stripped mobile-hint class from element with no content');
        }
      });
      
      console.log(`Tooltip cleanup completed - processed ${elements.length} elements`);
    };

    // Initial cleanup
    removeBlankTooltips();
    
    // Monitor for changes
    const observer = new MutationObserver(() => {
      setTimeout(removeBlankTooltips, 100); // Delay to catch dynamic content
    });
    
    observer.observe(document.body, { 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['data-tooltip', 'title', 'class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App relative min-h-screen w-full">
      <ViralBackground />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/iq" component={BagBrainIQTestNew} />
            <Route path="/arcade" component={ArcadePage} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;