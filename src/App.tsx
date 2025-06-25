import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Tooltip } from 'react-tooltip';
import Hero from './components/Hero';
import Vault from './components/Vault';
import LPStats from './components/LPStats';
import BagHeadMascot from './components/BagHeadMascot';
import { WalletConnect } from './components/WalletConnect';

function App() {
  return (
    <div className="App relative min-h-screen">
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen w-full items-center justify-start p-4 gap-6">
          <div className="w-full max-w-6xl">
            <Hero />
          </div>
          <div className="w-full space-y-6 flex flex-col items-center">
            <Vault />
            <div data-tooltip-id="lpTip" data-tooltip-content="📊 These bags are swimming in liquidity." className="w-full max-w-4xl">
              <LPStats />
            </div>
            <div className="w-full max-w-4xl">
              <WalletConnect />
            </div>
          </div>

          <div className="w-32 md:w-40">
            <BagHeadMascot />
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