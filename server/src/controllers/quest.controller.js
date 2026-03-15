import prisma from '../lib/prisma.js';

export const getDailyQuest = async (req, res) => {
  try {
    // Get quest for today or create one if not exists
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let quest = await prisma.dailyQuest.findUnique({
      where: { date: today }
    });

    if (!quest) {
      quest = await prisma.dailyQuest.create({
        data: {
          title: 'Daily Coding Blitz',
          description: 'Solve 3 curriculum lessons today to maintain your legendary streak!',
          xpReward: 300,
          date: today
        }
      });
    }

    // Check user progress
    const userQuest = await prisma.userDailyQuest.findUnique({
      where: {
        userId_questId: {
          userId: req.user.id,
          questId: quest.id
        }
      }
    });

    res.json({ quest, completed: !!userQuest?.isCompleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeDailyQuest = async (req, res) => {
  try {
    const { questId } = req.params;
    const userId = req.user.id;

    const quest = await prisma.dailyQuest.findUnique({ where: { id: questId } });
    
    await prisma.userDailyQuest.upsert({
      where: { userId_questId: { userId, questId } },
      update: { isCompleted: true },
      create: { userId, questId, isCompleted: true }
    });

    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: quest.xpReward } }
    });

    res.json({ message: 'Daily quest completed!', xpEarned: quest.xpReward });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
