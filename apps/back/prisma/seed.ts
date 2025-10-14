import { PrismaClient } from './generated';

async function seed() {
  console.log('Starting seeding...');

  const prisma = new PrismaClient();
  await prisma.$connect();
  try {
    await prisma.url.createMany({
      data: [
        { url: 'https://www.google.com', id: 1 },
        { url: 'https://www.github.com', id: 2 },
        { url: 'https://www.nestjs.com', id: 3 },
      ],
      skipDuplicates: true,
    });
  } catch (e) {
    console.error('Error during seeding:', e);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .then(() => {
    console.log('Seeding finished.');
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  });
