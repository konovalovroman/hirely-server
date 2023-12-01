import { JwtPayload } from './jwt-payload.type';

export type CurrentUser = JwtPayload & { refresh_token?: string };
