import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { ConfigService } from '@nestjs/config';

export const configureSupertokens = (configService: ConfigService) => {
  const config = {
    framework: 'express' as const,
    supertokens: {
      connectionURI:
        configService.get<string>('SUPERTOKENS_CONNECTION_URI') ||
        'http://localhost:3567',
      apiKey: configService.get<string>('SUPERTOKENS_API_KEY') || '',
    },
    appInfo: {
      appName: configService.get<string>('APP_NAME') || 'Reydix API',
      apiDomain:
        configService.get<string>('API_DOMAIN') || 'http://localhost:3000',
      websiteDomain:
        configService.get<string>('WEBSITE_DOMAIN') || 'http://localhost:3000',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      EmailPassword.init(),
      Session.init({
        getTokenTransferMethod: () => 'cookie',
        antiCsrf: 'NONE', // Simplified for API-only usage
        cookieSecure: false, // For development
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
            };
          },
        },
      }),
    ],
  };

  console.log('SuperTokens Config:', {
    connectionURI: config.supertokens.connectionURI,
    apiDomain: config.appInfo.apiDomain,
    websiteDomain: config.appInfo.websiteDomain,
  });

  return config;
};

