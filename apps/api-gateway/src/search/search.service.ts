import {
  Injectable,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TokenService } from '../auth/jwt.service';
import {
  EventFanSearchResponseDto,
  EventSearchResultDto,
  FanSearchResultDto,
} from './dto/event-search-response.dto';

@Injectable()
export class SearchService {
  private readonly eventsServiceUrl: string;
  private readonly fansServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    this.eventsServiceUrl =
      this.configService.get<string>('EVENTS_SERVICE_URL') ||
      'http://localhost:3001';
    this.fansServiceUrl =
      this.configService.get<string>('FANS_SERVICE_URL') ||
      'http://localhost:3002';
  }

  async findRelevantFansForEvent(
    eventId: string,
    userId: string,
    userEmail: string,
  ): Promise<EventFanSearchResponseDto> {
    try {
      const serviceToken = this.tokenService.generateServiceToken(
        userId,
        userEmail,
      );

      // get events
      const eventData = await this.getEventWithArtists(eventId, serviceToken);

      // map event artists' ids
      const artistIds = eventData.artists.map((artist) => artist.id);

      // get relevant fans
      const fansData = await this.getRelevantFans(
        eventId,
        artistIds,
        serviceToken,
      );

      // return aggregated response
      return {
        event: eventData,
        relevantFans: fansData.fans,
        totalFans: fansData.total,
        // metadata for debugging
        searchMetadata: {
          eventId,
          searchedArtistIds: artistIds,
          searchTimestamp: new Date(),
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadGatewayException(
        'Failed to retrieve event or fan data from services',
      );
    }
  }

  private async getEventWithArtists(
    eventId: string,
    token: string,
  ): Promise<EventSearchResultDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.eventsServiceUrl}/events/${eventId}`, {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Event with ID "${eventId}" not found`);
      }
      throw new BadGatewayException('Events service unavailable');
    }
  }

  private async getRelevantFans(
    eventId: string,
    artistIds: string[],
    token: string,
  ): Promise<{ fans: FanSearchResultDto[]; total: number }> {
    try {
      const queryParams =
        artistIds.length > 0 ? `?artistIds=${artistIds.join(',')}` : '';
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.fansServiceUrl}/fans/relevant-for-event/${eventId}${queryParams}`,
          {
            timeout: 5000,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return {
        fans: response.data.fans,
        total: response.data.total,
      };
    } catch (error) {
      throw new BadGatewayException('Fans service unavailable');
    }
  }
}
