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

  @Get()
  @ApiOperation({
    description: 'Get all events (for seeding purposes)',
  })
  @ApiResponse({
    status: 200,
    description: 'All events retrieved successfully',
    type: [EventResponseDto],
  })
  async findAll(): Promise<EventResponseDto[]> {
    return this.eventsService.findAll();
  }

  @Get('artists')
  @ApiOperation({
    description: 'Get all artists (for seeding purposes)',
  })
  @ApiResponse({
    status: 200,
    description: 'All artists retrieved successfully',
  })
  async findAllArtists() {
    return this.eventsService.findAllArtists();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get an event by ID with its artists',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the event',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Event found successfully',
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
