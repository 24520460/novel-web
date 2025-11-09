'use client'; // QUAN TRỌNG: Thêm dòng này đầu file

import Link from 'next/link';
import { Search, BookOpen, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Import hook vừa tạo

export default function Header() {
  const { user, loading, isAuthor, logout } = useAuth();

  // Có thể hiện skeleton loading nhẹ nếu cần thiết khi đang check localStorage
  // if (loading) return <header className="bg-white shadow-sm h-16 sticky top-0 z-50" />;

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            NovelWeb
          </Link>

          {/* Search Bar giữ nguyên */}
          <div className="hidden sm:block sm:w-1/3 lg:w-1/2 mx-4">
             {/* ... (giữ nguyên code search bar cũ của bạn) */}
              <div className="relative">
              <input type="text" placeholder="Tìm kiếm tác phẩm, tác giả..." className="w-full px-5 py-2 border rounded-full bg-gray-100 focus:ring-2 focus:ring-blue-500 text-sm" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-5 w-5" />
              </span>
            </div>
          </div>

          {/* Action Buttons - Thay đổi dựa trên trạng thái đăng nhập */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link href="/bookshelf" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm font-medium hidden md:inline">Giá sách</span>
            </Link>

            {user ? (
              // Nếu ĐÃ đăng nhập
              <div className="flex items-center gap-4">
                 <span className="text-sm text-gray-700 hidden sm:inline">
                    Chào, <strong>{user.email.split('@')[0]}</strong>
                 </span>
                 <button onClick={logout} className="text-red-500 hover:text-red-700" title="Đăng xuất">
                    <LogOut className="h-5 w-5" />
                 </button>
              </div>
            ) : (
              // Nếu CHƯA đăng nhập
              <>
                <Link href="/login" className="text-gray-600 hover:text-blue-600 text-sm font-medium hidden sm:inline">Đăng nhập</Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-200">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center font-medium text-gray-700 overflow-x-auto whitespace-nowrap">
            <li><Link href="/" className="inline-block py-3 px-4 hover:text-blue-600">Tất cả tác phẩm</Link></li>
            <li><Link href="/ranking" className="inline-block py-3 px-4 hover:text-blue-600">Bảng xếp hạng</Link></li>
            
            {/* Chỉ hiện nút này nếu là AUTHOR hoặc ADMIN */}
            {isAuthor && (
               <li>
                 <Link href="/author/dashboard" className="inline-block py-3 px-4 text-blue-600 font-semibold hover:bg-blue-50">
                   Khu vực tác giả
                 </Link>
               </li>
            )}
            
            {/* Bạn có thể thêm khu vực Admin tương tự */}
             {user?.role === 'ADMIN' && (
               <li>
                 <Link href="/admin" className="inline-block py-3 px-4 text-red-600 font-semibold hover:bg-red-50">
                   Quản trị viên
                 </Link>
               </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}