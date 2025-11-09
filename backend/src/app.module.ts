// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // <-- 1. Import
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StoryModule } from './story/story.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ // <-- 2. Thêm vào imports
      isGlobal: true,      // <-- 3. Đặt là global để mọi module khác đều dùng được
    }),
    AuthModule,
    UsersModule,
    StoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}