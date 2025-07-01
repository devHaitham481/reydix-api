import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EventsService } from '../services/event.service';
import { EventResponseDto } from '../dto/event-reponse.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT required',
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
