import express from 'express';
import { insertVaultSchema, insertLpStatsSchema, insertStakeTransactionSchema } from '../shared/schema.js';
import { storage } from './storage.js';

const router = express.Router();

// Vault routes
router.get('/api/vault', async (req, res) => {
  try {
    const vault = await storage.getVault();
    res.json(vault);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vault data' });
  }
});

router.post('/api/vault', async (req, res) => {
  try {
    const validatedData = insertVaultSchema.parse(req.body);
    const vault = await storage.updateVault(validatedData);
    res.json(vault);
  } catch (error) {
    res.status(400).json({ error: 'Invalid vault data' });
  }
});

// LP Stats routes
router.get('/api/lpstats', async (req, res) => {
  try {
    const lpStats = await storage.getLPStats();
    res.json(lpStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LP stats' });
  }
});

router.post('/api/lpstats', async (req, res) => {
  try {
    const validatedData = insertLpStatsSchema.parse(req.body);
    const lpStats = await storage.updateLPStats(validatedData);
    res.json(lpStats);
  } catch (error) {
    res.status(400).json({ error: 'Invalid LP stats data' });
  }
});

// Transaction routes
router.post('/api/transactions', async (req, res) => {
  try {
    const validatedData = insertStakeTransactionSchema.parse(req.body);
    const transaction = await storage.createTransaction(validatedData);
    
    // Update vault based on transaction
    const currentVault = await storage.getVault();
    if (currentVault) {
      const newUserStake = validatedData.type === 'stake' 
        ? currentVault.userStake + validatedData.amount
        : Math.max(0, currentVault.userStake - validatedData.amount);
      
      const newTotalStaked = validatedData.type === 'stake'
        ? currentVault.totalStaked + validatedData.amount
        : Math.max(0, currentVault.totalStaked - validatedData.amount);
      
      await storage.updateVault({
        totalStaked: newTotalStaked,
        userStake: newUserStake,
      });
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Invalid transaction data' });
  }
});

router.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await storage.getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;