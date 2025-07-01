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

    const users = [];
    for (let i = 0; i < 10; i++) {
      const passwordHash = await bcrypt.hash(faker.internet.password(), 10);
      users.push({
        name: faker.person.firstName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        passwordHash: passwordHash,
        createdAt: new Date(),
      });
    }

    try {
      await userRepository.insert(users);
      console.log('10 users inserted successfully.');
    } catch (error) {
      console.error('Error inserting users:', error);
    }
  }
}
