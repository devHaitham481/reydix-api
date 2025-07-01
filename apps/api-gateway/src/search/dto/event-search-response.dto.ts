import { ApiProperty } from '@nestjs/swagger';

export class EventSearchArtistDto {
  @ApiProperty({ description: 'The unique identifier of the artist' })
  id: string;

  @ApiProperty({ description: 'The name of the artist' })
  name: string;
}

export class EventSearchResultDto {
  @ApiProperty({ description: 'The unique identifier of the event' })
  id: string;

  @ApiProperty({ description: 'The name of the event' })
  name: string;

  @ApiProperty({
    description: 'The date and time of the event',
    example: '2025-09-15T19:00:00.000Z',
  })
  date: Date;

  @ApiProperty({ description: 'The location of the event' })
  venue: string;

  @ApiProperty({
    type: [EventSearchArtistDto],
    description: 'List of artists performing at the event',
  })
  artists: EventSearchArtistDto[];
}

export class FanSearchResultDto {
  @ApiProperty({ description: 'The unique identifier of the fan' })
  id: string;

  @ApiProperty({ description: 'The username of the fan' })
  username: string;

  @ApiProperty({ description: 'The email of the fan' })
  email: string;

  @ApiProperty({
    description: 'How the fan is connected to the event',
    enum: ['interested', 'attending', 'attended'],
    required: false,
  })
  connectionType?: string;

  @ApiProperty({
    description: 'Relevance score for this fan (higher = more relevant)',
    example: 0.95,
  })
  relevanceScore: number;
}

export class EventFanSearchResponseDto {
  @ApiProperty({
    description: 'Event details including performing artists',
    type: EventSearchResultDto,
  })
  event: EventSearchResultDto;

  @ApiProperty({
    description: 'List of relevant fans sorted by relevance score (descending)',
    type: [FanSearchResultDto],
  })
  relevantFans: FanSearchResultDto[];

  @ApiProperty({ description: 'Total number of relevant fans found' })
  totalFans: number;

  @ApiProperty({ description: 'Search metadata' })
  searchMetadata: {
    eventId: string;
    searchedArtistIds: string[];
    searchTimestamp: Date;
  };
}

