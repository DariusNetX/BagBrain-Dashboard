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
  const [validationError, setValidationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { totalStaked, userStake, isLoading, error } = useVaultData();
  const { activePopover, togglePopover } = useMobilePopover();

  const validateInput = (value: string): string => {
    if (!value || value.trim() === '') {
      return 'Please enter an amount';
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      return 'Please enter a valid number';
    }
    if (num <= 0) {
      return 'Amount must be greater than 0';
    }
    if (num > 1000000) {
      return 'Amount is too large';
    }
    return '';
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const error = validateInput(value);
    setValidationError(error);
  };

  const isValidAmount = amount && !validationError && parseFloat(amount) > 0;

  const handleStake = async () => {
    if (!isConnected) {
      setStatus('❌ Please connect your wallet first');
      return;
    }

    if (!isValidAmount) {
      setValidationError(validateInput(amount));
      return;
    }

    try {
      setIsProcessing(true);
      setTxStatus('pending');
      setStatus('Summoning brains...');
      setValidationError('');

      const bag = new ethers.Contract(BAG_ADDRESS, erc20ABI, signer);
      const vault = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);
      const amountInWei = ethers.parseUnits(amount, 18);

      // Approve if needed
      const allowance = await bag.allowance(address, VAULT_ADDRESS);
      if (allowance < amountInWei) {
        setStatus('Approving $BAG tokens...');
        const approveTx = await bag.approve(VAULT_ADDRESS, amountInWei);
        await approveTx.wait();
      }

      setStatus('Deploying brains to vault...');
      const stakeTx = await vault.stake(amountInWei);
      await stakeTx.wait();
      
      setTxStatus('success');
      setStatus('🎉 Brains successfully deployed!');
      setAmount('');
      
      setTimeout(() => {
        setStatus('');
        setTxStatus('');
      }, 5000);
    } catch (error: any) {
      console.error('Stake error:', error);
      setTxStatus('error');
      
      // Handle specific error types
      if (error.code === 4001 || error.message?.includes('rejected')) {
        setStatus('❌ Transaction rejected by user');
      } else if (error.message?.includes('insufficient funds')) {
        setStatus('❌ Insufficient funds for transaction');
      } else if (error.message?.includes('gas')) {
        setStatus('❌ Transaction failed - try increasing gas limit');
      } else if (error.message?.includes('allowance')) {
        setStatus('❌ Token approval failed - please try again');
      } else {
        setStatus('❌ Transaction failed - please try again');
      }
      
      setTimeout(() => {
        setStatus('');
        setTxStatus('');
      }, 8000);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected) {
      setStatus('❌ Please connect your wallet first');
      return;
    }

    if (!isValidAmount) {
      setValidationError(validateInput(amount));
      return;
    }

    try {
      setIsProcessing(true);
      setTxStatus('pending');
      setStatus('Claiming what\'s yours...');
      setValidationError('');

      const vault = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);
      const amountInWei = ethers.parseUnits(amount, 18);
      const withdrawTx = await vault.withdraw(amountInWei);
      await withdrawTx.wait();
      
      setTxStatus('success');
      setStatus('💰 Your bags have escaped the vault!');
      setAmount('');
      
      setTimeout(() => {
        setStatus('');
        setTxStatus('');
      }, 5000);
    } catch (error: any) {
      console.error('Withdraw error:', error);
      setTxStatus('error');
      
      // Handle specific error types
      if (error.code === 4001 || error.message?.includes('rejected')) {
        setStatus('❌ Transaction rejected by user');
      } else if (error.message?.includes('insufficient')) {
        setStatus('❌ Insufficient staked amount for withdrawal');
      } else if (error.message?.includes('gas')) {
        setStatus('❌ Transaction failed - try increasing gas limit');
      } else {
        setStatus('❌ Withdrawal failed - please try again');
      }
      
      setTimeout(() => {
        setStatus('');
        setTxStatus('');
      }, 8000);
    } finally {
      setIsProcessing(false);
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
      <div className="absolute top-4 right-4 w-16 h-16 opacity-15 animate-pulse">
        <img
          src="/bagbrain-cool.png"
          alt="Cool BagBrain Vault Guardian"
          className="w-full h-full object-contain"
          loading="eager"
          onLoad={() => console.log('✓ Vault cool BagBrain loaded')}
        />
      </div>
      <div className="absolute bottom-4 left-4 w-12 h-12 opacity-10 animate-float-delayed">
        <img
          src="/bagbrain-confused.png"
          alt="Thinking BagBrain"
          className="w-full h-full object-contain"
          loading="eager"
          onLoad={() => console.log('✓ Vault confused BagBrain loaded')}
        />
      </div>
      
      <h2 className="section-title mb-6">🧠 BagBrain Vault</h2>
      <p className="emphasis-text mb-8 text-center">
        Stake your $BAG. Embrace the chaos. Become the meme.
      </p>
      
      {!isConnected && (
        <div className="mb-6">
          <WalletConnect />
          <p className="viral-subtitle text-center mt-6">
            🪙 <MobilePopover 
              id="wallet-connect" 
              content="Connect your wallet to access the vault and start staking $BAG tokens" 
              isActive={activePopover === 'wallet-connect'} 
              onToggle={togglePopover}
            >
              Connect wallet to begin your descent into degen finance
            </MobilePopover>
          </p>
        </div>
      )}
      
      {isConnected && address && (
        <p className="viral-label mb-6 text-center">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <p className="viral-label mb-2">🧠 Total Vault</p>
          <p className="viral-stat text-green-400" style={{
            background: 'linear-gradient(135deg, #00ff88 0%, #00cc88 50%, #00ff88 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            <MobilePopover 
              id="total-staked" 
              content="Total amount of $BAG tokens staked by all users in the vault" 
              isActive={activePopover === 'total-staked'} 
              onToggle={togglePopover}
            >
              {totalStaked || '--'} $BAG
            </MobilePopover>
          </p>
        </div>
        
        <div className="text-center">
          <p className="viral-label mb-2">💎 Your Stake</p>
          <p className="viral-stat text-purple-400" style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #a855f7 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {(isConnected && userStake) ? parseFloat(userStake).toLocaleString() : '--'} $BAG
          </p>
        </div>
      </div>
      {(!userStake || userStake === '--' || userStake === '0' || parseFloat(userStake) === 0) && isConnected && (
        <div className="text-center mb-8">
          <p className="emphasis-text">
            💼 <MobilePopover 
              id="first-stake" 
              content="You haven't staked any $BAG tokens yet. Enter an amount to get started!" 
              isActive={activePopover === 'first-stake'} 
              onToggle={togglePopover}
            >
              Ready to stake? Your bags are waiting for brains.
            </MobilePopover>
          </p>
        </div>
      )}
      
      <div className="text-center mb-6">
        <p className="viral-label mb-2">💰 Wallet Balance</p>
        <p className="text-2xl font-bold text-amber-400">
          <MobilePopover 
            id="wallet-balance" 
            content="No $BAG? No brain. No entry." 
            isActive={activePopover === 'wallet-balance'} 
            onToggle={togglePopover}
          >
            0 $BAG
          </MobilePopover>
        </p>
      </div>

      <div className="mt-6">
        <h3 className="emphasis-text mb-4 text-center">
          🔒 Vault Access
        </h3>
        <p className="viral-label text-center mb-6">
          Lock your $BAG. Feed the brain. Secure your place in meme history.
        </p>
        
        <MobilePopover 
          id="amount-input" 
          content="Enter how many $BAG tokens you want to stake. Remember: only stake what you can afford to lock up for the long term!" 
          isActive={activePopover === 'amount-input'} 
          onToggle={togglePopover}
        >
          <div className="mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Amount of $BAG"
              className={`input-standard w-full cursor-help ${
                validationError ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              min="0"
              step="0.01"
              disabled={isProcessing}
            />
            {validationError && (
              <p className="text-red-400 text-sm mt-2">⚠️ {validationError}</p>
            )}
          </div>
        </MobilePopover>
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
            className="btn-primary w-full viral-button-text"
          >
            🧠 Stake $BAG
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
                     Boolean(userStake && userStake !== '--' && userStake !== '0' && parseFloat(amount) > parseFloat(userStake))}
            className="btn-primary w-full viral-button-text"
          >
            💰 Withdraw $BAG
          </button>
        </MobilePopover>
        </div>
        



        
        <p className="text-xl glow-gold mt-4 text-center">{status}</p>
        
        <p className="text-center text-lg glow-gold mt-8">
          BagBrain is not responsible for emotional damage caused by market fluctuations. DYOR, but make it meme.
        </p>
      </div>
      
      {userStake && userStake !== '--' && parseFloat(amount || '0') > parseFloat(userStake) && amount && (
        <p className="glow-gold text-xl mt-4 text-center">
          Insufficient staked balance for withdrawal
        </p>
      )}
      
      {error && (
        <p className="glow-gold text-xl mt-4 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default Vault;