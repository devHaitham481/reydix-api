import { FanEventConnection } from '../../../domain/entities/fan-event-connection.entity';
import { Fan } from '../../../domain/entities/fan.entity';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';

export async function seedFanEventConnections(): Promise<FanEventConnection[]> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const fanEventConnectionRepository =
    AppDataSource.getRepository(FanEventConnection);
  const fanRepository = AppDataSource.getRepository(Fan);

  const fans = await fanRepository.find();

  if (fans.length === 0) {
    throw new Error('Fans must be seeded before running fan-event connections');
  }

  const connections: Partial<FanEventConnection>[] = [];

  for (let i = 0; i < 20; i++) {
    const randomFan = faker.helpers.arrayElement(fans);
    const fakeEventId = faker.string.uuid();
    const connectionType = faker.helpers.arrayElement([
      'interested',
      'attending',
      'attended',
    ]);

    connections.push({
      fanId: randomFan.id,
      eventId: fakeEventId,
      connectionType: connectionType,
    });
  }

  const createdConnections =
    await fanEventConnectionRepository.save(connections);
  console.log(`Created ${createdConnections.length} fan-event connections`);

  return createdConnections as FanEventConnection[];
}
