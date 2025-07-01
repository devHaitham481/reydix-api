import { ApiProperty } from '@nestjs/swagger';
import { FanResponseDto } from './fan-response.dto';

export class RelevantFansResponseDto {
  @ApiProperty({
    description: 'List of relevant fans',
    type: [FanResponseDto],
  })
  fans: FanResponseDto[];

  @ApiProperty({ description: 'Total number of relevant fans found' })
  total: number;

  @ApiProperty({ description: 'Event id of relevant fans' })
  eventId: string;
}
