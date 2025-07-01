import { seedFans } from './create-fans.seed';
import { seedFanEventConnections } from './create-fan-event-connections.seed';
import { AppDataSource } from '../data-source';
import { FanEventConnection } from '../../../domain/entities/fan-event-connection.entity';
import { Fan } from '../../../domain/entities/fan.entity';

export async function seedFansService(): Promise<void> {
  console.log('Orchestrating Fans Service seeding process');

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ Database connection established');
    }

    // Truncating tables first
    console.log('Clearing existing data...');
    const fanEventConnectionRepository =
      AppDataSource.getRepository(FanEventConnection);
    const fanRepository = AppDataSource.getRepository(Fan);

    await fanEventConnectionRepository.query(
      'DELETE FROM "fan_event_connections"',
    );
    await fanRepository.query('DELETE FROM "fans"');
    console.log('✅ Cleared all existing data');

    // Run in sequence
    console.log('Seeding fans...');
    const fans = await seedFans();
    console.log(`Created ${fans.length} fans`);

    console.log('Creating fan-event connections...');
    const connections = await seedFanEventConnections();
    console.log(`Created ${connections.length} fan-event connections`);

    console.log('Fans Service seeding completed successfully!');
  } catch (error) {
    console.error('Error during Fans Service seeding:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('📪 Database connection closed');
    }
  }
}

if (require.main === module) {
  seedFansService()
    .then(() => {
      console.log('Fans Service seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Fans Service seeding failed:', error);
      process.exit(1);
    });
}

