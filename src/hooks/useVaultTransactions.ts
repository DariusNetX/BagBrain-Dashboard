import { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './useWallet';

const VAULT_ADDRESS = '0xe54cde34f920f135B5a6B015e3841758E446b0D0';
const BAG_ADDRESS = '0x5ffdfc954b057581500772ea8b7a26182dc4f8b4';

const vaultABI = [
  'function stake(uint256 amount) public',
  'function withdraw(uint256 amount) public'
];

const erc20ABI = [
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)',
  'function balanceOf(address account) public view returns (uint256)'
];

export const useVaultTransactions = () => {
  const { signer, address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAllowance = async (amount: string) => {
    if (!signer || !address) throw new Error('Wallet not connected');
    
    const bagContract = new ethers.Contract(BAG_ADDRESS, erc20ABI, signer);
    const allowance = await bagContract.allowance(address, VAULT_ADDRESS);
    const requiredAmount = ethers.parseUnits(amount, 18);
    
    return allowance >= requiredAmount;
  };

  const approveToken = async (amount: string) => {
    if (!signer) throw new Error('Wallet not connected');
    
    const bagContract = new ethers.Contract(BAG_ADDRESS, erc20ABI, signer);
    const requiredAmount = ethers.parseUnits(amount, 18);
    
    const tx = await bagContract.approve(VAULT_ADDRESS, requiredAmount);
    await tx.wait();
    
    return tx;
  };

  const stake = async (amount: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!signer) throw new Error('Wallet not connected');

      const amountWei = ethers.parseUnits(amount, 18);
      
      // Check if approval is needed
      const hasAllowance = await checkAllowance(amount);
      
      if (!hasAllowance) {
        // Approve first
        await approveToken(amount);
      }

      // Execute stake
      const vaultContract = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);
      const tx = await vaultContract.stake(amountWei);
      
      const receipt = await tx.wait();
      
      return {
        success: true,
        txHash: receipt.hash,
        amount: amount
      };
    } catch (err: any) {
      const errorMessage = err.reason || err.message || 'Staking failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const withdraw = async (amount: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!signer) throw new Error('Wallet not connected');

      const amountWei = ethers.parseUnits(amount, 18);
      
      const vaultContract = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);
      const tx = await vaultContract.withdraw(amountWei);
      
      const receipt = await tx.wait();
      
      return {
        success: true,
        txHash: receipt.hash,
        amount: amount
      };
    } catch (err: any) {
      const errorMessage = err.reason || err.message || 'Withdrawal failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getBagBalance = async () => {
    if (!signer || !address) return '0';
    
    try {
      const bagContract = new ethers.Contract(BAG_ADDRESS, erc20ABI, signer);
      const balance = await bagContract.balanceOf(address);
      return ethers.formatUnits(balance, 18);
    } catch (err) {
      console.error('Error getting BAG balance:', err);
      return '0';
    }
  };

  return {
    stake,
    withdraw,
    getBagBalance,
    checkAllowance,
    isLoading,
    error,
    vaultAddress: VAULT_ADDRESS,
    bagAddress: BAG_ADDRESS
  };
};