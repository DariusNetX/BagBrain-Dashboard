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
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold glow-gold">🧠 BagBrain Vault</h1>
      <p className="mt-2 text-zinc-400 text-sm md:text-base max-w-lg">
        Stake your $BAG. Embrace the chaos. Become the meme.
      </p>
      
      {!isConnected && (
        <div className="mb-6">
          <WalletConnect />
          <p className="text-center text-yellow-300 mt-4" title="Fumble the bag and you fumble the mission.">
            🪙 Connect your wallet to begin your descent into degen finance.
          </p>
        </div>
      )}
      
      {isConnected && address && (
        <p className="text-xs text-gray-400 mb-4">Connected Wallet: {address}</p>
      )}
      
      <p className="mb-2 glow-cyan" title="Brains in. Liquidity out.">Total Staked: {totalStaked || '--'} $BAG</p>
      <p className="mb-2 glow-purple">Your Stake: {userStake || '--'} $BAG</p>
      {(!userStake || userStake === '--' || userStake === '0' || parseFloat(userStake) === 0) && isConnected && (
        <p className="text-red-300 text-sm mb-2" title="Brains are for staking. Not for thinking.">
          You haven't staked any $BAG yet. What are you waiting for?
        </p>
      )}
      <p className="mb-4 text-gray-400" title="No $BAG? No brain. No entry.">Wallet Balance: 0 $BAG</p>

      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-bold glow-purple">
          🔒 Vault Access
        </h2>
        <p className="text-zinc-400 text-sm">
          Lock your $BAG. Feed the brain. Secure your place in meme history.
        </p>
        
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
            data-tooltip-id="stakeTip"
            data-tooltip-content="🧠 Deploy your bags to the vault. Bigger brain, bigger gains."
            className="bg-vaultpurple hover:bg-baggold text-black font-bold py-2 px-4 rounded transition-all flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleStake}
            disabled={!isConnected || !amount || parseFloat(amount) <= 0 || status.includes('...')}
          >
            {!isConnected ? 'Connect Wallet' : 'Stake $BAG'}
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
        
        {txStatus === 'pending' && (
          <p className="mt-2 text-yellow-300 text-sm animate-pulse">
            ⏳ Summoning liquidity gods...
          </p>
        )}

        {txStatus === 'success' && (
          <p className="mt-2 text-green-400 text-sm">
            ✅ Brains deployed. You're in.
          </p>
        )}

        {txStatus === 'error' && (
          <p className="mt-2 text-red-400 text-sm">
            ❌ Something broke. But you're still a legend.
          </p>
        )}
        
        <p className="text-sm text-gray-300 mt-2">{status}</p>
        
        <p className="text-center text-xs text-zinc-500 mt-10">
          BagBrain is not responsible for emotional damage caused by market fluctuations. DYOR, but make it meme.
        </p>
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