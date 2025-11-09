// backend/src/auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Định nghĩa kiểu cho payload của Token (khớp với AuthService.login)
interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Lấy token từ header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // QUAN TRỌNG: Phải khớp với secret trong auth.module.ts
      secretOrKey: 'SUPER_SECRET_KEY_CHANGE_THIS', 
    });
  }

  // Hàm này chạy sau khi token đã được verify signature thành công
  async validate(payload: JwtPayload) {
    // Giá trị trả về ở đây sẽ được gán vào request.user
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}