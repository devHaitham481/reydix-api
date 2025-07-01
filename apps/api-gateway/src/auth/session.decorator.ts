import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SessionContainer => {
    const request = ctx.switchToHttp().getRequest();
    return request.session;
  },
);

