import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../auth/user.entity';
import { faker } from '@faker-js/faker';

export default class CreateUserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Running CreateUserSeeder...');

    await dataSource.query('TRUNCATE "users";');
    console.log('Users table truncated.');

    const userRepository = dataSource.getRepository(User);
    const passwordHash = await bcrypt.hash(faker.internet.password(), 10);

    const user = {
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash: passwordHash,
      createdAt: new Date(),
    };

    try {
      await userRepository.insert(user);
      await userRepository.save(user);
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }
}
