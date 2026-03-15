import prisma from '../lib/prisma.js';

export const getGlobalLeaderboard = async (req, res) => {
  try {
    const topUsers = await prisma.user.findMany({
      orderBy: { xp: 'desc' },
      take: 100,
      select: {
        id: true,
        username: true,
        fullName: true,
        xp: true,
        level: true,
        avatar: true,
      }
    });
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryLeaderboard = async (req, res) => {
  try {
    const { category } = req.params;
    // For simplicity, we filter by interest for now, 
    // real category leaderboard would track XP per category
    const users = await prisma.user.findMany({
      where: {
        interests: { has: category }
      },
      orderBy: { xp: 'desc' },
      take: 50,
      select: {
        id: true,
        username: true,
        xp: true,
        level: true,
        avatar: true,
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
