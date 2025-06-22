import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the HTTP server for health checks and potential REST endpoints
  const httpPort = parseInt(process.env.PORT || '3001', 10); // Or 3002 for fans-service
  const httpServer = await NestFactory.create(AppModule);
  await httpServer.listen(httpPort, '0.0.0.0'); // <--- CRITICAL: Add '0.0.0.0' here
  console.log(`HTTP Server running on port ${httpPort}`);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    },
  );
  await app.listen();
  console.log(
    `Events Service is running on port ${process.env.PORT || 3001} (Microservice)`,
  );
}
bootstrap();
