import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    // 1. Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email này đã được sử dụng');
    }

    // 2. Mã hóa mật khẩu (hash salt rounds = 10)
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Tạo user mới trong database
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password_hash: hashedPassword,
        role: 'READER', // Mặc định là độc giả
      },
    });

    // 4. Trả về thông tin (loại bỏ password_hash để bảo mật)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = newUser;
    return result;
  }
}