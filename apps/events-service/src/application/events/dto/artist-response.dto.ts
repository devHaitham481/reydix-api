import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponseDto {
  @ApiProperty({ description: 'Id of the artist' })
  id: string;

  @ApiProperty({ description: 'Name of the artist' })
  name: string;
}
