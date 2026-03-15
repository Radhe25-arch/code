import prismaPkg from '@prisma/client';
const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

async function main() {
  console.log('Seed starting...');

  // Create Courses
  const course1 = await prisma.course.create({
    data: {
      title: 'React.js Mastery (2024)',
      description: 'Go from zero to hero with React. Learn hooks, state management, and performance optimization.',
      difficulty: 'BEGINNER',
      category: 'Web Dev',
      xpPoints: 1200,
      lessons: {
        create: [
          {
            title: 'Welcome to the Arena',
            content: 'React is a library for building user interfaces. Everything in React is a component.',
            quizzes: {
              create: [
                {
                  question: 'What is React?',
                  options: ['A library', 'A framework', 'A database', 'A browser'],
                  correctAnswer: 'A library'
                }
              ]
            }
          },
          {
             title: 'The Magic of JSX',
             content: 'JSX allows us to write HTML-like code inside JavaScript.',
             quizzes: {
                create: [
                   {
                      question: 'What does JSX stand for?',
                      options: ['JavaScript XML', 'JavaScript Extra', 'Java Syntax', 'Just Some X-ray'],
                      correctAnswer: 'JavaScript XML'
                   }
                ]
             }
          }
        ]
      }
    }
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Python for Legends',
      description: 'Master clean, efficient Python code and build powerful automation tools.',
      difficulty: 'INTERMEDIATE',
      category: 'Python',
      xpPoints: 1500,
      lessons: {
        create: [
          {
            title: 'Lists and Comprehensions',
            content: 'Python lists are flexible and powerful. List comprehensions make them concise.',
            quizzes: {
              create: [
                {
                  question: 'Which is a valid list comprehension?',
                  options: ['[x for x in r]', '{x for x}', '(x for x)', 'list(x)'],
                  correctAnswer: '[x for x in r]'
                }
              ]
            }
          }
        ]
      }
    }
  });

  // Create Tournaments
  await prisma.tournament.create({
    data: {
      name: 'Binary Blitz #42',
      type: 'CODING',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      bonusXP: 1000
    }
  });

  // Create RPG Items
  const item1 = await prisma.item.create({
    data: {
      name: 'Scholar\'s Focus',
      description: 'A glowing headband that sharpens your concentration.',
      type: 'XP_BOOST',
      rarity: 'COMMON',
      buffValue: 1.1, // 10% XP boost
      icon: '🧠'
    }
  });

  const item2 = await prisma.item.create({
    data: {
      name: 'Titanium Keyboard',
      description: 'A keyboard forged in the core of a dying server.',
      type: 'ACCURACY_BUFF',
      rarity: 'RARE',
      buffValue: 1.25,
      icon: '⌨️'
    }
  });

  const item3 = await prisma.item.create({
    data: {
      name: 'Legend\'s Cape',
      description: 'The cape worn by the first warrior to reach level 100.',
      type: 'XP_BOOST',
      rarity: 'LEGENDARY',
      buffValue: 2.0, // 100% XP boost
      icon: '🧥'
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
