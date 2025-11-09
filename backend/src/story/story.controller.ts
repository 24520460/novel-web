// backend/src/story/story.controller.ts
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Bạn cần đảm bảo đã có JwtAuthGuard
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('stories')
export class StoryController {
  // ... constructor inject service

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) // 1. Xác thực đăng nhập -> 2. Kiểm tra quyền
  @Roles(Role.AUTHOR, Role.ADMIN)      // Chỉ cho phép AUTHOR hoặc ADMIN
  createStory(@Body() createStoryDto: any) {
    return { message: 'Chỉ author/admin mới thấy được dòng này khi gọi API' };
  }
}