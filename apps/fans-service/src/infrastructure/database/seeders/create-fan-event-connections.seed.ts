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

  let eventIds: string[] = [];

  try {
    const response = await fetch('http://localhost:3001/events');
    if (response.ok) {
      const events = await response.json();
      eventIds = events.map((event: any) => event.id);
      console.log(
        `Fetched ${eventIds.length} real event IDs from events service`,
      );
    } else {
      throw new Error(
        `Error seeding fan event connections: ${response.status} ${response.statusText}`,
      );
    }
  } catch (error) {
    throw new Error(
      'Events service must be running to seed fan-event connections',
    );
  }

  // clear first
  await fanEventConnectionRepository.clear();

  // Create 20 connections
  for (let i = 0; i < 20; i++) {
    const randomFan = faker.helpers.arrayElement(fans);
    const randomEventId = faker.helpers.arrayElement(eventIds);
    const connectionType = faker.helpers.arrayElement([
      'interested',
      'attending',
      'attended',
    ]);

    try {
      await fanEventConnectionRepository.save({
        fanId: randomFan.id,
        eventId: randomEventId,
        connectionType: connectionType,
      });
    } catch (error) {}
  }

  const allConnections = await fanEventConnectionRepository.find();
  return allConnections;
}
