import StoryCard from "@/components/StoryCard";
import Link from 'next/link';

// Hàm fetch dữ liệu từ Backend API
async function getSectionData(sectionSlug: string) {
  const API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';
  try {
    // ISR: Cache kết quả trong 5 phút (300 giây)
    // const res = await fetch(`${API_URL}/reader/sections/${sectionSlug}`, {
    //   next: { revalidate: 300 } 
    // });
    // if (!res.ok) return [];
    // return res.json();

    // Dữ liệu mẫu (Mock data)
    return [
        { id: 1, slug: 'linh-vu-thien-ha', title: 'Linh Vũ Thiên Hạ', author: { displayName: 'Vũ Phong' }, cover_image_url: 'https://placehold.co/300x400/ef4444/ffffff?text=Truyện+Hay' },
        { id: 2, slug: 'dau-pha-thuong-khung', title: 'Đấu Phá Thương Khung', author: { displayName: 'Thiên Tằm' }, cover_image_url: 'https://placehold.co/300x400/3b82f6/ffffff?text=Truyện+Hay' },
        // ... thêm 4 truyện nữa
    ];

  } catch (error) {
    console.error(`Failed to fetch stories for section ${sectionSlug}:`, error);
    return [];
  }
}

// Component Section tái sử dụng
const Section = async ({ title, slug }: { title: string, slug: string }) => {
  const stories = await getSectionData(slug);
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Link href={`/list/${slug}`} className="text-sm font-medium text-blue-600 hover:underline">Xem thêm &rarr;</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {stories.length > 0 ? (
            stories.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))
        ) : (
            <p className="col-span-full text-gray-500">Đang cập nhật...</p>
        )}
      </div>
    </section>
  );
}

export default async function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Section title="Lựa chọn của Biên tập viên" slug="editors-choice" />
      <Section title="Lựa chọn tuần" slug="weekly-choice" />
      <Section title="Rank tháng" slug="monthly-rank" />
      <Section title="Bestseller" slug="bestseller" />
      <Section title="Sách mới" slug="new-books" />
      <Section title="Tuyệt phẩm đã hoàn thành" slug="completed" />
    </div>
  );
}