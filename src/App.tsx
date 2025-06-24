import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Tooltip } from 'react-tooltip';
import Vault from './components/Vault';
import LPStats from './components/LPStats';
import BagHeadMascot from './components/BagHeadMascot';
import { WalletConnect } from './components/WalletConnect';

function App() {
  return (
    <div className="App relative min-h-screen">
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 py-10 gap-8 bg-[#fefce8] text-[#1f1f1f]">
          <div className="w-full lg:w-1/2">
            <Vault />
            <div data-tooltip-id="lpTip" data-tooltip-content="📊 These bags are swimming in liquidity.">
              <LPStats />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <BagHeadMascot />
            <WalletConnect />
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