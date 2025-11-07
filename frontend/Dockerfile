# Giai đoạn 1: Build ứng dụng
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Cung cấp URL backend lúc build
ARG BACKEND_API_URL
ENV BACKEND_API_URL=${BACKEND_API_URL}

RUN npm run build

# Giai đoạn 2: Production image (Sử dụng Standalone output)
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Sao chép các file build standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Mở cổng 3000 (cổng mặc định của Next.js production)
EXPOSE 3000
ENV PORT=3000

# Biến môi trường lúc chạy (sẽ được ghi đè bởi docker-compose)
ENV BACKEND_API_URL="http://backend:3000"

CMD ["node", "server.js"]