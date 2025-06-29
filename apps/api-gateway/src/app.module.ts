import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { User } from './auth/user.entity' // Uncomment and add your User entity here if needed

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'reydix-db',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'Admin123',
      database: process.env.DB_NAME || 'reydix_db',
      // entities: [User], // Add your entities here, e.g., User entity for authentication
      synchronize: true, // TODO: set to false in production and use TypeORM migrations
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
