import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';
import { Fan } from '../../../domain/entities/fan.entity';
import { FanArtist } from '../../../domain/entities/fan-artist.entity';

export async function seedFanArtistConnections(
  existingFans?: Fan[],
): Promise<FanArtist[]> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const fanRepository = AppDataSource.getRepository(Fan);
  const fanArtistRepository = AppDataSource.getRepository(FanArtist);

  const fans = existingFans || (await fanRepository.find());

  if (fans.length === 0) {
    console.log('No fans found to create artist connections');
    return [];
  }

  let artistIds: string[] = [];

  try {
    const response = await fetch('http://localhost:3001/events/artists');
    if (response.ok) {
      const artists = await response.json();
      artistIds = artists.map((artist: any) => artist.id);
      console.log(`Fetched real artist IDs from events service`);
    } else {
      throw new Error(
        `Error seeding fan-artist connections: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    throw new Error(
      'Events service must be running to seed fan-artist connections',
    );
  }

  const fanArtistConnections: Partial<FanArtist>[] = [];

  // assign artists to each fan
  for (const fan of fans) {
    const numberOfArtistsToFollow = faker.number.int({ min: 1, max: 4 });
    const shuffledArtists = faker.helpers.shuffle(artistIds);
    const artistsToFollow = shuffledArtists.slice(0, numberOfArtistsToFollow);

    for (const artistId of artistsToFollow) {
      fanArtistConnections.push({
        fanId: fan.id,
        artistId: artistId,
        followedAt: faker.date.past({ years: 2 }),
      });
    }
  }

  const createdConnections =
    await fanArtistRepository.save(fanArtistConnections);
  console.log(`Created ${createdConnections.length} fan-artist connections`);

  return createdConnections as FanArtist[];
}
