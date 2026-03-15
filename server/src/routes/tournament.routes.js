import express from 'express';
import { getActiveTournaments, getTournamentDetails, joinTournament } from '../controllers/tournament.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getActiveTournaments);
router.get('/:id', getTournamentDetails);
router.post('/:tournamentId/join', protect, joinTournament);

export default router;
