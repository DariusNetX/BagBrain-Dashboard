import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use(routes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`BagBrain Dashboard server running on port ${PORT}`);
});