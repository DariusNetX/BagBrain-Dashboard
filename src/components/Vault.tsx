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
  const [txStatus, setTxStatus] = useState('');
  const { totalStaked, userStake, isLoading, error } = useVaultData();

  const handleStake = async () => {
    try {
      setTxStatus('pending');
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
      setTxStatus('success');
      setStatus('✅ Staked successfully!');
      setAmount('');
      setTimeout(() => setTxStatus(''), 5000);
    } catch (err) {
      console.error(err);
      setTxStatus('error');
      setStatus('❌ Error during stake.');
      setTimeout(() => setTxStatus(''), 5000);
    }
  };

  const handleWithdraw = async () => {
    try {
      setTxStatus('pending');
      setStatus('Withdrawing...');
      const vault = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);
      const amountInWei = ethers.parseUnits(amount, 18);
      const withdrawTx = await vault.withdraw(amountInWei);
      await withdrawTx.wait();
      setTxStatus('success');
      setStatus('✅ Withdrawn successfully!');
      setAmount('');
      setTimeout(() => setTxStatus(''), 5000);
    } catch (err) {
      console.error(err);
      setTxStatus('error');
      setStatus('❌ Error during withdrawal.');
      setTimeout(() => setTxStatus(''), 5000);
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
      <h1 className="text-3xl md:text-5xl font-display text-white tracking-tight">
        🧠 BagBrain Vault
      </h1>
      <p className="mt-2 text-zinc-400 text-sm md:text-base max-w-lg">
        Stake your $BAG. Embrace the chaos. Become the meme.
      </p>
      
      {!isConnected && (
        <div className="mb-6">
          <WalletConnect />
        </div>
      )}
      
      {isConnected && address && (
        <p className="text-xs text-gray-400 mb-4">Connected Wallet: {address}</p>
      )}
      
      <p className="mb-2" title="Brains in. Liquidity out.">Total Staked: {totalStaked || '--'} $BAG</p>
      <p className="mb-2">Your Stake: {userStake || '--'} $BAG</p>
      <p className="mb-4 text-gray-400" title="No $BAG? No brain. No entry.">Wallet Balance: 0 $BAG</p>

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
        <div className="flex gap-2">
          <button 
            className="bg-bagbrain-cta hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-bagbrain-glow/50 font-display tracking-wide flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleStake}
            disabled={!isConnected || !amount || parseFloat(amount) <= 0 || status.includes('...')}
            title="YOLO into the vault. The BagHead commands it."
          >
            {!isConnected ? 'Connect Wallet' : '🔒 Stake $BAG'}
          </button>
          
          <button 
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 font-display flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleWithdraw}
            disabled={!isConnected || !amount || parseFloat(amount) <= 0 || status.includes('...') || 
                     (userStake && userStake !== '--' && userStake !== null && parseFloat(amount) > parseFloat(userStake))}
            title="You're not giving up… just claiming what's yours."
          >
            {!isConnected ? 'Connect Wallet' : '💸 Withdraw $BAG'}
          </button>
        </div>
        <p className="text-sm text-gray-300 mt-2">{status}</p>
        
        {txStatus === 'pending' && (
          <p className="mt-2 text-yellow-300 text-sm animate-pulse">
            ⏳ Summoning brains... Waiting for confirmation.
          </p>
        )}

        {txStatus === 'success' && (
          <p className="mt-2 text-green-400 text-sm transition-opacity duration-300">
            ✅ Brains deployed. Transaction confirmed!
          </p>
        )}

        {txStatus === 'error' && (
          <p className="mt-2 text-red-400 text-sm transition-opacity duration-300">
            ❌ Oops. Your bags escaped. Try again.
          </p>
        )}
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