import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
// Giả định ROLES_KEY được định nghĩa trong decorators

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // Giả định request đã qua JwtAuthGuard và có thông tin user
    const { user } = context.switchToHttp().getRequest();
    
    if (!user || !requiredRoles.some((role) => user.role === role)) {
        throw new ForbiddenException('Không đủ quyền truy cập.');
    }
    return true;
  }
}