import { Controller, Post, UseGuards, Body, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma.service'; // Đảm bảo đường dẫn đúng

@Controller('stories')
export class StoryController {
  // Inject PrismaService vào constructor
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AUTHOR, Role.ADMIN)
  async createStory(@Request() req, @Body() data: { title: string; description?: string; cover_image_url?: string }) {
    // Lấy ID của user đang đăng nhập từ token (do JwtAuthGuard gán vào req.user)
    // Lưu ý: Cần đảm bảo JwtStrategy của bạn trả về object có trường 'id'
    const userId = req.user.id; 

    // Tạo slug đơn giản từ title (có thể cải thiện sau để xử lý tiếng Việt tốt hơn)
    // Thêm timestamp để tránh trùng lặp slug
    const slug = data.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now();

    const newStory = await this.prisma.story.create({
      data: {
        title: data.title,
        slug: slug,
        description: data.description,
        cover_image_url: data.cover_image_url,
        author_id: userId,
        // status mặc định là ONGOING như trong schema
      },
    });

    return { message: 'Tạo truyện thành công', story: newStory };
  }
}