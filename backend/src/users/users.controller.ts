import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Áp dụng Guard cho toàn bộ controller này
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users - Chỉ ADMIN mới xem được danh sách user
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  // DELETE /users/:id - Chỉ ADMIN mới được xóa user
  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}