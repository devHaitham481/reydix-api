import { ApiProperty } from '@nestjs/swagger';

export class FanResponseDto {
  @ApiProperty({ description: 'unique identifier of the fan' })
  id: string;

  @ApiProperty({ description: 'username of the fan' })
  username: string;

  @ApiProperty({ description: 'email of the fan' })
  email: string;

  @ApiProperty({
    description: 'How the fan is connected to the event',
    enum: ['interested', 'attending', 'attended'],
  })
  connectionType?: string;
}
