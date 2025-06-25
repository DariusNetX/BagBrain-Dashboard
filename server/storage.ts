import { 
  Vault, 
  LPStats, 
  StakeTransaction, 
  IQLeaderboard,
  InsertVault, 
  InsertLPStats, 
  InsertStakeTransaction,
  InsertIQLeaderboard,
  iqLeaderboard
} from '../shared/schema.js';
import { eq, desc } from 'drizzle-orm';

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
  
  // IQ Leaderboard operations
  getTopScores(): Promise<IQLeaderboard[]>;
  addScore(data: InsertIQLeaderboard): Promise<IQLeaderboard>;
  isHighScore(score: number): Promise<boolean>;
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

  async getTopScores(): Promise<IQLeaderboard[]> {
    if (!db) {
      // Fallback for development
      return [];
    }
    try {
      const scores = await db.select().from(iqLeaderboard).orderBy(desc(iqLeaderboard.score)).limit(3);
      return scores.map(score => ({
        ...score,
        timestamp: score.timestamp.toISOString()
      }));
    } catch (error) {
      console.error('Failed to get top scores:', error);
      return [];
    }
  }

  async addScore(data: InsertIQLeaderboard): Promise<IQLeaderboard> {
    if (!db) {
      // Fallback for development
      const mockScore: IQLeaderboard = {
        id: Date.now(),
        ...data,
        timestamp: new Date().toISOString()
      };
      return mockScore;
    }
    try {
      const [newScore] = await db.insert(iqLeaderboard).values(data).returning();
      return {
        ...newScore,
        timestamp: newScore.timestamp.toISOString()
      };
    } catch (error) {
      console.error('Failed to add score:', error);
      throw error;
    }
  }

  async isHighScore(score: number): Promise<boolean> {
    if (!db) {
      // Always allow in development
      return true;
    }
    try {
      const topScores = await db.select().from(iqLeaderboard).orderBy(desc(iqLeaderboard.score)).limit(3);
      if (topScores.length < 3) {
        return true;
      }
      return score > topScores[2].score;
    } catch (error) {
      console.error('Failed to check high score:', error);
      return false;
    }
  }
}

export const storage = new MemStorage();