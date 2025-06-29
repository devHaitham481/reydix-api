import { ApiProperty } from '@nestjs/swagger';
import { ArtistResponseDto } from './artist-response.dto';

export class EventResponseDto {
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
    type: [ArtistResponseDto],
    description: 'List of artists performing at the event',
  })
  artists: ArtistResponseDto[];
}
