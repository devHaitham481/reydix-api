import { Event } from '../../../domain/entities/event.entity';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';

const venues = [
  'Madison Square Garden',
  'The O2 Arena',
  'Red Rocks Amphitheatre',
  'Hollywood Bowl',
  'Royal Albert Hall',
];

export async function seedEvents(): Promise<Event[]> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const eventRepository = AppDataSource.getRepository(Event);

  const events: Partial<Event>[] = [];

  for (let i = 0; i < 10; i++) {
    const eventName = faker.lorem.words(3);
    const venue = faker.helpers.arrayElement(venues);
    const date = new Date(); // All events today

    events.push({
      name: eventName,
      venue: venue,
      date: date,
    });
  }

  const createdEvents = await eventRepository.save(events);
  console.log(`Created ${createdEvents.length} events`);

  return createdEvents as Event[];
}
