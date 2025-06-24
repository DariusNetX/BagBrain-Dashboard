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
- Replit Deployments handles automatic scaling and TLS

## Changelog

- June 24, 2025. Added npm start script and fixed package.json syntax
  - Fixed JSON syntax error in package.json for start script
  - Successfully ran npm install and npm start commands
  - Application running with both backend (port 3000) and frontend (port 5173) servers
  - Dashboard accessible and fully functional with Web3 capabilities

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
✓ Responsive design with purple/green accent colors
✓ Error handling and form validation
✓ Web3 wallet connectivity with MetaMask integration
✓ Connected wallet address display in Vault interface
✓ Real blockchain staking and withdrawal transactions
✓ Automatic $BAG token approval handling
✓ Live transaction status updates with success/error feedback