import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Khởi tạo ứng dụng với Fastify Adapter để tăng hiệu năng
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // Bảo mật: Sử dụng @fastify/helmet (Tuân thủ OWASP)
  await app.register(helmet);

  // Validation và CORS
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: ['http://localhost:3000'], // hoặc true cho dev
    credentials: true,
  });

  // Rate Limiting (@nestjs/throttler) sẽ được cấu hình trong AppModule

  await app.listen(4000, '0.0.0.0');
  console.log(`Backend running with Fastify on: ${await app.getUrl()}`);
}

bootstrap();