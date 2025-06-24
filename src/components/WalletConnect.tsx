import { useWallet } from '../hooks/useWallet';
import { Wallet, X } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnecting, error, connectWallet, disconnectWallet, isConnected } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-900 border border-purple-500/30 rounded-lg">
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
    <div className="p-4 bg-gray-900 border border-purple-500/30 rounded-lg">
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
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 
                   text-white font-mono text-sm rounded-lg transition-colors"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
}