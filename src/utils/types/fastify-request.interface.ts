import { CurrentUser } from './current-user.type';

declare module 'fastify' {
    export interface FastifyRequest {
        user: CurrentUser;
    }
}
