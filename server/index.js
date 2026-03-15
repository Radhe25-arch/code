import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from './src/config/passport.js';
import authRoutes from './src/routes/auth.routes.js';
import courseRoutes from './src/routes/course.routes.js';
import leaderboardRoutes from './src/routes/leaderboard.routes.js';
import tournamentRoutes from './src/routes/tournament.routes.js';
import duelRoutes from './src/routes/duel.routes.js';
import questRoutes from './src/routes/quest.routes.js';
import inventoryRoutes from './src/routes/inventory.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/duels', duelRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('CodeArena API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
