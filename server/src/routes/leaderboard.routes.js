import express from 'express';
import { getGlobalLeaderboard, getCategoryLeaderboard } from '../controllers/leaderboard.controller.js';

const router = express.Router();

router.get('/global', getGlobalLeaderboard);
router.get('/category/:category', getCategoryLeaderboard);

export default router;
