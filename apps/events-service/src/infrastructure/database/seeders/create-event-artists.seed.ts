import { EventArtist } from '../../../domain/entities/event-artist.entity';
import { Event } from '../../../domain/entities/event.entity';
import { Artist } from '../../../domain/entities/artist.entity';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';

export async function seedEventArtists(): Promise<EventArtist[]> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const eventArtistRepository = AppDataSource.getRepository(EventArtist);
  const eventRepository = AppDataSource.getRepository(Event);
  const artistRepository = AppDataSource.getRepository(Artist);

  const events = await eventRepository.find();
  const artists = await artistRepository.find();

  if (events.length === 0 || artists.length === 0) {
    throw new Error(
      'Events and Artists must be seeded before running event-artist associations',
    );
  }

  const eventArtists: Partial<EventArtist>[] = [];

  // For each event, assign 1-3 random artists
  for (const event of events) {
    const numArtists = faker.number.int({ min: 1, max: 3 });
    const selectedArtists = faker.helpers.arrayElements(artists, numArtists);

    for (const artist of selectedArtists) {
      eventArtists.push({
        eventId: event.id,
        artistId: artist.id,
      });
    }
  }

  const createdEventArtists = await eventArtistRepository.save(eventArtists);
  console.log(
    `Created ${createdEventArtists.length} event-artist associations`,
  );

  return createdEventArtists as EventArtist[];
}
