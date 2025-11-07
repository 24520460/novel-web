import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4">NovelWeb</h3>
            <p className="text-gray-600 text-sm">
              Nền tảng đọc truyện online hàng đầu. Cập nhật liên tục các bộ truyện mới và hot nhất.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/ranking" className="hover:text-blue-600">Bảng xếp hạng</Link></li>
              <li><Link href="/completed" className="hover:text-blue-600">Truyện đã hoàn thành</Link></li>
              <li><Link href="/search" className="hover:text-blue-600">Tìm kiếm nâng cao</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Điều khoản</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/terms" className="hover:text-blue-600">Điều khoản sử dụng</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Chính sách bảo mật</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Liên hệ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NovelWeb. All rights reserved.
        </div>
      </div>
    </footer>
  );
}