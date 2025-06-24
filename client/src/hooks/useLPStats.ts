import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './useWallet';

const PAIR_ADDRESS = '0x20ac738513f765036387b889595855a20634Ba51';

const pairABI = [
  'function getReserves() view returns (uint112 reserve0, uint112 reserve1)',
];

export const useLPStats = () => {
  const { provider } = useWallet();
  const [reserves, setReserves] = useState({ bag: '--', blaze: '--', price: '--' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provider) {
      setReserves({ bag: '--', blaze: '--', price: '--' });
      return;
    }

    const fetchReserves = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const contract = new ethers.Contract(PAIR_ADDRESS, pairABI, provider);
        const [reserve0, reserve1] = await contract.getReserves();
        
        const bag = ethers.formatUnits(reserve0, 18);
        const blaze = ethers.formatUnits(reserve1, 18);
        const price = (parseFloat(bag) / parseFloat(blaze)).toFixed(4);
        
        setReserves({ bag, blaze, price });
      } catch (err: any) {
        console.error('Error fetching LP reserves:', err);
        setError(err.message || 'Failed to fetch LP data');
        setReserves({ bag: '--', blaze: '--', price: '--' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReserves();
  }, [provider]);

  return { 
    reserves, 
    isLoading, 
    error,
    pairAddress: PAIR_ADDRESS 
  };
};