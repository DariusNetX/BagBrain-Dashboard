import { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../hooks/useWallet';
import { useVaultData } from '../hooks/useVaultData';
import { WalletConnect } from './WalletConnect';

const VAULT_ADDRESS = '0xe54cde34f920f135B5a6B015e3841758E446b0D0';
const BAG_ADDRESS = '0x5ffdfc954b057581500772ea8b7a26182dc4f8b4';

const vaultABI = [
  'function stake(uint256 amount) public',
  'function withdraw(uint256 amount) public'
];

const erc20ABI = [
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)'
];

const Vault = () => {
  const { signer, address, isConnected } = useWallet();
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const { totalStaked, userStake, isLoading, error } = useVaultData();

  const handleStake = async () => {
    try {
      setStatus('Approving...');
      const bag = new ethers.Contract(BAG_ADDRESS, erc20ABI, signer);
      const vault = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);

      const amountInWei = ethers.parseUnits(amount, 18);

      // Approve if needed
      const allowance = await bag.allowance(address, VAULT_ADDRESS);
      if (allowance < amountInWei) {
        const approveTx = await bag.approve(VAULT_ADDRESS, amountInWei);
        await approveTx.wait();
      }

      setStatus('Staking...');
      const stakeTx = await vault.stake(amountInWei);
      await stakeTx.wait();
      setStatus('✅ Staked successfully!');
      setAmount('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error during stake.');
    }
  };

  const handleWithdraw = async () => {
    try {
      setStatus('Withdrawing...');
      const vault = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);
      const amountInWei = ethers.parseUnits(amount, 18);
      const withdrawTx = await vault.withdraw(amountInWei);
      await withdrawTx.wait();
      setStatus('✅ Withdrawn successfully!');
      setAmount('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error during withdrawal.');
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
        />
        <button 
          className="bg-purple-700 hover:bg-purple-600 w-full py-2 rounded mb-2 disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handleStake}
          disabled={!isConnected || !amount || parseFloat(amount) <= 0 || status.includes('...')}
        >
          {!isConnected ? 'Connect Wallet' : 'Stake'}
        </button>
        <button 
          className="bg-gray-700 hover:bg-gray-600 w-full py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handleWithdraw}
          disabled={!isConnected || !amount || parseFloat(amount) <= 0 || status.includes('...') || 
                   (userStake && userStake !== '--' && userStake !== null && parseFloat(amount) > parseFloat(userStake))}
        >
          {!isConnected ? 'Connect Wallet' : 'Withdraw'}
        </button>
        <p className="text-sm text-gray-300 mt-2">{status}</p>
      </div>
      
      {userStake && userStake !== '--' && parseFloat(amount || '0') > parseFloat(userStake) && amount && (
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