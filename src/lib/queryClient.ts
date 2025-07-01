import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Get the correct API base URL for different environments
const getApiBaseUrl = () => {
  // Always enforce HTTPS in production
  if (typeof window !== 'undefined') {
    const currentHost = window.location.hostname;
    
    // Force HTTPS for production domains
    if (currentHost === 'bagbrain.xyz' || currentHost.includes('.vercel.app') || currentHost.includes('.replit.app')) {
      return `https://${currentHost}`;
    }
    
    // For development, use localhost with HTTP
    if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    
    // For any other domain, force HTTPS
    const protocol = window.location.protocol === 'http:' && 
                     (currentHost === 'localhost' || currentHost === '127.0.0.1') 
                     ? 'http:' : 'https:';
    return `${protocol}//${currentHost}`;
  }
  return '';
};

// Default fetcher for API requests with robust error handling
export const apiRequest = async (url: string, options?: RequestInit) => {
  const baseUrl = getApiBaseUrl();
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url;
  
  try {
    // Create timeout signal for 10 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
      ...options,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    // Enhanced error classification for better user feedback
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network connection failed - please check your internet connection');
    }
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      throw new Error('Request timeout - server may be temporarily unavailable');
    }
    
    console.error('API Request Error:', {
      url: fullUrl,
      error: error.message,
      stack: error.stack
    });
    
    throw error;
  }
};