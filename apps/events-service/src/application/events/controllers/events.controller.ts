import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { EventsService } from '../services/event.service';
import { EventResponseDto } from '../dto/event-reponse.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by ID with its performing artists' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the event',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Event found and returned successfully',
    type: EventResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async findOneWithArtists(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<EventResponseDto> {
    try {
      const event = await this.eventsService.findOneWithArtists(id);
      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(
        `Event with ID "${id}" could not be retrieved.`,
      );
    }
  }
}
