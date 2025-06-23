import { Vault, LPStats, StakeTransaction, InsertVault, InsertLPStats, InsertStakeTransaction } from '../shared/schema.js';

export interface IStorage {
  // Vault operations
  getVault(): Promise<Vault | null>;
  updateVault(data: InsertVault): Promise<Vault>;
  
  // LP Stats operations
  getLPStats(): Promise<LPStats | null>;
  updateLPStats(data: InsertLPStats): Promise<LPStats>;
  
  // Transaction operations
  createTransaction(data: InsertStakeTransaction): Promise<StakeTransaction>;
  getTransactions(): Promise<StakeTransaction[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private vault: Vault | null = {
    id: crypto.randomUUID(),
    totalStaked: 0,
    userStake: 0,
    timestamp: new Date(),
  };
  
  private lpStats: LPStats | null = {
    id: crypto.randomUUID(),
    bagReserve: 1000000,
    blazeReserve: 500000,
    price: 0.5,
    timestamp: new Date(),
  };
  
  private transactions: StakeTransaction[] = [];

  async getVault(): Promise<Vault | null> {
    return this.vault;
  }

  async updateVault(data: InsertVault): Promise<Vault> {
    this.vault = {
      id: this.vault?.id || crypto.randomUUID(),
      ...data,
      timestamp: new Date(),
    };
    return this.vault;
  }

  async getLPStats(): Promise<LPStats | null> {
    return this.lpStats;
  }

  async updateLPStats(data: InsertLPStats): Promise<LPStats> {
    this.lpStats = {
      id: this.lpStats?.id || crypto.randomUUID(),
      ...data,
      timestamp: new Date(),
    };
    return this.lpStats;
  }

  async createTransaction(data: InsertStakeTransaction): Promise<StakeTransaction> {
    const transaction: StakeTransaction = {
      id: crypto.randomUUID(),
      ...data,
      timestamp: new Date(),
    };
    this.transactions.push(transaction);
    return transaction;
  }

  async getTransactions(): Promise<StakeTransaction[]> {
    return this.transactions;
  }
}

export const storage = new MemStorage();