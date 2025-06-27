import { Link } from 'wouter';

export default function ArcadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            🎮 BagBrain Arcade
          </h1>
          
          <p className="text-xl md:text-2xl glow-text opacity-90 mb-8">
            Where Brains Get Gamed
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

          {/* Game Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/40 border border-purple-400/30 rounded-lg p-6 enhanced-hover">
              <div className="text-3xl mb-3">🌉</div>
              <h3 className="text-xl font-bold glow-gold mb-2">Bridge My Brain</h3>
              <p className="text-sm opacity-70">"Get your neurons across the chain gap."</p>
            </div>
            
            <div className="bg-black/40 border border-red-400/30 rounded-lg p-6 enhanced-hover">
              <div className="text-3xl mb-3">📉</div>
              <h3 className="text-xl font-bold glow-red mb-2">Gas Fee Simulator 2025</h3>
              <p className="text-sm opacity-70">"Burn bags. Break wallets. Gain XP."</p>
            </div>
            
            <div className="bg-black/40 border border-blue-400/30 rounded-lg p-6 enhanced-hover">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold glow-cyan mb-2">IQ Sniper</h3>
              <p className="text-sm opacity-70">"One wrong answer, back to normie mode."</p>
            </div>
            
            <div className="bg-black/40 border border-green-400/30 rounded-lg p-6 enhanced-hover">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold glow-green mb-2">BagHead Runner</h3>
              <p className="text-sm opacity-70">"HODL and dodge the rug pulls."</p>
            </div>
            
            <div className="bg-black/40 border border-orange-400/30 rounded-lg p-6 enhanced-hover">
              <div className="text-3xl mb-3">💥</div>
              <h3 className="text-xl font-bold glow-orange mb-2">Chart Smash</h3>
              <p className="text-sm opacity-70">"Wreck candles. Heal trauma."</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="text-sm glow-text opacity-70 mb-2">Development Progress</div>
            <div className="w-full bg-gray-800 rounded-full h-3 border border-purple-400/30">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full animate-pulse" style={{width: '35%'}}></div>
            </div>
            <div className="text-xs opacity-60 mt-2">35% Complete - Launching Soon™</div>
          </div>
        </div>

        {/* Newsletter Signup Teaser */}
        <div className="section-container bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold glow-cyan mb-4">Get Notified</h3>
          <p className="text-base opacity-80 mb-6">
            Be the first to know when the arcade launches and get exclusive early access perks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your.bags@email.com" 
              className="flex-1 px-4 py-3 bg-black/60 border border-cyan-400/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              disabled
            />
            <button className="btn-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg px-6 py-3 cursor-not-allowed opacity-60">
              Coming Soon
            </button>
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