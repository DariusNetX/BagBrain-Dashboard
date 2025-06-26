import { useWallet } from '../hooks/useWallet';
import { Wallet, X } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnecting, error, connectWallet, disconnectWallet, isConnected } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-xl shadow-2xl p-4 w-full flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="glow-gold font-mono text-lg">{formatAddress(address)}</span>
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
    <div className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-xl shadow-2xl p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-4 glow-cyan">🦊 Wallet Connection</h2>
      <div className="text-center">
        <Wallet className="w-8 h-8 text-purple-400 mx-auto mb-3" />
        <p className="glow-gold mb-4 font-mono text-xl">
          Connect your wallet to interact with $BAG tokens
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded glow-gold text-lg">
            {error}
          </div>
        )}
        
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="btn-primary w-full"
          title="Connect to begin your descent into madness."
        >
          {isConnecting ? 'Connecting...' : '🔗 Connect MetaMask'}
        </button>
      </div>
    </div>
  );
}