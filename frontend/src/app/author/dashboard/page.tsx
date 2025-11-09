'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthorDashboard() {
  const { user, loading, isAuthor } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Nếu đã load xong mà chưa đăng nhập hoặc không phải author -> đá về trang chủ
    if (!loading && !isAuthor) {
      router.push('/'); 
      // Hoặc hiển thị trang 403 Forbidden
    }
  }, [loading, isAuthor, router]);

  if (loading) {
      return <div className="p-8 text-center">Đang kiểm tra quyền truy cập...</div>;
  }

  if (!isAuthor) {
      return null; // Sẽ redirect bởi useEffect, tránh flash nội dung
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Tác Giả</h1>
      <p>Chào mừng tác giả {user?.email}!</p>
      {/* Các chức năng đăng truyện, quản lý chương ở đây */}
    </div>
  );
}