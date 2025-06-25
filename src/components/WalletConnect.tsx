import { useWallet } from '../hooks/useWallet';
import { Wallet, X } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnecting, error, connectWallet, disconnectWallet, isConnected } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 w-full flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-400 font-mono text-sm">{formatAddress(address)}</span>
        <button
          onClick={disconnectWallet}
          className="ml-auto p-1 text-gray-400 hover:text-red-400 transition-colors"
          title="Disconnect wallet"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 glow-cyan">🦊 Wallet Connection</h2>
      <div className="text-center">
        <Wallet className="w-8 h-8 text-purple-400 mx-auto mb-3" />
        <p className="text-gray-300 mb-4 font-mono text-sm">
          Connect your wallet to interact with $BAG tokens
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
            {error}
          </div>
        )}
        
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 rounded-md border border-bagbrain-glow transition-all hover:shadow-lg font-mono"
          title="Connect to begin your descent into madness."
        >
          {isConnecting ? 'Connecting...' : '🔗 Connect MetaMask'}
        </button>
      </div>
    </div>
  );
}