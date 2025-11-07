# Giai đoạn 1: Build ứng dụng
FROM node:18-alpine AS builder

WORKDIR /app

# Cài đặt phụ thuộc (dùng npm)
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn và build
COPY . .
# Đảm bảo Prisma client được tạo
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Fallback nếu không truyền build-arg
RUN echo "DATABASE_URL=${DATABASE_URL:-postgresql://dummy:dummy@localhost:5432/dummy}" > .env
RUN npx prisma generate
RUN npm run build

# Giai đoạn 2: Production image
FROM node:18-alpine

WORKDIR /app

# Chỉ sao chép các file cần thiết cho production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Mở cổng mà ứng dụng NestJS chạy 
EXPOSE 3000

# Lệnh chạy migrate và khởi động ứng dụng
# (Trong production thực tế, migrate nên chạy như một tác vụ riêng biệt)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]