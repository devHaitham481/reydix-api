import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponseDto {
  @ApiProperty({ description: 'The unique identifier of the artist' })
  id: string;

  @ApiProperty({ description: 'The name of the artist' })
  name: string;
}
