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
- `client/src/components/Vault.tsx` - BrainBag Vault staking interface
- `client/src/components/LPStats.tsx` - Liquidity Pool statistics display
- `client/src/lib/queryClient.ts` - TanStack Query configuration
- `client/src/index.css` - Tailwind CSS with custom BagBrain dark theme

**Backend Components:**
- `server/index.ts` - Express server configuration
- `server/routes.ts` - API endpoints for vault, LP stats, and transactions
- `server/storage.ts` - In-memory storage interface and implementation

**Shared Components:**
- `shared/schema.ts` - Zod schemas and TypeScript types for data validation

## Data Flow

**Frontend → Backend:**
1. Vault operations: User stakes/withdraws $BAG tokens via Vault component
2. API calls to `/api/transactions` create transaction records
3. Vault state automatically updates based on transaction type
4. TanStack Query manages caching and invalidation

**Backend Data Management:**
1. In-memory storage maintains vault state and LP statistics
2. Transaction API updates vault totals automatically
3. Mock LP data provides realistic $BAG/$BLAZE pool information
4. CORS enabled for cross-origin requests

**Real-time Updates:**
- React Query refetches data on user interactions
- Loading states during API operations
- Error handling for failed requests

## External Dependencies

**Frontend Dependencies:**
- React 18 with TypeScript for component architecture
- TanStack Query v5 for server state management
- Tailwind CSS for styling with custom BagBrain theme
- Vite for development server and build tooling

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

- June 23, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.

---

**Next Steps:**
1. Define project requirements and scope
2. Choose appropriate technology stack
3. Set up project structure and dependencies
4. Implement core functionality
5. Configure database and data models
6. Develop API endpoints
7. Create user interface
8. Add authentication and authorization
9. Test and deploy

This document will be updated as architectural decisions are made and components are implemented.