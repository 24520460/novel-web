'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthorDashboard() {
  const { user, loading, isAuthor } = useAuth();
  const router = useRouter();

  // State cho form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' | 'error'

  useEffect(() => {
    if (!loading && !isAuthor) {
      router.push('/');
    }
  }, [loading, isAuthor, router]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Đang kiểm tra quyền truy cập...</div>;
  }

  if (!isAuthor) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('accessToken');
      // Thay đổi URL này nếu backend của bạn chạy ở port khác hoặc đã deploy
      const res = await fetch('http://localhost:4000/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          cover_image_url: coverUrl || null, // Gửi null nếu chuỗi rỗng
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra khi tạo truyện');
      }

      setMessage({ text: 'Đăng truyện mới thành công!', type: 'success' });
      // Reset form
      setTitle('');
      setDescription('');
      setCoverUrl('');
      
      // Tùy chọn: chuyển hướng đến trang chi tiết truyện vừa tạo
      // router.push(`/story/${data.story.slug}`);

    } catch (error: any) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Tác Giả</h1>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-8 border-l-4 border-blue-500">
        <p className="text-blue-700">
          Chào mừng tác giả <strong>{user?.email}</strong>! Hãy bắt đầu sáng tác tác phẩm mới của bạn.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Đăng Truyện Mới</h2>

        {message.text && (
          <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Tên truyện <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập tên tác phẩm..."
            />
          </div>

          <div>
            <label htmlFor="coverUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Link ảnh bìa (URL)
            </label>
            <input
              id="coverUrl"
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/anh-bia.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">Tạm thời chỉ hỗ trợ link ảnh trực tiếp.</p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Giới thiệu / Tóm tắt
            </label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nội dung sơ lược về tác phẩm..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Tạo Truyện Mới'}
            </button>
          </div>
        </form>
      </div>

      {/* Khu vực hiển thị danh sách truyện đã đăng (có thể thêm sau) */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Tác Phẩm Của Bạn</h2>
        <p className="text-gray-500 italic">Chưa có tác phẩm nào. Hãy đăng tác phẩm đầu tiên!</p>
        {/* TODO: Fetch và hiển thị danh sách truyện của author hiện tại */}
      </div>
    </div>
  );
}