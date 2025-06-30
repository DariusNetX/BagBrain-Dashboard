import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const useWallet = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      setNetworkError(null);
      
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access with timeout
      const accountRequest = window.ethereum.request({ method: 'eth_requestAccounts' });
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 30000)
      );
      
      await Promise.race([accountRequest, timeout]);
      
      // Get signer and address with additional error handling
      const newSigner = await newProvider.getSigner();
      const userAddress = await newSigner.getAddress();
      
      // Verify network connectivity
      try {
        const network = await newProvider.getNetwork();
        console.log('Connected to network:', network.name, 'Chain ID:', network.chainId);
      } catch (networkErr: any) {
        console.warn('Network detection failed:', networkErr);
        setNetworkError('Network connectivity issues detected');
      }
      
      setProvider(newProvider);
      setSigner(newSigner);
      setAddress(userAddress);
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      
      // Enhanced error classification
      let errorMessage = 'Failed to connect wallet';
      if (err.code === 4001) {
        errorMessage = 'Connection rejected by user';
      } else if (err.message?.includes('timeout')) {
        errorMessage = 'Connection timeout - please try again';
      } else if (err.message?.includes('network')) {
        errorMessage = 'Network error - check your connection';
      } else if (err.message?.includes('unauthorized')) {
        errorMessage = 'Unauthorized - please unlock MetaMask';
      } else if (err.code === -32002) {
        errorMessage = 'Request pending - check MetaMask';
      } else if (err.code === -32603) {
        errorMessage = 'Internal error - try refreshing the page';
      }
      
      setError(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setError(null);
    setNetworkError(null);
  };

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (err) {
          console.log('No wallet connected');
        }
      }
    };
    
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return { 
    provider, 
    signer, 
    address, 
    isConnecting, 
    error,
    networkError, 
    connectWallet, 
    disconnectWallet,
    isConnected: !!address 
  };
};

// Types for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}