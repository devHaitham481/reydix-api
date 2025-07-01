import { ApiProperty } from '@nestjs/swagger';
import { ArtistResponseDto } from './artist-response.dto';

export class EventResponseDto {
  @ApiProperty({ description: 'Id of the event' })
  id: string;

  @ApiProperty({ description: 'Name of the event' })
  name: string;

  @ApiProperty({
    description: 'Date the event',
    example: '2025-09-15T19:00:00.000Z',
  })
  date: Date;

  @ApiProperty({ description: 'location or city of the event' })
  venue: string;

  @ApiProperty({
    type: [ArtistResponseDto],
    description: 'Artists performing at the event',
  })
  artists: ArtistResponseDto[];
}
