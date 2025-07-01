import { Artist } from '../../../domain/entities/artist.entity';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';

export async function seedArtists(): Promise<Artist[]> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const artistRepository = AppDataSource.getRepository(Artist);

  const artists: Partial<Artist>[] = [];

  for (let i = 0; i < 10; i++) {
    const artistName = faker.person.fullName();

    artists.push({
      name: artistName,
    });
  }

  const createdArtists = await artistRepository.save(artists);
  console.log(`Created ${createdArtists.length} artists`);

  return createdArtists as Artist[];
}

