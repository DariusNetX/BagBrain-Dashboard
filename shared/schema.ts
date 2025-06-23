import { z } from 'zod';

// BagBrain ecosystem data models
export const vaultSchema = z.object({
  id: z.string().uuid(),
  totalStaked: z.number().min(0),
  userStake: z.number().min(0),
  timestamp: z.date(),
});

export const lpStatsSchema = z.object({
  id: z.string().uuid(),
  bagReserve: z.number().min(0),
  blazeReserve: z.number().min(0),
  price: z.number().min(0),
  timestamp: z.date(),
});

export const stakeTransactionSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().min(0),
  type: z.enum(['stake', 'withdraw']),
  timestamp: z.date(),
});

// Insert schemas
export const insertVaultSchema = vaultSchema.omit({ id: true, timestamp: true });
export const insertLpStatsSchema = lpStatsSchema.omit({ id: true, timestamp: true });
export const insertStakeTransactionSchema = stakeTransactionSchema.omit({ id: true, timestamp: true });

// Types
export type Vault = z.infer<typeof vaultSchema>;
export type LPStats = z.infer<typeof lpStatsSchema>;
export type StakeTransaction = z.infer<typeof stakeTransactionSchema>;
export type InsertVault = z.infer<typeof insertVaultSchema>;
export type InsertLPStats = z.infer<typeof insertLpStatsSchema>;
export type InsertStakeTransaction = z.infer<typeof insertStakeTransactionSchema>;