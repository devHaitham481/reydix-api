import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fan } from './domain/entities/fan.entity';
import { FanEventConnection } from './domain/entities/fan-event-connection.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'fans-db',
      port: 5432,
      username: 'fans_user',
      password: 'Admin123',
      database: 'fans_db',
      entities: [Fan, FanEventConnection],
      synchronize: true, //TODO: set to false in production
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
