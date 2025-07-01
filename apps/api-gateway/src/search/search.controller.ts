import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SearchService } from './search.service';
import { EventFanSearchResponseDto } from './dto/event-search-response.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';

@ApiTags('Search')
@Controller('events')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':eventId/relevant-fans')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    description:
      'Find relevant fans for an event based on the artists performing there',
  })
  @ApiParam({
    name: 'eventId',
    description: 'The UUID of the event to find relevant fans for',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Event and their relevant fans found success',
    type: EventFanSearchResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - authentication required',
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiResponse({ status: 502, description: 'A services is unavailable' })
  async findRelevantFansForEvent(
    @Param('eventId', ParseUUIDPipe) eventId: string,
    @Session() session: SessionContainer,
  ): Promise<EventFanSearchResponseDto> {
    const userId = session.getUserId();
    const payload = session.getAccessTokenPayload();
    const userEmail = payload.email;

    return this.searchService.findRelevantFansForEvent(
      eventId,
      userId,
      userEmail,
    );
  }
}
