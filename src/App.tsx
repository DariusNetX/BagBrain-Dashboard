import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Tooltip } from 'react-tooltip';
import { Router, Route, Switch, Link } from 'wouter';
import Hero from './components/Hero';
import Vault from './components/Vault';
import LPStats from './components/LPStats';
import BagHeadMascot from './components/BagHeadMascot';
import BagBrainCharacters from './components/BagBrainCharacters';
import BottomCTA from './components/BottomCTA';
import BagBrainIQTest from './components/BagBrainIQTest';
import { WalletConnect } from './components/WalletConnect';

function Dashboard() {
  return (
    <>
      {/* Sticky IQ Test Button */}
      <div className="fixed top-4 right-4 z-20">
        <Link href="/iq">
          <button className="btn-primary px-6 py-3 text-sm shadow-2xl border-2 border-yellow-500/50 hover:border-yellow-500/80 transition-all">
            🧠 Test Your IQ
          </button>
        </Link>
      </div>

      <div className="flex flex-col min-h-screen w-full items-center justify-start p-6 gap-8">
        {/* Hero Section */}
        <div className="w-full max-w-6xl mt-4">
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