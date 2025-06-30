import { useState, useEffect } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  isSlowConnection: boolean;
  lastChecked: Date;
}

export const useNetworkStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isSlowConnection: false,
    lastChecked: new Date()
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: true,
        lastChecked: new Date()
      }));
    };

    const handleOffline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: false,
        lastChecked: new Date()
      }));
    };

    const checkConnectionSpeed = async () => {
      try {
        const startTime = Date.now();
        // Try to fetch a small resource to test connection speed
        await fetch('/favicon.ico?' + Math.random(), { 
          method: 'HEAD',
          cache: 'no-cache'
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        setStatus(prev => ({
          ...prev,
          isSlowConnection: responseTime > 3000, // Consider slow if > 3 seconds
          lastChecked: new Date()
        }));
      } catch (error) {
        // If fetch fails, we're likely offline
        setStatus(prev => ({
          ...prev,
          isOnline: false,
          lastChecked: new Date()
        }));
      }
    };

    // Listen for network status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Periodic connectivity and speed check
    const interval = setInterval(() => {
      if (navigator.onLine) {
        checkConnectionSpeed();
      } else {
        handleOffline();
      }
    }, 30000); // Check every 30 seconds

    // Initial speed check
    if (navigator.onLine) {
      checkConnectionSpeed();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return status;
};