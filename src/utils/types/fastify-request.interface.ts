import { JwtPayload } from './jwt-payload.type';

declare module 'fastify' {
    export interface FastifyRequest {
        user: JwtPayload & { refresh_token?: string };
    }
}
