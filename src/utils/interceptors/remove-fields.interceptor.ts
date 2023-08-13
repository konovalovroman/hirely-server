import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class RemoveFieldsInterceptor implements NestInterceptor {
    constructor(private fieldsToRemove: string[]) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    for (let field of this.fieldsToRemove) {
                        data.forEach((item) => {
                            delete item[field];
                        });
                    }
                    return data;
                }
                if (data && typeof data === 'object') {
                    for (let field of this.fieldsToRemove) {
                        delete data[field];
                    }
                }
                return data;
            }),
        );
    }
}
