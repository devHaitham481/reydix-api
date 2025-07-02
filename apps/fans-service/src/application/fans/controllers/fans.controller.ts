import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FansService } from '../services/fans.service';
import { RelevantFansResponseDto } from '../dto/relevant-fans-response.dto';

@ApiTags('Fans')
@Controller('fans')
export class FansController {
  constructor(private readonly fansService: FansService) {}

  @Get('relevant-for-event/:eventId')
  @ApiOperation({
    description:
      'Returns fans who are connected to the event through the artist',
  })
  @ApiParam({
    name: 'eventId',
    description: 'UUID of the event to return fans for',
    type: 'string',
    format: 'uuid',
  })
  @ApiQuery({
    name: 'artistIds',
    description: 'list of artist UUIDs performing at the event',
    required: false,
    type: 'string',
    example: 'uuid1,uuid2,uuid3',
  })
  @ApiResponse({
    status: 200,
    description: 'Relevant fans found and returned successfully',
    type: RelevantFansResponseDto,
  })
  async findRelevantFansForEvent(
    @Param('eventId', ParseUUIDPipe) eventId: string,
    @Query('artistIds') artistIdsString?: string,
  ): Promise<RelevantFansResponseDto> {
    const artistIds = artistIdsString
      ? artistIdsString
          .split(',')
          .map((id) => id.trim())
          .filter((id) => id)
      : [];

    return this.fansService.findRelevantFansForEvent(eventId, artistIds);
  }
}
