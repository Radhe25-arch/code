import prisma from '../lib/prisma.js';

export const createDuel = async (req, res) => {
  try {
    const { player2Id, question, difficulty } = req.body;
    const player1Id = req.user.id;

    const duel = await prisma.duel.create({
      data: {
        player1Id,
        player2Id,
        question,
        difficulty,
        status: 'PENDING'
      }
    });
    res.status(201).json(duel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitDuelResult = async (req, res) => {
  try {
    const { duelId, time, accuracy, code } = req.body;
    const userId = req.user.id;

    const duel = await prisma.duel.findUnique({ where: { id: duelId } });
    if (!duel) return res.status(404).json({ message: 'Duel not found' });

    const stats = { time, accuracy, code };
    let data = {};

    if (duel.player1Id === userId) {
      data.player1Stats = stats;
    } else if (duel.player2Id === userId) {
      data.player2Stats = stats;
    } else {
      return res.status(403).json({ message: 'Not a participant' });
    }

    const updatedDuel = await prisma.duel.update({
      where: { id: duelId },
      data
    });

    // Check if both finished to determine winner
    if (updatedDuel.player1Stats && updatedDuel.player2Stats) {
      const p1 = updatedDuel.player1Stats;
      const p2 = updatedDuel.player2Stats;
      
      // Complex winner logic: accuracy first, then time
      let winnerId = null;
      if (p1.accuracy > p2.accuracy) {
        winnerId = updatedDuel.player1Id;
      } else if (p2.accuracy > p1.accuracy) {
        winnerId = updatedDuel.player2Id;
      } else {
        winnerId = p1.time < p2.time ? updatedDuel.player1Id : updatedDuel.player2Id;
      }

      await prisma.duel.update({
        where: { id: duelId },
        data: { 
          winnerId, 
          status: 'FINISHED',
          finishedAt: new Date()
        }
      });
      
      // Award XP to winner
      await prisma.user.update({
        where: { id: winnerId },
        data: { xp: { increment: 500 } }
      });
    }

    res.json({ message: 'Result submitted', duel: updatedDuel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyDuels = async (req, res) => {
  try {
    const duels = await prisma.duel.findMany({
      where: {
        OR: [
          { player1Id: req.user.id },
          { player2Id: req.user.id }
        ]
      },
      include: {
        player1: { select: { username: true, avatar: true } },
        player2: { select: { username: true, avatar: true } },
        winner: { select: { username: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(duels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
