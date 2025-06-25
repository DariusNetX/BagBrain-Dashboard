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
      <div className="flex flex-col min-h-screen w-full items-center justify-start p-4 gap-6">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <Hero />
            <Link href="/iq">
              <button className="btn-primary px-6 py-3 text-sm">
                🧠 Test Your IQ
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full space-y-8 flex flex-col items-center">
          <Vault />
          <div data-tooltip-id="lpTip" data-tooltip-content="📊 These bags are swimming in liquidity." className="w-full max-w-4xl">
            <LPStats />
          </div>
          <div className="w-full max-w-4xl">
            <BottomCTA />
          </div>
        </div>

        <div className="w-32 md:w-40">
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