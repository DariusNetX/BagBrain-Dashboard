import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
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
  const { totalStaked, userStake, isLoading, error, retry } = useVaultData();
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
      return 'Amount is too large (max: 1,000,000)';
    }
    // Check for too many decimal places
    if (value.includes('.') && value.split('.')[1]?.length > 18) {
      return 'Too many decimal places (max: 18)';
    }
    return '';
  };

  const handleAmountChange = (value: string) => {
    // Only allow valid number characters and decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const decimalCount = (cleanValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      return; // Don't update if multiple decimal points
    }
    
    setAmount(cleanValue);
    const error = validateInput(cleanValue);
    setValidationError(error);
    
    // Clear status when user changes input
    if (status && !status.includes('...')) {
      setStatus('');
      setTxStatus('');
    }
  };

  const isValidAmount = amount && !validationError && parseFloat(amount) > 0;

  // Clear all transaction states when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setAmount('');
      setStatus('');
      setTxStatus('');
      setValidationError('');
      setIsProcessing(false);
    }
  }, [isConnected]);

  const handleStake = async () => {
    if (!isConnected) {
      setStatus('❌ Please connect your wallet first');
      return;
    }

    if (!isValidAmount) {
      setValidationError(validateInput(amount));
      return;
    }

    let toastId: string | undefined;
    
    try {
      setIsProcessing(true);
      setTxStatus('pending');
      setValidationError('');
      
      // Show initial loading toast
      toastId = toast.loading('🔍 Summoning brains...', {
        duration: Infinity,
      });

      const bag = new ethers.Contract(BAG_ADDRESS, erc20ABI, signer);
      const vault = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);
      const amountInWei = ethers.parseUnits(amount, 18);

      // Approve if needed
      toast.loading('💰 Checking token approval...', {
        id: toastId,
        duration: Infinity,
      });
      
      const allowance = await bag.allowance(address, VAULT_ADDRESS);
      if (allowance < amountInWei) {
        toast.loading('📝 Requesting token approval...', {
          id: toastId,
          duration: Infinity,
        });
        const approveTx = await bag.approve(VAULT_ADDRESS, amountInWei);
        
        toast.loading('⏳ Waiting for approval confirmation...', {
          id: toastId,
          duration: Infinity,
        });
        await approveTx.wait();
        
        toast.loading('✅ Approval confirmed. Deploying brains...', {
          id: toastId,
          duration: Infinity,
        });
      }

      toast.loading('🧠 Deploying brains to vault...', {
        id: toastId,
        duration: Infinity,
      });
      const stakeTx = await vault.stake(amountInWei);
      
      toast.loading('⏳ Waiting for transaction confirmation...', {
        id: toastId,
        duration: Infinity,
      });
      await stakeTx.wait();
      
      // Success toast
      toast.success('🎉 Staking complete! Brains successfully deployed!', {
        id: toastId,
        duration: 4000,
      });
      
      setTxStatus('success');
      setStatus('🎉 Brains successfully deployed!');
      setAmount('');
      setValidationError('');
      
      setTimeout(() => {
        setStatus('');
        setTxStatus('');
      }, 5000);
    } catch (error: any) {
      console.error('Stake error:', error);
      setTxStatus('error');
      
      // Handle specific error types with appropriate error toasts
      let errorMessage = 'Transaction failed!';
      if (error.code === 4001 || error.message?.includes('rejected')) {
        errorMessage = 'Transaction rejected by user';
        setStatus('❌ Transaction rejected by user');
      } else if (error.message?.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for transaction';
        setStatus('❌ Insufficient funds for transaction');
      } else if (error.message?.includes('gas')) {
        errorMessage = 'Transaction failed - try increasing gas limit';
        setStatus('❌ Transaction failed - try increasing gas limit');
      } else if (error.message?.includes('allowance')) {
        errorMessage = 'Token approval failed - please try again';
        setStatus('❌ Token approval failed - please try again');
      } else {
        errorMessage = 'Transaction failed - please try again';
        setStatus('❌ Transaction failed - please try again');
      }
      
      toast.error(`❌ ${errorMessage}`, {
        id: toastId,
        duration: 6000,
      });
      
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

    // Additional validation for withdraw - check if user has enough staked
    if (userStake && userStake !== '--' && parseFloat(amount) > parseFloat(userStake)) {
      setValidationError(`Insufficient staked balance. You have ${userStake} $BAG staked.`);
      return;
    }

    let toastId: string | undefined;
    
    try {
      setIsProcessing(true);
      setTxStatus('pending');
      setValidationError('');

      // Show initial loading toast
      toastId = toast.loading('💼 Claiming what\'s yours...', {
        duration: Infinity,
      });

      const vault = new ethers.Contract(VAULT_ADDRESS, vaultABI, signer);
      const amountInWei = ethers.parseUnits(amount, 18);
      
      toast.loading('📝 Initiating withdrawal...', {
        id: toastId,
        duration: Infinity,
      });
      const withdrawTx = await vault.withdraw(amountInWei);
      
      toast.loading('⏳ Waiting for transaction confirmation...', {
        id: toastId,
        duration: Infinity,
      });
      await withdrawTx.wait();
      
      // Success toast
      toast.success('💰 Withdrawal complete! Your bags have escaped the vault!', {
        id: toastId,
        duration: 4000,
      });
      
      setTxStatus('success');
      setStatus('💰 Your bags have escaped the vault!');
      setAmount('');
      setValidationError('');
      
      setTimeout(() => {
        setStatus('');
        setTxStatus('');
      }, 5000);
    } catch (error: any) {
      console.error('Withdraw error:', error);
      setTxStatus('error');
      
      // Handle specific error types with appropriate error toasts
      let errorMessage = 'Withdrawal failed!';
      if (error.code === 4001 || error.message?.includes('rejected')) {
        errorMessage = 'Transaction rejected by user';
        setStatus('❌ Transaction rejected by user');
      } else if (error.message?.includes('insufficient')) {
        errorMessage = 'Insufficient staked amount for withdrawal';
        setStatus('❌ Insufficient staked amount for withdrawal');
      } else if (error.message?.includes('gas')) {
        errorMessage = 'Transaction failed - try increasing gas limit';
        setStatus('❌ Transaction failed - try increasing gas limit');
      } else {
        errorMessage = 'Withdrawal failed - please try again';
        setStatus('❌ Withdrawal failed - please try again');
      }
      
      toast.error(`❌ ${errorMessage}`, {
        id: toastId,
        duration: 6000,
      });
      
      setTimeout(() => {
        setStatus('');
        setTxStatus('');
      }, 8000);
    } finally {
      setIsProcessing(false);
    }
  };

  // Enhanced error state with retry functionality
  if (error && !totalStaked && !userStake) {
    return (
      <div className="bg-red-900/20 backdrop-blur-md border border-red-500/40 rounded-xl p-6 w-full max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold glow-red mb-4">Vault Connection Error</h3>
          <p className="text-lg mb-4 opacity-80">{error}</p>
          <div className="space-y-3">
            <button
              onClick={retry}
              className="btn-primary bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              🔄 Retry Connection
            </button>
            <p className="text-sm opacity-60">
              If this persists, check your network connection or try refreshing the page
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-black/60 backdrop-blur-md border border-yellow-500/40 rounded-xl p-6 w-full max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-4"></div>
          <div className="flex justify-center items-center py-8">
            <div className="text-4xl animate-bounce">🧠</div>
            <span className="ml-3 text-lg glow-text">Loading vault data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/60 backdrop-blur-md border border-yellow-500/40 rounded-xl shadow-2xl p-6 w-full max-w-4xl mx-auto relative overflow-hidden">
      {/* Removed overlapping cool and confused BagBrain characters */}
      
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
              placeholder="Enter amount of $BAG tokens"
              className={`input-standard w-full cursor-help ${
                validationError ? 'border-red-500 focus:ring-red-500' : 
                isValidAmount ? 'border-green-500 focus:ring-green-500' : ''
              }`}
              min="0"
              max="1000000"
              step="0.000000000000000001"
              disabled={isProcessing}
              autoComplete="off"
              onKeyDown={(e) => {
                // Prevent entering negative sign, 'e', 'E', '+', '-'
                if (['-', '+', 'e', 'E'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
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
            disabled={!isConnected || !isValidAmount || isProcessing || !!validationError}
            className={`btn-primary w-full viral-button-text ${
              (!isConnected || !isValidAmount || isProcessing || !!validationError) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105'
            }`}
          >
            {isProcessing && txStatus === 'pending' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              '🧠 Stake $BAG'
            )}
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
            disabled={!isConnected || !isValidAmount || isProcessing || !!validationError ||
                     Boolean(userStake && userStake !== '--' && userStake !== '0' && parseFloat(amount || '0') > parseFloat(userStake))}
            className={`btn-primary w-full viral-button-text ${
              (!isConnected || !isValidAmount || isProcessing || !!validationError ||
               Boolean(userStake && userStake !== '--' && userStake !== '0' && parseFloat(amount || '0') > parseFloat(userStake))) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105'
            }`}
          >
            {isProcessing && txStatus === 'pending' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              '💰 Withdraw $BAG'
            )}
          </button>
        </MobilePopover>
        </div>
        



        
        {status && (
          <div className={`mt-6 p-4 rounded-xl border-2 text-center ${
            txStatus === 'success' ? 'bg-green-900/20 border-green-500/50' :
            txStatus === 'error' ? 'bg-red-900/20 border-red-500/50' :
            txStatus === 'pending' ? 'bg-blue-900/20 border-blue-500/50' :
            'bg-gray-900/20 border-gray-500/50'
          }`}>
            <p className={`text-lg font-medium ${
              txStatus === 'success' ? 'text-green-400' :
              txStatus === 'error' ? 'text-red-400' :
              txStatus === 'pending' ? 'text-blue-400' :
              'text-amber-400'
            }`}>
              {isProcessing && txStatus === 'pending' && (
                <span className="inline-block animate-spin mr-2">⏳</span>
              )}
              {status}
            </p>
          </div>
        )}
        
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