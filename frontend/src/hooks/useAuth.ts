'use client';

import { useState, useEffect } from 'react';

// Định nghĩa kiểu cho User dựa trên Prisma schema của bạn
interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'AUTHOR' | 'READER';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chạy chỉ ở phía client
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi parse user từ localStorage", error);
        // Xóa nếu dữ liệu lỗi
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setUser(null);
    window.location.href = '/login'; // Hoặc dùng router.push nếu muốn SPA navigation
  };

  return { 
    user, 
    loading, 
    logout,
    isAuthor: user?.role === 'AUTHOR' || user?.role === 'ADMIN',
    isAdmin: user?.role === 'ADMIN'
  };
}