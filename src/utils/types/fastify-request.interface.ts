import { CurrentUser } from './current-user.type';

declare module 'express' {
    export interface Request {
        user: CurrentUser;
    }
}
