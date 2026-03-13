import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Starting seed...');

    // Create test user
    const user = await prisma.user.upsert({
      where: { email: 'mark@yahoo.com' },
      update: {},
      create: {
        email: 'mark@yahoo.com',
        authProvider: 'EMAIL',
        nickname: 'Mark',
        avatar: 'https://i.pravatar.cc/150?img=1',
        age: 28,
        language: 'en',
        country: 'US',
        description: 'Test user for development',
        statusEmoji: '😊',
        statusMessage: 'Hey there!',
        showAge: true,
        showZodiac: true,
        showBirthday: false,
        showLocation: true,
      },
    });

    console.log('✅ Test user created/updated:', user);
    console.log('📧 Email: mark@yahoo.com');
    console.log('🆔 User ID:', user.id);

  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
