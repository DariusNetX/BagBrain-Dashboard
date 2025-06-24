import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useWallet } from '../hooks/useWallet';
import { useVaultData } from '../hooks/useVaultData';
import { WalletConnect } from './WalletConnect';

const Vault = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const { isConnected, address } = useWallet();
  const { totalStaked, userStake, isLoading, error } = useVaultData();

  // Stake mutation
  const stakeMutation = useMutation({
    mutationFn: (amount: number) =>
      apiRequest('/api/transactions', {
        method: 'POST',
        body: JSON.stringify({
          amount,
          type: 'stake',
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vault'] });
      setStakeAmount('');
    },
  });

  // Withdraw mutation
  const withdrawMutation = useMutation({
    mutationFn: (amount: number) =>
      apiRequest('/api/transactions', {
        method: 'POST',
        body: JSON.stringify({
          amount,
          type: 'withdraw',
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vault'] });
      setStakeAmount('');
    },
  });

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (amount > 0) {
      stakeMutation.mutate(amount);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(stakeAmount);
    if (amount > 0 && userStake && amount <= parseFloat(userStake)) {
      withdrawMutation.mutate(amount);
    }
  };

  if (isLoading) {
    return (
      <div className="border border-purple-500 p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-purple-500 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">🧠 BrainBag Vault</h2>
      
      {!isConnected && (
        <div className="mb-6">
          <WalletConnect />
        </div>
      )}
      
      {isConnected && address && (
        <p className="text-xs text-gray-400 mb-4">Connected Wallet: {address}</p>
      )}
      
      <p className="mb-2">Total Staked: {totalStaked || '--'} $BAG</p>
      <p className="mb-4">Your Stake: {userStake || '--'} $BAG</p>

      <div className="mt-4">
        <input
          className="w-full p-2 mb-2 text-black rounded"
          type="number"
          placeholder="Amount of $BAG"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          min="0"
          step="0.01"
        />
        <button
          className="bg-purple-700 hover:bg-purple-600 w-full py-2 rounded mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleStake}
          disabled={!isConnected || stakeMutation.isPending || !stakeAmount || parseFloat(stakeAmount) <= 0}
        >
          {!isConnected ? 'Connect Wallet' : stakeMutation.isPending ? 'Staking...' : 'Stake'}
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 w-full py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleWithdraw}
          disabled={
            !isConnected ||
            withdrawMutation.isPending ||
            !stakeAmount ||
            parseFloat(stakeAmount) <= 0 ||
            (userStake && userStake !== '--' && userStake !== null && parseFloat(stakeAmount) > parseFloat(userStake))
          }
        >
          {!isConnected ? 'Connect Wallet' : withdrawMutation.isPending ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </div>
      
      {userStake && userStake !== '--' && parseFloat(stakeAmount) > parseFloat(userStake) && stakeAmount && (
        <p className="text-red-400 text-sm mt-2">
          Insufficient staked balance for withdrawal
        </p>
      )}
      
      {error && (
        <p className="text-red-400 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default Vault;