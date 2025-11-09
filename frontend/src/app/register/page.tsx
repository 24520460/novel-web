'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Gọi API Backend (Lưu ý: đảm bảo Backend đang chạy ở port 4000 như trong main.ts của bạn)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:4000'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Đăng ký thất bại');
      }

      // Đăng ký thành công
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      router.push('/login'); // Chuyển hướng sang trang đăng nhập

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Đăng ký tài khoản</h2>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký ngay'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản? <Link href="/login" className="text-blue-600 hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}