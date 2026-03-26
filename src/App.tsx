import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock token data
const mockTokens = [
  { id: 1, name: 'MonadPepe', ticker: 'MPEPE', mcap: '420.69K', change: '+142%', icon: '🐸', creator: '0x1a2...3f4', holders: 1247, volume: '89.3K' },
  { id: 2, name: 'NadCat', ticker: 'NCAT', mcap: '69.42K', change: '+89%', icon: '🐱', creator: '0x5b6...7c8', holders: 892, volume: '34.1K' },
  { id: 3, name: 'Monad Doge', ticker: 'MDOGE', mcap: '156.78K', change: '+234%', icon: '🐕', creator: '0x9d0...1e2', holders: 2341, volume: '156.7K' },
  { id: 4, name: 'PurpleWave', ticker: 'PWAVE', mcap: '88.88K', change: '+56%', icon: '🌊', creator: '0x3f4...5g6', holders: 567, volume: '23.4K' },
  { id: 5, name: 'NadMoon', ticker: 'NMOON', mcap: '321.00K', change: '+445%', icon: '🌙', creator: '0x7h8...9i0', holders: 3421, volume: '234.5K' },
  { id: 6, name: 'ChainLink Inu', ticker: 'CLINU', mcap: '45.67K', change: '+78%', icon: '🔗', creator: '0xjk1...lm2', holders: 432, volume: '12.3K' },
];

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const GlitchText = ({ children, className = '' }: { children: string; className?: string }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0.5 text-cyan-400 opacity-70 animate-pulse z-0" aria-hidden="true">{children}</span>
      <span className="absolute top-0 -left-0.5 text-purple-400 opacity-70 animate-pulse z-0" style={{ animationDelay: '0.1s' }} aria-hidden="true">{children}</span>
    </span>
  );
};

const TokenCard = ({ token, index }: { token: typeof mockTokens[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 md:p-5 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer overflow-hidden">
        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent pointer-events-none"
          animate={{ y: isHovered ? ['0%', '200%'] : '0%' }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />

        <div className="flex items-center gap-3 md:gap-4">
          <div className="text-3xl md:text-4xl bg-gray-800 rounded-lg p-2 md:p-3 border border-purple-500/20">
            {token.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-white text-base md:text-lg truncate">{token.name}</h3>
              <span className="text-cyan-400 text-xs md:text-sm font-mono bg-cyan-400/10 px-2 py-0.5 rounded shrink-0">${token.ticker}</span>
            </div>
            <p className="text-gray-500 text-xs md:text-sm font-mono truncate">by {token.creator}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-green-400 font-bold text-sm md:text-base">{token.change}</p>
            <p className="text-gray-400 text-xs md:text-sm">${token.mcap}</p>
          </div>
        </div>

        <div className="flex justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-800">
          <div className="text-center">
            <p className="text-gray-500 text-xs">Holders</p>
            <p className="text-purple-400 font-mono text-sm md:text-base">{token.holders.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">24h Vol</p>
            <p className="text-cyan-400 font-mono text-sm md:text-base">${token.volume}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-shadow min-h-[44px] flex items-center"
          >
            Trade
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const CreateTokenModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [tokenName, setTokenName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-purple-500/50 rounded-2xl p-5 md:p-8 w-full max-w-md relative overflow-hidden"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-16 md:w-20 h-16 md:h-20 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 md:w-20 h-16 md:h-20 border-r-2 border-b-2 border-purple-400/50 rounded-br-2xl" />

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
              <GlitchText>Launch Token</GlitchText>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm md:text-base">Token Name</label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors min-h-[48px]"
                  placeholder="My Awesome Token"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm md:text-base">Ticker Symbol</label>
                <input
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  maxLength={5}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors font-mono min-h-[48px]"
                  placeholder="TOKEN"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm md:text-base">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none h-24"
                  placeholder="Tell us about your token..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 bg-[length:200%_100%] text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:animate-pulse transition-all shadow-lg shadow-purple-500/30 min-h-[52px]"
              >
                Launch on Monad
              </motion.button>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onCreateClick }: { onCreateClick: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 md:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-cyan-400 rounded-xl flex items-center justify-center font-bold text-white text-lg md:text-xl shadow-lg shadow-purple-500/30">
              N
            </div>
            <span className="text-lg md:text-xl font-bold">
              <GlitchText className="text-white">NADLAUNCH</GlitchText>
            </span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors font-medium">Explore</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors font-medium">Trending</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors font-medium">Docs</a>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateClick}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-shadow min-h-[44px]"
            >
              <span className="hidden sm:inline">Create Token</span>
              <span className="sm:hidden">Create</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 border border-purple-500/30 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-sm hover:border-cyan-400/50 transition-colors min-h-[44px]"
            >
              <span className="hidden sm:inline">Connect</span>
              <span className="sm:hidden">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </span>
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-2 border-t border-purple-500/20 pt-4"
            >
              <div className="flex flex-col gap-3">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors font-medium py-2">Explore</a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors font-medium py-2">Trending</a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors font-medium py-2">Docs</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const StatsBar = () => {
  const stats = [
    { label: 'Total Tokens', value: '12,847' },
    { label: 'Total Volume', value: '$4.2M' },
    { label: 'Active Users', value: '8,421' },
    { label: 'Avg Launch', value: '23 sec' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="bg-gray-900/50 backdrop-blur border border-purple-500/20 rounded-xl p-3 md:p-4 text-center"
        >
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            {stat.value}
          </motion.p>
          <p className="text-gray-500 text-xs md:text-sm mt-1">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'trending' | 'new'>('all');

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans relative overflow-x-hidden">
      {/* Background effects */}
      <ParticleBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <Navbar onCreateClick={() => setIsModalOpen(true)} />

      <main className="relative z-10 pt-24 md:pt-28 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 md:mb-6 px-4 md:px-5 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-purple-400 text-xs md:text-sm font-medium">Powered by Monad Chain</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight">
            <GlitchText className="text-white">Launch Your Token</GlitchText>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
              In Seconds
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            The fairest token launchpad on Monad. No presales, no team allocation.
            Just pure community-driven launches.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-shadow min-h-[52px]"
            >
              Launch Token Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gray-800/50 border border-purple-500/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:border-cyan-400/50 transition-all min-h-[52px]"
            >
              Explore Tokens
            </motion.button>
          </div>
        </motion.div>

        <StatsBar />

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 md:mb-8 overflow-x-auto pb-2">
          {(['all', 'trending', 'new'] as const).map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-medium text-sm md:text-base transition-all whitespace-nowrap min-h-[44px] ${
                filter === f
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-purple-500/50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Token Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mockTokens.map((token, i) => (
            <TokenCard key={token.id} token={token} index={i} />
          ))}
        </div>

        {/* Load More */}
        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800/50 border border-purple-500/30 text-gray-300 px-6 md:px-8 py-3 rounded-xl font-medium hover:border-cyan-400/50 hover:text-white transition-all min-h-[48px]"
          >
            Load More Tokens
          </motion.button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/10 py-6 md:py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-xs md:text-sm">
            Requested by <a href="https://twitter.com/Eyowkiii" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-400 transition-colors">@Eyowkiii</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">@clonkbot</a>
          </p>
        </div>
      </footer>

      <CreateTokenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
