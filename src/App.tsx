import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import Hero from './components/Hero';
import Vault from './components/Vault';
import LPStats from './components/LPStats';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white">
        <Hero />
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Vault />
            <LPStats />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;