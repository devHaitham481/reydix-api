import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { Error as STError } from 'supertokens-node';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    let err = undefined;
    const resp = ctx.getResponse();

    // You can create an optional version of this by passing {sessionRequired: false} to verifySession
    await verifySession()(ctx.getRequest(), resp, (res: any) => {
      err = res;
    });

    if (resp.headersSent) {
      throw new UnauthorizedException('CORS error from SuperTokens');
    }

    if (err) {
      throw new UnauthorizedException(err);
    }

    return true;
  }
}

