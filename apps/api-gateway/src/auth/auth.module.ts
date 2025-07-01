import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import supertokens from 'supertokens-node';
import { ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
import { AuthController } from './auth.controller';
import { TokenService } from './jwt.service';
import { configureSupertokens } from './supertokens.config';

@Module({
  providers: [TokenService],
  exports: [TokenService],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot(): DynamicModule {
    return {
      providers: [
        {
          useFactory: (configService: ConfigService) => {
            const config = configureSupertokens(configService);
            supertokens.init(config);
            return config;
          },
          inject: [ConfigService],
          provide: 'SUPERTOKENS_CONFIG',
        },
        TokenService,
      ],
      exports: [TokenService],
      imports: [
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
          inject: [ConfigService],
        }),
      ],
      module: AuthModule,
    };
  }
}

