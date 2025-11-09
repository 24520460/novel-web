"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Định nghĩa interface cho dữ liệu User nhận từ backend
interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'AUTHOR' | 'READER';
  createdAt: string;
  _count?: {
    authoredStories: number;
  };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  // URL của backend - hãy đổi nếu bạn chạy port khác
  const BACKEND_URL = 'http://localhost:3001';

  useEffect(() => {
    // 1. Kiểm tra quyền Admin khi vào trang
    // Lấy token và thông tin user từ localStorage (hoặc nơi bạn lưu trữ)
    const token = localStorage.getItem('token');
    let userRole = '';
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        userRole = JSON.parse(userStr).role;
      }
    } catch (e) {
      console.error("Lỗi parse user info", e);
    }

    console.log("AdminPage checking auth:", { token, userRole });

    if (!token || userRole !== 'ADMIN') {
      alert('Bạn không có quyền truy cập trang quản trị này!');
      router.replace('/'); // Chuyển hướng về trang chủ nếu không phải admin
      return;
    }

    // 2. Nếu là admin, tiến hành fetch danh sách users
    setIsAuthorized(true);
    fetchUsers(token);
  }, [router]);

  const fetchUsers = async (token: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Gửi kèm token admin
        },
      });

      if (!res.ok) {
        if (res.status === 403) throw new Error('Không đủ quyền truy cập (403)');
        throw new Error('Không thể tải danh sách người dùng');
      }

      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    // Hộp thoại xác nhận trước khi xóa
    if (!window.confirm('CẢNH BÁO: Bạn có chắc chắn muốn xóa người dùng này? Tất cả truyện và dữ liệu liên quan của họ cũng sẽ bị xóa vĩnh viễn!')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Xóa thất bại');
      }

      // Xóa thành công thì loại user đó khỏi danh sách hiện tại (đỡ phải fetch lại)
      alert('Đã xóa người dùng thành công!');
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));

    } catch (err: any) {
      alert(`Lỗi khi xóa: ${err.message}`);
    }
  };
  if (!isAuthorized) {
      return null; // Hoặc hiển thị loading spinner trong lúc đang check/redirect
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Lỗi: {error}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản trị viên - Quản lý người dùng</h1>
        <span className="text-sm text-gray-500">Tổng số: {users.length} người dùng</span>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ngày tham gia
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Truyện đã đăng
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap font-medium">
                        {user.email}
                      </p>
                      <p className="text-gray-500 text-xs whitespace-no-wrap">ID: {user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full 
                    ${user.role === 'ADMIN' ? 'bg-red-200 text-red-900' : 
                      user.role === 'AUTHOR' ? 'bg-green-200 text-green-900' : 'bg-gray-200 text-gray-900'}`}>
                    <span aria-hidden className="absolute inset-0 opacity-50 rounded-full"></span>
                    <span className="relative text-xs">{user.role}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                   {/* Hiển thị số truyện nếu có, nếu không thì là 0 */}
                  <p className="text-gray-900 whitespace-no-wrap text-center">
                    {user._count?.authoredStories || 0}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {user.role !== 'ADMIN' ? (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs transition duration-150 ease-in-out"
                    >
                      Xóa bỏ
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs italic">Không thể xóa</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}