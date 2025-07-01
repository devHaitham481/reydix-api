import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';
import { Fan } from '../../../domain/entities/fan.entity';

export async function seedFans(): Promise<Fan[]> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const fanRepository = AppDataSource.getRepository(Fan);

  const fans: Partial<Fan>[] = [];

  for (let i = 0; i < 10; i++) {
    const username = faker.internet.username().toLowerCase();
    const email = faker.internet.email().toLowerCase();

    fans.push({
      username: username,
      email: email,
    });
  }

  const createdFans = await fanRepository.save(fans);
  console.log(`Created ${createdFans.length} fans`);

  return createdFans as Fan[];
}
