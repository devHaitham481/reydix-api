import { FanEventConnection } from '../../../domain/entities/fan-event-connection.entity';
import { Fan } from '../../../domain/entities/fan.entity';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';
import * as fs from 'fs';

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

  const eventIdsFile = process.env.EVENT_IDS_FILE || '/tmp/event-ids.json';
  if (fs.existsSync(eventIdsFile)) {
    try {
      const fileContent = fs.readFileSync(eventIdsFile, 'utf8');
      eventIds = JSON.parse(fileContent);
      console.log(`📋 Loaded ${eventIds.length} event IDs from file`);
    } catch (error) {
      console.log(
        '⚠️ Failed to read event IDs from file, fetching from API...',
      );
    }
  }

  if (eventIds.length === 0) {
    try {
      const eventsServiceUrl =
        process.env.EVENTS_SERVICE_URL || 'http://events-service:3001';
      const response = await fetch(`${eventsServiceUrl}/events`);
      if (response.ok) {
        const events = await response.json();
        eventIds = events.map((event: any) => event.id);
        console.log(
          `🌐 Fetched ${eventIds.length} event IDs from events service`,
        );
      }
    } catch (error) {
      console.log('⚠️ Failed to fetch from API, using fallback...');
    }
  }

  if (eventIds.length === 0) {
    console.log(
      '🎭 No real event IDs found, generating fake ones for development',
    );
    eventIds = Array.from({ length: 10 }, () => faker.string.uuid());
  }

  const connections: Partial<FanEventConnection>[] = [];

  for (let i = 0; i < 20; i++) {
    const randomFan = faker.helpers.arrayElement(fans);
    const randomEventId = faker.helpers.arrayElement(eventIds);
    const connectionType = faker.helpers.arrayElement([
      'interested',
      'attending',
      'attended',
    ]);

    connections.push({
      fanId: randomFan.id,
      eventId: randomEventId,
      connectionType: connectionType,
    });
  }

  const createdConnections =
    await fanEventConnectionRepository.save(connections);
  console.log(`Created ${createdConnections.length} fan-event connections`);

  return createdConnections as FanEventConnection[];
}
