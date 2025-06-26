import { useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../hooks/useWallet';
import { useVaultData } from '../hooks/useVaultData';
import { useMobilePopover } from '../hooks/useMobilePopover';
import { WalletConnect } from './WalletConnect';
import { MobilePopover } from './MobilePopover';

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
  const { activePopover, togglePopover } = useMobilePopover();

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
    <div className="bg-black/60 backdrop-blur-md border border-yellow-500/40 rounded-xl shadow-2xl p-6 w-full max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
        <img
          src="/bagbrain-character-1.png"
          alt="BagBrain Vault Guardian"
          className="w-full h-auto"
        />
      </div>
      
      <h2 className="text-4xl font-bold glow-gold mb-4">🧠 BagBrain Vault</h2>
      <p className="mb-6 glow-gold text-xl">
        Stake your $BAG. Embrace the chaos. Become the meme.
      </p>
      
      {!isConnected && (
        <div className="mb-6">
          <WalletConnect />
          <p className="text-center glow-gold mt-4 text-xl">
            🪙 <MobilePopover 
              id="wallet-connect" 
              content="Fumble the bag and you fumble the mission." 
              isActive={activePopover === 'wallet-connect'} 
              onToggle={togglePopover}
            >
              Connect your wallet to begin your descent into degen finance.
            </MobilePopover>
          </p>
        </div>
      )}
      
      {isConnected && address && (
        <p className="text-lg glow-gold mb-4">Connected Wallet: {address}</p>
      )}
      
      <p className="mb-3 glow-gold text-xl">
        <MobilePopover 
          id="total-staked" 
          content="Brains in. Liquidity out." 
          isActive={activePopover === 'total-staked'} 
          onToggle={togglePopover}
        >
          Total Staked: {totalStaked || '--'} $BAG
        </MobilePopover>
      </p>
      <p className="mb-4 glow-gold text-xl">Your Stake: {userStake || '--'} $BAG</p>
      {(!userStake || userStake === '--' || userStake === '0' || parseFloat(userStake) === 0) && isConnected && (
        <p className="mb-6 glow-gold text-center text-xl">
          💼 <MobilePopover 
            id="first-stake" 
            content="First time? Make it count." 
            isActive={activePopover === 'first-stake'} 
            onToggle={togglePopover}
          >
            Ready to stake? Your bags are waiting for brains.
          </MobilePopover>
        </p>
      )}
      <p className="mb-4 glow-gold text-lg">
        <MobilePopover 
          id="wallet-balance" 
          content="No $BAG? No brain. No entry." 
          isActive={activePopover === 'wallet-balance'} 
          onToggle={togglePopover}
        >
          Wallet Balance: 0 $BAG
        </MobilePopover>
      </p>

      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-bold glow-purple">
          🔒 Vault Access
        </h2>
        <p className="glow-gold text-sm">
          Lock your $BAG. Feed the brain. Secure your place in meme history.
        </p>
        
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount of $BAG"
          className="input-standard w-full mb-4"
          min="0"
          step="0.01"
        />
        <div className="flex flex-col gap-6">
          <MobilePopover 
          id="stake-btn" 
          content="YOLO into the vault" 
          isActive={activePopover === 'stake-btn'} 
          onToggle={togglePopover}
        >
          <button 
            onClick={handleStake}
            disabled={!isConnected || !amount || parseFloat(amount) <= 0 || status.includes('...')}
            className="btn-primary w-full"
          >
            Stake $BAG
          </button>
        </MobilePopover>
          
        <MobilePopover 
          id="withdraw-btn" 
          content="claiming what's yours" 
          isActive={activePopover === 'withdraw-btn'} 
          onToggle={togglePopover}
        >
          <button 
            onClick={handleWithdraw}
            disabled={!isConnected || !amount || parseFloat(amount) <= 0 || status.includes('...') || 
                     (userStake && userStake !== '--' && userStake !== null && parseFloat(amount) > parseFloat(userStake))}
            className="btn-primary w-full"
          >
            Withdraw $BAG
          </button>
        </MobilePopover>
        </div>
        
        {txStatus === 'pending' && (
          <p className="mt-4 glow-gold text-lg animate-pulse text-center">
            ⏳ Summoning liquidity gods... Be patient.
          </p>
        )}

        {txStatus === 'success' && (
          <p className="mt-4 glow-gold text-lg transition-opacity duration-300 text-center">
            ✅ You're officially a legend. Transaction confirmed!
          </p>
        )}

        {txStatus === 'error' && (
          <p className="mt-4 glow-gold text-lg transition-opacity duration-300 text-center">
            ❌ Something broke. But you're still a legend.
          </p>
        )}
        
        <p className="text-lg glow-gold mt-4 text-center">{status}</p>
        
        <p className="text-center text-base glow-gold mt-8">
          BagBrain is not responsible for emotional damage caused by market fluctuations. DYOR, but make it meme.
        </p>
      </div>
      
      {userStake && userStake !== '--' && parseFloat(amount || '0') > parseFloat(userStake) && amount && (
        <p className="glow-gold text-lg mt-4 text-center">
          Insufficient staked balance for withdrawal
        </p>
      )}
      
      {error && (
        <p className="glow-gold text-lg mt-4 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default Vault;