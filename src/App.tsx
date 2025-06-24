import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import Vault from './components/Vault';
import LPStats from './components/LPStats';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white p-8 font-mono">
        <header className="text-center">
          <h1 className="text-4xl mb-4">🧠 BagBrain Dashboard</h1>
          <p className="text-lg text-gray-400">Track your $BAG. Stake. Meme. Repeat.</p>
        </header>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Vault />
          <LPStats />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;