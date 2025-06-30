import { useState, useEffect } from 'react';

interface NetworkStatusProps {
  className?: string;
}

export const NetworkStatus = ({ className = '' }: NetworkStatusProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastChecked(new Date());
    };

    const handleOffline = () => {
      setIsOnline(false);
      setLastChecked(new Date());
    };

    // Listen for network status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Periodic connectivity check
    const interval = setInterval(() => {
      setLastChecked(new Date());
      // Navigator.onLine isn't always reliable, so we'll use it as a baseline
      setIsOnline(navigator.onLine);
    }, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className={`bg-red-900/30 border border-red-500/40 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-300 text-sm font-medium">
            🔴 Network Offline
          </span>
        </div>
        <p className="text-xs opacity-70 mt-1">
          Check your internet connection to access blockchain data
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-green-900/20 border border-green-500/30 rounded-lg p-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-green-300 text-xs">
          🟢 Connected
        </span>
      </div>
    </div>
  );
};