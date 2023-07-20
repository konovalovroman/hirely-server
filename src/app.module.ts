import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './src/core/users/users.module';
import { CoreModule } from './users/core/core.module';
import { CoreModule } from './users/core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CoreModule,
    UsersModule,
  ]
})
export class AppModule {}
