import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';

// Cấu hình font Inter theo yêu cầu
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'NovelWeb - Web Novel Hàng Đầu',
  description: 'Đọc truyện online, truyện hay, cập nhật nhanh nhất.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      {/* Áp dụng font Inter và background màu xám nhạt */}
      <body className={`${inter.className} bg-gray-100 text-gray-800`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}