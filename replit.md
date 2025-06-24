# BagBrain Dashboard - Replit Project Guide

## Overview

A React.js dashboard for the BagBrain DeFi ecosystem featuring interactive UI, data visualization, and modular architecture. The dashboard allows users to track $BAG tokens, stake in the BrainBag Vault, and monitor liquidity pool statistics.

## System Architecture

Full-stack JavaScript application with React frontend and Express backend using in-memory storage.

**Technology Stack:**
- Frontend: React.js, TypeScript, Tailwind CSS, TanStack Query
- Backend: Express.js, Node.js, TypeScript
- Storage: In-memory storage (MemStorage)
- Build Tools: Vite, TSX
- UI: Tailwind CSS with custom BagBrain theming

## Key Components

**Frontend Components:**
- `client/src/App.tsx` - Main application component with BagBrain theming
- `client/src/components/Vault.tsx` - BrainBag Vault staking interface with wallet integration
- `client/src/components/LPStats.tsx` - Liquidity Pool statistics display
- `client/src/components/WalletConnect.tsx` - Web3 wallet connection component
- `client/src/hooks/useWallet.ts` - Custom hook for MetaMask wallet management
- `client/src/lib/queryClient.ts` - TanStack Query configuration
- `client/src/index.css` - Tailwind CSS with custom BagBrain dark theme

**Backend Components:**
- `server/index.ts` - Express server configuration
- `server/routes.ts` - API endpoints for vault, LP stats, and transactions
- `server/storage.ts` - In-memory storage interface and implementation

**Shared Components:**
- `shared/schema.ts` - Zod schemas and TypeScript types for data validation

## Data Flow

**Web3 Blockchain Integration:**
1. Real-time vault data from smart contract at 0xe54cde34f920f135B5a6B015e3841758E446b0D0
2. Live LP reserves from pair contract at 0x20ac738513f765036387b889595855a20634Ba51
3. MetaMask wallet integration for user authentication
4. Direct blockchain reads using ethers.js v6

**Frontend → Backend:**
1. Vault operations: User stakes/withdraws $BAG tokens via Vault component
2. API calls to `/api/transactions` create transaction records
3. Vault state reads from blockchain contract automatically
4. TanStack Query manages caching and invalidation

**Backend Data Management:**
1. In-memory storage maintains transaction history
2. Transaction API updates vault totals automatically
3. Authentic LP data from blockchain pair contract
4. CORS enabled for cross-origin requests

**Real-time Updates:**
- Live blockchain data via custom hooks
- Loading states during blockchain operations
- Error handling for failed blockchain requests

## External Dependencies

**Frontend Dependencies:**
- React 18 with TypeScript for component architecture
- TanStack Query v5 for server state management
- Tailwind CSS for styling with custom BagBrain theme
- Vite for development server and build tooling
- Ethers.js for Web3 blockchain interactions

**Backend Dependencies:**
- Express.js for REST API server
- CORS for cross-origin resource sharing
- Zod for runtime type validation
- TSX for TypeScript execution

**Development Tools:**
- Concurrently for running frontend/backend simultaneously
- Nodemon for backend hot reloading
- PostCSS and Autoprefixer for CSS processing

## Deployment Strategy

**Development Environment:**
- Frontend: Vite dev server on port 5173
- Backend: Express server on port 3000
- Concurrent execution using concurrently package

**Production Deployment:**
- Build: `npm run build` creates optimized production bundle
- Preview: `npm run preview` serves production build locally
- Development: `npm run dev` starts development server
- Replit Deployments handles automatic scaling and TLS

## Changelog

- June 24, 2025. Complete BagBrain UI/UX enhancement package
  - Added real-time animated stats to Hero section (total staked, LP reserves)
  - Integrated live blockchain data with cyan pulse animation for staking display
  - Added pink-accented LP reserves display with responsive typography
  - Enhanced transaction status messaging with BagBrain-themed feedback
  - Integrated "Summoning brains", "Brains deployed", "Your bags escaped" messaging
  - Added complete tooltip system: "YOLO into the vault", "claiming what's yours", "Brains in. Liquidity out"
  - Applied smooth transition animations and auto-clearing status messages
  - Successfully built complete animated dashboard with personality-driven UX

- June 24, 2025. Hero component integration and layout optimization
  - Added Hero component with BagBrain branding ("I Have Bags for Brains")
  - Created custom baghead.png mascot image at src/assets/baghead.png
  - Applied React fragment layout structure for clean component hierarchy
  - Integrated custom BagBrain color palette in Hero (gold accent text)
  - Used Bungee display font for main Hero title
  - Positioned Hero at top with dashboard components below
  - Successfully built production bundle with Hero section and image assets

