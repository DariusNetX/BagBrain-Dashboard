import { useState, useEffect } from 'react';
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

  // Clear vault data immediately when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setTotalStaked('--');
      setUserStake('--');
      setIsLoading(false);
      setError(null);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!provider || !address) {
      setTotalStaked('--');
      setUserStake('--');
      setIsLoading(false);
      setError(null);
      return;
    }

    const readData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const contract = new ethers.Contract(VAULT_ADDRESS, vaultABI, provider);
        const [total, user] = await Promise.all([
          contract.totalStaked(),
          contract.stakedBalance(address)
        ]);
        
        setTotalStaked(ethers.formatUnits(total, 18));
        setUserStake(ethers.formatUnits(user, 18));
      } catch (err: any) {
        console.error('Error reading vault data:', err);
        setError(err.message || 'Failed to read vault data');
        setTotalStaked(null);
        setUserStake(null);
      } finally {
        setIsLoading(false);
      }
    };

    readData();
  }, [provider, address]);

  return { 
    totalStaked, 
    userStake, 
    isLoading, 
    error,
    vaultAddress: VAULT_ADDRESS 
  };
};