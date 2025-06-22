import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { User } from './auth/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'fans-db',
      username: process.env.DB_USER || 'fans-user',
      password: process.env.DB_PASSWORD || 'Admin123',
      database: process.env.DB_NAME || 'fans_db',
      // entities: [User],
      synchronize: true, //TODO: set to false in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
