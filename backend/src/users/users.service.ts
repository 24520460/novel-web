import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Lấy danh sách tất cả users (bỏ qua password_hash để bảo mật)
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Có thể đếm thêm số truyện đã đăng nếu muốn
        _count: {
          select: { authoredStories: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Xóa user theo ID
  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}