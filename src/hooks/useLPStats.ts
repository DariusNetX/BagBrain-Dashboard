import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './useWallet';

const PAIR_ADDRESS = '0x20ac738513f765036387b889595855a20634Ba51';

const pairABI = [
  'function getReserves() view returns (uint112 reserve0, uint112 reserve1)',
];

export const useLPStats = () => {
  const { provider } = useWallet();
  const [reserves, setReserves] = useState({ bag: '---', blaze: '---', price: '---' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchReserves = useCallback(async (retryAttempt = 0) => {
    if (!provider) {
      setReserves({ bag: '---', blaze: '---', price: '---' });
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const contract = new ethers.Contract(PAIR_ADDRESS, pairABI, provider);
      
      // Add timeout protection
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('LP data request timeout')), 12000)
      );
      
      const [reserve0, reserve1] = await Promise.race([
        contract.getReserves(),
        timeout
      ]) as [any, any];
      
      // Validate reserves data
      if (!reserve0 || !reserve1 || reserve0.toString() === '0' || reserve1.toString() === '0') {
        throw new Error('Invalid reserves data - pool may be empty');
      }
      
      const bag = ethers.formatUnits(reserve0, 18);
      const blaze = ethers.formatUnits(reserve1, 18);
      
      // Safe price calculation with division by zero check
      const bagFloat = parseFloat(bag);
      const blazeFloat = parseFloat(blaze);
      const price = blazeFloat > 0 ? (bagFloat / blazeFloat).toFixed(4) : '0.0000';
      
      setReserves({ bag, blaze, price });
      setRetryCount(0); // Reset retry count on success
    } catch (err: any) {
      console.error('Error fetching LP reserves:', err);
      
      // Enhanced error classification
      let errorMessage = 'Failed to fetch LP data';
      if (err.message?.includes('timeout')) {
        errorMessage = 'LP data request timeout - network may be slow';
      } else if (err.message?.includes('network')) {
        errorMessage = 'Network error fetching LP data';
      } else if (err.message?.includes('reverted')) {
        errorMessage = 'LP contract call failed - pair may not exist';
      } else if (err.message?.includes('empty')) {
        errorMessage = 'LP pool appears to be empty';
      } else if (err.code === 'NETWORK_ERROR') {
        errorMessage = 'RPC network error fetching LP data';
      } else if (err.code === 'CALL_EXCEPTION') {
        errorMessage = 'LP contract exception - invalid pair address';
      }
      
      setError(errorMessage);
      
      // Retry logic for network-related errors
      const maxRetries = 2;
      if (retryAttempt < maxRetries && (
        err.message?.includes('network') || 
        err.message?.includes('timeout') ||
        err.code === 'NETWORK_ERROR'
      )) {
        const delay = Math.pow(2, retryAttempt) * 2000; // 2s, 4s
        console.log(`Retrying LP data fetch in ${delay}ms (attempt ${retryAttempt + 1}/${maxRetries})`);
        setTimeout(() => {
          setRetryCount(retryAttempt + 1);
          fetchReserves(retryAttempt + 1);
        }, delay);
      } else {
        setReserves({ bag: '---', blaze: '---', price: '---' });
      }
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  useEffect(() => {
    fetchReserves();
  }, [fetchReserves]);

  const retry = useCallback(() => {
    setRetryCount(0);
    fetchReserves();
  }, [fetchReserves]);

  return { 
    reserves, 
    isLoading, 
    error,
    retryCount,
    retry,
    pairAddress: PAIR_ADDRESS 
  };
};