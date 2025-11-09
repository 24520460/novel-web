import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateStoryDto } from './dto/create-story.dto';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStoryDto, authorId: string) {
    // Logic tạo slug (giữ nguyên như bạn đã viết)
    const slug = data.title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      + '-' + Date.now();

    return this.prisma.story.create({
      data: {
        title: data.title,
        slug: slug, // Slug tự động
        description: data.description,
        cover_image_url: data.cover_image_url,
        status: data.status, // Thêm status nếu DTO có gửi lên
        author_id: authorId, // Link với tác giả
      },
    });
  }
}