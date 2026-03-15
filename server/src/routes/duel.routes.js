import express from 'express';
import { createDuel, submitDuelResult, getMyDuels } from '../controllers/duel.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.post('/create', createDuel);
router.post('/submit', submitDuelResult);
router.get('/my-duels', getMyDuels);

export default router;
