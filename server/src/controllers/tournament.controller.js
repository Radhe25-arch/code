import prisma from '../lib/prisma.js';

export const getActiveTournaments = async (req, res) => {
  try {
    const tournaments = await prisma.tournament.findMany({
      where: {
        endDate: { gte: new Date() }
      },
      include: {
        _count: {
          select: { results: true }
        }
      }
    });
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTournamentDetails = async (req, res) => {
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: req.params.id },
      include: {
        results: {
          include: {
            user: {
              select: { username: true, avatar: true, level: true }
            }
          },
          orderBy: { xpEarned: 'desc' },
          take: 50
        }
      }
    });
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.user.id;

    const existing = await prisma.tournamentResult.findUnique({
      where: {
        userId_tournamentId: { userId, tournamentId }
      }
    });

    if (existing) return res.status(400).json({ message: 'Already joined' });

    await prisma.tournamentResult.create({
      data: {
        userId,
        tournamentId,
        rank: 0,
        xpEarned: 0
      }
    });

    res.json({ message: 'Joined tournament successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
