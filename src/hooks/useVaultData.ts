import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './useWallet';

const VAULT_ADDRESS = '0xe54cde34f920f135B5a6B015e3841758E446b0D0';

const vaultABI = [
  'function totalStaked() view returns (uint256)',
  'function stakedBalance(address user) view returns (uint256)'
];

export const useVaultData = () => {
  const { provider, address, isConnected } = useWallet();
  const [totalStaked, setTotalStaked] = useState<string | null>(null);
  const [userStake, setUserStake] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Clear vault data immediately when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setTotalStaked('--');
      setUserStake('--');
      setIsLoading(false);
      setError(null);
      setRetryCount(0);
    }
  }, [isConnected]);

  const readData = useCallback(async (retryAttempt = 0) => {
    if (!provider || !address) {
      setTotalStaked('--');
      setUserStake('--');
      setIsLoading(false);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const contract = new ethers.Contract(VAULT_ADDRESS, vaultABI, provider);
      
      // Add timeout to contract calls
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 15000)
      );
      
      const [total, user] = await Promise.race([
        Promise.all([
          contract.totalStaked(),
          contract.stakedBalance(address)
        ]),
        timeout
      ]) as [any, any];
      
      setTotalStaked(ethers.formatUnits(total, 18));
      setUserStake(ethers.formatUnits(user, 18));
      setRetryCount(0); // Reset retry count on success
    } catch (err: any) {
      console.error('Error reading vault data:', err);
      
      // Enhanced error classification
      let errorMessage = 'Failed to read vault data';
      if (err.message?.includes('timeout')) {
        errorMessage = 'Connection timeout - network may be slow';
      } else if (err.message?.includes('network')) {
        errorMessage = 'Network error - check your connection';
      } else if (err.message?.includes('reverted')) {
        errorMessage = 'Contract call failed - contract may be paused';
      } else if (err.code === 'NETWORK_ERROR') {
        errorMessage = 'RPC network error - try again later';
      } else if (err.code === 'CALL_EXCEPTION') {
        errorMessage = 'Contract call exception - invalid contract state';
      }
      
      setError(errorMessage);
      
      // Implement exponential backoff retry for network errors
      const maxRetries = 3;
      if (retryAttempt < maxRetries && (
        err.message?.includes('network') || 
        err.message?.includes('timeout') ||
        err.code === 'NETWORK_ERROR'
      )) {
        const delay = Math.pow(2, retryAttempt) * 1000; // 1s, 2s, 4s
        console.log(`Retrying vault data fetch in ${delay}ms (attempt ${retryAttempt + 1}/${maxRetries})`);
        setTimeout(() => {
          setRetryCount(retryAttempt + 1);
          readData(retryAttempt + 1);
        }, delay);
      } else {
        // Set fallback values for display
        setTotalStaked('--');
        setUserStake('--');
      }
    } finally {
      setIsLoading(false);
    }
  }, [provider, address]);

  useEffect(() => {
    readData();
  }, [readData]);

  const retry = useCallback(() => {
    setRetryCount(0);
    readData();
  }, [readData]);

  return { 
    totalStaked, 
    userStake, 
    isLoading, 
    error,
    retryCount,
    retry,
    vaultAddress: VAULT_ADDRESS 
  };
};