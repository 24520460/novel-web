import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

// Export để có thể tái sử dụng nếu cần
export enum StoryStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  HIATUS = 'HIATUS',
}

export class CreateStoryDto {
  @IsNotEmpty({ message: 'Tiêu đề truyện không được để trống' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cover_image_url?: string;

  @IsOptional()
  @IsEnum(StoryStatus)
  status?: StoryStatus;
}