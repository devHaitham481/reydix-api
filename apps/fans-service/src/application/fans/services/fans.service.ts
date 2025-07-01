import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fan } from '../../../domain/entities/fan.entity';
import { FanEventConnection } from '../../../domain/entities/fan-event-connection.entity';
import { FanArtist } from '../../../domain/entities/fan-artist.entity';
import { FanResponseDto } from '../dto/fan-response.dto';
import { RelevantFansResponseDto } from '../dto/relevant-fans-response.dto';

@Injectable()
export class FansService {
  constructor(
    @InjectRepository(Fan)
    private fansRepository: Repository<Fan>,
    @InjectRepository(FanEventConnection)
    private fanEventConnectionRepository: Repository<FanEventConnection>,
    @InjectRepository(FanArtist)
    private fanArtistRepository: Repository<FanArtist>,
  ) {}

  async findRelevantFansForEvent(
    eventId: string,
    artistIds: string[] = [],
  ): Promise<RelevantFansResponseDto> {
    if (artistIds.length === 0) {
      return {
        fans: [],
        total: 0,
        eventId,
      };
    }

    // Find releant fans based on artistIds performing at eventId
    const fanArtistConnections = await this.fanArtistRepository
      .createQueryBuilder('fanArtist')
      .leftJoinAndSelect('fanArtist.fan', 'fan')
      .where('fanArtist.artistId IN (:...artistIds)', { artistIds })
      .getMany();

    const relevantFans: FanResponseDto[] = fanArtistConnections.map((connection) => ({
      id: connection.fan.id,
      username: connection.fan.username,
      email: connection.fan.email,
    }));

    return {
      fans: relevantFans,
      total: relevantFans.length,
      eventId,
    };
  }
}
