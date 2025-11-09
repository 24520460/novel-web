// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy'; // <--- 1. Import Strategy

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY_CHANGE_THIS', // Đảm bảo secret khớp nhau
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  // 2. Thêm JwtStrategy vào mảng providers
  providers: [AuthService, PrismaService, JwtStrategy], 
})
export class AuthModule {}