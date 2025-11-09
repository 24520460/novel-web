import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client'; // Hoặc đường dẫn tới enum Role của bạn

@Controller('stories')
export class StoryController {
  // CHỈ Inject StoryService, không inject PrismaService trực tiếp vào Controller nếu không quá cần thiết
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AUTHOR, Role.ADMIN)
  async create(@Request() req, @Body() createStoryDto: CreateStoryDto) {
    // Lấy userId từ token (do JwtAuthGuard đã validate và gán vào req.user)
    const userId = req.user.id; 
    
    // Gọi service để xử lý logic
    return this.storyService.create(createStoryDto, userId);
  }
}