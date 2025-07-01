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

  // Real artist IDs from events service
  const artistIds = [
    '581e5cd9-6530-47ec-93b7-f9b2352fb385', // Theresa Medhurst
    '78c75935-4945-4eaa-9680-6e57eb04e3e7', // Olivia Connelly
    'b803050b-82ca-47bf-af3c-60161dce374d', // Pearl Hauck
    '580065ac-7532-4b17-aca8-28ea5afeb562', // Rex Stark Sr.
    '58cb11c8-10d9-4355-8c11-2e5fedc20a4f', // Dr. Armando Barrows
    'ee8f2eed-4149-4836-9eec-858c8db82342', // Gregory Roberts
    '18d1761a-a5c6-46e7-a926-5598dc4aa414', // Darnell Bartoletti
    'a14a7b09-3d5b-419b-92e2-82b8b4f29aa8', // Edward Hudson
    'a82b5cd0-690c-4571-9415-2a4fe4ac2170', // Erica Schoen DVM
    'ff900581-5a31-4dc7-8209-ceb98e87d364', // Timmy Daugherty
  ];

  const fanArtistConnections: Partial<FanArtist>[] = [];

  // For each fan, randomly assign them to follow 1-4 artists
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
