import prisma from '../lib/prisma.js';

export const getAllCourses = async (req, res) => {
  try {
    const { category } = req.query;
    const courses = await prisma.course.findMany({
      where: category ? { category } : {},
      include: {
        _count: {
          select: { lessons: true }
        }
      }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: {
        lessons: {
          include: { quizzes: true }
        }
      }
    });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeLesson = async (req, res) => {
  try {
    const { lessonId, courseId } = req.body;
    const userId = req.user.id;

    // Check if already completed
    const existing = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: { userId, courseId }
      }
    });

    // Award XP (logic for gamification)
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    const xpGain = 50; // Standard XP per lesson

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpGain },
        activities: {
          create: {
            xpEarned: xpGain,
          }
        }
      }
    });

    // Check for level up
    const newLevel = calculateLevel(updatedUser.xp);
    if (newLevel !== updatedUser.level) {
      await prisma.user.update({
        where: { id: userId },
        data: { level: newLevel }
      });
    }

    res.json({ 
      message: 'Lesson completed', 
      xpEarned: xpGain, 
      newTotalXp: updatedUser.xp,
      level: newLevel
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculateLevel = (xp) => {
  if (xp < 500) return 'Beginner';
  if (xp < 1500) return 'Apprentice';
  if (xp < 3000) return 'Developer';
  if (xp < 6000) return 'Pro';
  if (xp < 12000) return 'Expert';
  return 'Legend';
};
