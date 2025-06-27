import { useEffect, useRef } from 'react';

interface TwitterFeedProps {
  username: string;
  height?: number;
  theme?: 'light' | 'dark';
  className?: string;
}

const TwitterFeed: React.FC<TwitterFeedProps> = ({ 
  username, 
  height = 600, 
  theme = 'dark',
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widgets script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.head.appendChild(script);

      script.onload = () => {
        createTimeline();
      };
    } else {
      createTimeline();
    }

    function createTimeline() {
      if (containerRef.current && window.twttr) {
        // Clear existing timeline
        containerRef.current.innerHTML = '';
        
        // Create new timeline
        window.twttr.widgets.createTimeline(
          {
            sourceType: 'profile',
            screenName: username
          },
          containerRef.current,
          {
            height: height,
            theme: theme,
            chrome: 'noheader nofooter noborders transparent',
            borderColor: 'rgba(255, 215, 0, 0.3)',
            linkColor: '#ffd700',
            tweetLimit: 5,
            related: username,
            lang: 'en'
          }
        ).catch((error: any) => {
          console.error('Error loading Twitter timeline:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="bg-black/60 border border-blue-500/30 rounded-lg p-6 text-center">
                <div class="text-blue-400 mb-4">
                  <svg class="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.06 9.06 0 0 1-2.89 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.51 2.16-4.51 4.83 0 .38.04.75.12 1.1-3.75-.2-7.07-2.04-9.3-4.83a5.05 5.05 0 0 0-.61 2.43c0 1.67.83 3.14 2.1 4a4.41 4.41 0 0 1-2.05-.59v.06c0 2.33 1.59 4.27 3.7 4.7a4.52 4.52 0 0 1-2.03.08 4.55 4.55 0 0 0 4.24 3.24A9.05 9.05 0 0 1 0 19.54 12.82 12.82 0 0 0 7 21c8.26 0 12.8-7.1 12.8-13.26 0-.2 0-.41-.02-.61A9.36 9.36 0 0 0 23 3z" />
                  </svg>
                </div>
                <h3 class="glow-gold text-xl mb-3">Follow @${username}</h3>
                <p class="text-gray-300 mb-4">Latest updates and BagBrain community content</p>
                <a 
                  href="https://twitter.com/${username}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white font-semibold rounded hover:bg-[#0d8ddb] transition-colors"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.06 9.06 0 0 1-2.89 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.51 2.16-4.51 4.83 0 .38.04.75.12 1.1-3.75-.2-7.07-2.04-9.3-4.83a5.05 5.05 0 0 0-.61 2.43c0 1.67.83 3.14 2.1 4a4.41 4.41 0 0 1-2.05-.59v.06c0 2.33 1.59 4.27 3.7 4.7a4.52 4.52 0 0 1-2.03.08 4.55 4.55 0 0 0 4.24 3.24A9.05 9.05 0 0-1 0 19.54 12.82 12.82 0 0 0 7 21c8.26 0 12.8-7.1 12.8-13.26 0-.2 0-.41-.02-.61A9.36 9.36 0 0 0 23 3z" />
                  </svg>
                  View on Twitter
                </a>
              </div>
            `;
          }
        });
      }
    }
  }, [username, height, theme]);

  return (
    <div className={`twitter-feed-container ${className}`}>
      <div 
        ref={containerRef}
        className="min-h-[400px] bg-black/40 rounded-lg border border-blue-500/20 overflow-hidden"
        style={{ minHeight: `${height}px` }}
      >
        {/* Loading state */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <div className="glow-gold text-lg">Loading Twitter feed...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    twttr: any;
  }
}

export default TwitterFeed;