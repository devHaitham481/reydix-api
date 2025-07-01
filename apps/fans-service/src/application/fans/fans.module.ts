import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fan } from '../../domain/entities/fan.entity';
import { FanEventConnection } from '../../domain/entities/fan-event-connection.entity';
import { FanArtist } from '../../domain/entities/fan-artist.entity';
import { FansController } from './controllers/fans.controller';
import { FansService } from './services/fans.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fan, FanEventConnection, FanArtist])],
  controllers: [FansController],
  providers: [FansService],
  exports: [FansService],
})
export class FansModule {}

