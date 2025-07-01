import { seedArtists } from './create-artists.seed';
import { seedEvents } from './create-events.seed';
import { seedEventArtists } from './create-event-artists.seed';
import { AppDataSource } from '../data-source';
import { EventArtist } from '../../../domain/entities/event-artist.entity';
import { Event } from '../../../domain/entities/event.entity';
import { Artist } from '../../../domain/entities/artist.entity';

export async function seedEventsService(): Promise<void> {
  console.log('Orchestrating Events Service seeding process');

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ Database connection established');
    }

    // Truncating tables first
    console.log('Clearing existing data...');
    const eventArtistRepository = AppDataSource.getRepository(EventArtist);
    const eventRepository = AppDataSource.getRepository(Event);
    const artistRepository = AppDataSource.getRepository(Artist);

    await eventArtistRepository.query('DELETE FROM "event_artists"');
    await eventRepository.query('DELETE FROM "events"');
    await artistRepository.query('DELETE FROM "artists"');
    console.log('✅ Cleared all existing data');

    // Run in sequence
    console.log(' Seeding artists...');
    const artists = await seedArtists();
    console.log(`Created ${artists.length} artists`);

    console.log('Seeding events...');
    const events = await seedEvents();
    console.log(`Created ${events.length} events`);

    console.log('Creating event-artist associations...');
    const eventArtists = await seedEventArtists();
    console.log(`Created ${eventArtists.length} event-artist associations`);

    console.log('Events Service seeding completed successfully!');
  } catch (error) {
    console.error('Error during Events Service seeding:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('📪 Database connection closed');
    }
  }
}

if (require.main === module) {
  seedEventsService()
    .then(() => {
      console.log('🚀 Events Service seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Events Service seeding failed:', error);
      process.exit(1);
    });
}
