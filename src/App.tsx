import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Tooltip } from 'react-tooltip';
import Hero from './components/Hero';
import Vault from './components/Vault';
import LPStats from './components/LPStats';
import BagHeadMascot from './components/BagHeadMascot';

function App() {
  return (
    <div className="App relative min-h-screen">
      <QueryClientProvider client={queryClient}>
        <BagHeadMascot />
        <Hero />
        <div className="min-h-screen bg-black text-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Vault />
            <div data-tooltip-id="lpTip" data-tooltip-content="📊 These bags are swimming in liquidity.">
              <LPStats />
            </div>
          </div>
        </div>

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