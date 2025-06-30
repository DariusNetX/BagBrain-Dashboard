import { Link } from 'wouter';

export default function ArcadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 hover:scale-105 transform duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold text-lg">Back to Dashboard</span>
          </Link>
          
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              🎮 BagBrain Arcade
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 blur-3xl opacity-20 animate-pulse"></div>
          </div>
          
          <p className="text-2xl md:text-3xl glow-text opacity-90 mb-4 font-medium">
            Where Brains Get Gamed
          </p>
          <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto">
            Epic games and challenges are brewing in the lab. Prepare for mind-bending crypto adventures.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="section-container bg-black/60 backdrop-blur-sm border border-purple-500/40 rounded-xl p-8 md:p-12 text-center mb-12">
          <div className="mb-8">
            <div className="text-6xl md:text-8xl mb-6">🎯🕹️🎲</div>
            <h2 className="text-3xl md:text-4xl font-bold glow-purple mb-6">
              Epic Games Loading...
            </h2>
            <p className="text-lg md:text-xl glow-text opacity-80 max-w-3xl mx-auto leading-relaxed">
              The BagBrain gaming universe is under construction. Get ready for mind-bending challenges, 
              crypto-themed adventures, and rewards that'll make your bags heavier than ever.
            </p>
          </div>

          {/* Featured Game Spotlight */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-400/40 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-400/30 rounded-full px-4 py-2 mb-6">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                    <span className="text-purple-300 font-medium">Featured Game</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold glow-purple mb-4">
                    🌉 Bridge My Brain
                  </h2>
                  <p className="text-xl glow-text opacity-90 mb-6">
                    "Navigate the treacherous waters of cross-chain chaos. Get your neurons across the gap without losing your bags."
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-purple-300">
                      <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                      <span>Multi-chain puzzle mechanics</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                      <span>$BAG token rewards for completion</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                      <span>Leaderboard competition</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-not-allowed opacity-60">
                    Coming Soon
                  </button>
                </div>
                <div className="relative">
                  <div className="bg-black/60 border border-purple-400/30 rounded-xl p-4 backdrop-blur-sm">
                    <img 
                      src="/bridge-my-brain-teaser.png" 
                      alt="Bridge My Brain Game Teaser" 
                      className="w-full h-auto rounded-lg"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-400/30 flex items-center justify-center"><div class="text-6xl">🌉</div></div>';
                        }
                      }}
                    />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Games Grid */}
          <div className="arcade-game-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-black/60 border border-red-400/40 rounded-xl p-6 enhanced-hover backdrop-blur-sm group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📉</div>
              <h3 className="text-xl font-bold glow-red mb-3">Gas Fee Simulator 2025</h3>
              <p className="text-sm opacity-70 mb-4">"Burn bags. Break wallets. Gain XP."</p>
              <div className="text-xs opacity-50">Strategy • Economics</div>
            </div>
            
            <div className="bg-black/60 border border-blue-400/40 rounded-xl p-6 enhanced-hover backdrop-blur-sm group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h3 className="text-xl font-bold glow-cyan mb-3">IQ Sniper</h3>
              <p className="text-sm opacity-70 mb-4">"One wrong answer, back to normie mode."</p>
              <div className="text-xs opacity-50">Quiz • Precision</div>
            </div>
            
            <div className="bg-black/60 border border-green-400/40 rounded-xl p-6 enhanced-hover backdrop-blur-sm group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl font-bold glow-green mb-3">BagHead Runner</h3>
              <p className="text-sm opacity-70 mb-4">"HODL and dodge the rug pulls."</p>
              <div className="text-xs opacity-50">Endless Runner • Action</div>
            </div>
            
            <div className="bg-black/60 border border-orange-400/40 rounded-xl p-6 enhanced-hover backdrop-blur-sm group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💥</div>
              <h3 className="text-xl font-bold glow-orange mb-3">Chart Smash</h3>
              <p className="text-sm opacity-70 mb-4">"Wreck candles. Heal trauma."</p>
              <div className="text-xs opacity-50">Arcade • Therapy</div>
            </div>
          </div>

          {/* Development Status */}
          <div className="mb-12">
            <div className="bg-black/40 border border-cyan-400/30 rounded-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold glow-cyan mb-4">🚧 Development Status</h3>
                <p className="text-lg opacity-80">The coding wizards are summoning digital magic</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Game Engine</span>
                  <span className="text-green-400 text-sm">✅ Complete</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Asset Creation</span>
                  <span className="text-yellow-400 text-sm">⚡ In Progress</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Blockchain Integration</span>
                  <span className="text-blue-400 text-sm">🔧 Starting</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '25%'}}></div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-400/30 rounded-full px-4 py-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                  <span className="text-purple-300 font-medium">ETA: Q2 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Early Access & Community */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-400/40 rounded-xl p-8 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-2xl font-bold glow-cyan mb-4">Early Access</h3>
              <p className="text-base opacity-80 mb-6">
                Be the first to know when the arcade launches and get exclusive early access perks
              </p>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="your.bags@email.com" 
                  className="w-full px-4 py-3 bg-black/60 border border-cyan-400/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  disabled
                />
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg px-6 py-3 cursor-not-allowed opacity-60 transition-all duration-300">
                  Notify Me (Coming Soon)
                </button>
              </div>
            </div>
          </div>

          {/* Community & Social */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-400/40 rounded-xl p-8 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold glow-purple mb-4">Join the Community</h3>
              <p className="text-base opacity-80 mb-6">
                Follow our development journey and share your game ideas with fellow BagBrains
              </p>
              <div className="space-y-3">
                <a 
                  href="https://x.com/ImBaggedUp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-black hover:bg-gray-900 border border-gray-600 hover:border-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  🅧 Follow @ImBaggedUp
                </a>
                <button className="w-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-purple-400/30 text-white font-medium py-3 px-6 rounded-lg cursor-not-allowed opacity-60">
                  💬 Discord (Soon)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="btn-lg btn-primary inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold rounded-lg border-2 border-blue-400/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 glow-text uppercase tracking-wide text-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}