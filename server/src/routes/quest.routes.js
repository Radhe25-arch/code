import express from 'express';
import { getDailyQuest, completeDailyQuest } from '../controllers/quest.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/today', getDailyQuest);
router.post('/complete/:questId', completeDailyQuest);

export default router;