- June 24, 2025. Complete BagBrain theming implementation
  - Moved all client files to root directory for simpler deployment
  - Removed /client folder that was causing deployment issues
  - Updated Vite scripts to work from root with proper host binding
  - Updated .replit.toml deployment configuration
  - Fixed PostCSS configuration and installed @tailwindcss/postcss
  - Added BagBrain color palette (background, accent, glow, brain, cta) to Tailwind config
  - Added Bungee display font and Inter body font configurations
  - Imported Google Fonts (Bungee & Inter) in index.html
  - Applied global BagBrain styling to body (deep black background, white text, Inter font)
  - Successfully built production bundle with complete theming system
  - Cleaned up temporary scripts and log files

- June 24, 2025. Complete Web3 blockchain integration
  - Installed ethers.js v6 for blockchain interactions
  - Created useWallet hook for MetaMask connectivity with ethers v6 compatibility
  - Added WalletConnect component with connection status
  - Integrated wallet display in Vault component showing connected address
  - Created useVaultData hook reading from contract 0xe54cde34f920f135B5a6B015e3841758E446b0D0
  - Created useLPStats hook reading from pair contract 0x20ac738513f765036387b889595855a20634Ba51
  - Implemented real blockchain transactions for staking and withdrawal
  - Added automatic token approval handling for $BAG token at 0x5ffdfc954b057581500772ea8b7a26182dc4f8b4
  - Replaced all mock API data with authentic blockchain reads and writes
  - Enhanced transaction status feedback and error handling
  
- June 23, 2025. Initial BagBrain Dashboard setup complete
  - Created full-stack React + Express architecture
  - Implemented Vault staking component with $BAG token operations
  - Added LP Stats display for $BAG/$BLAZE pool data
  - Set up TanStack Query for server state management
  - Configured Tailwind CSS with BagBrain dark theme
  - Established in-memory storage with Zod validation

## User Preferences

Preferred communication style: Simple, everyday language.

## Features Implemented

✓ BrainBag Vault staking interface
✓ Liquidity Pool statistics display  
✓ Real-time data fetching with loading states
✓ Transaction history tracking
✓ Responsive design with custom BagBrain color palette
✓ Error handling and form validation
✓ Web3 wallet connectivity with MetaMask integration
✓ Connected wallet address display in Vault interface
✓ Real blockchain staking and withdrawal transactions
✓ Automatic $BAG token approval handling
✓ Live transaction status updates with success/error feedback
✓ Hero section with BagBrain branding and tagline
✓ Enhanced button styling with BagBrain color palette and animations
✓ Animated stats display in Hero section with real-time blockchain data
✓ BagBrain-themed tooltips for enhanced user experience
✓ User liquidity display in LP Stats with cyan accent styling
✓ Complete tooltip system across all interactive elements
✓ Wallet balance display with themed empty wallet messaging
✓ Enhanced wallet connection flow with degen finance messaging
✓ Vault Access section with themed meme history messaging
✓ No-stake user messaging with encouraging BagBrain personality
✓ Viral anchor disclaimer with legal protection and meme personality
✓ Enhanced transaction status messages with liquidity gods and legend messaging
✓ New BagBrain color palette integration with baggold, brainblue, vaultpurple, chaosred
✓ Updated Vault styling with golden headline and dark container background
✓ Global body styling with deep black background and light gray text
✓ Baghead mascot image moved to public folder as baghead-mascot.png
✓ BagHeadMascot component with Guardian of the Vaults positioning and hover effects
✓ App wrapped in relative container for proper mascot absolute positioning
✓ Meme loop integration with "I have bags for brains" mascot tooltip
✓ Custom BagBrain tooltip styling with golden theme and float animation
✓ React-tooltip integration with enhanced BagBrain theming system
✓ Enhanced BagHead mascot with custom react-tooltip and guardian messaging
✓ Complete tooltip collection implemented with consistent BagBrain personality
✓ Dynamic meme tooltip system with rotating BagBrain phrases for mascot
✓ Interactive click-triggered speech bubbles for BagHead mascot with auto-clear
✓ Enhanced BagHead.css with golden theme animations and speech bubble styling
✓ Refined mascot animations with floating motion and light-colored speech bubbles
✓ Complete layout redesign with light cream theme and responsive two-column structure
✓ Added subtle background pattern with graffiti aesthetic using golden dots
✓ Restructured to single-column layout with centered components and responsive mascot sizing
✓ Updated all component containers to responsive white cards with consistent styling
✓ Fixed index.html viewport meta tag with maximum-scale=1 for optimal mobile experience
✓ Added overflow-x: hidden to body for preventing horizontal scroll issues
✓ Verified all images properly organized in public/ folder for production deployment
✓ Enhanced background with fixed attachment and center positioning for graffiti aesthetic