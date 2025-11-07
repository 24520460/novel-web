import Image from 'next/image';
import Link from 'next/link';
import { Star, User, Book, List } from 'lucide-react';

// Mock data fetch (Thay thế bằng API call)
async function getStoryDetails(slug: string) {
    // fetch(API_URL/story/slug, { next: { revalidate: 3600 } }); // Cache 1h
    return {
        title: "Nàng Không Muốn Làm Hoàng Hậu",
        cover_image_url: 'https://placehold.co/300x400/3b82f6/ffffff?text=Bìa+Truyện',
        author: { name: "Thâm Bích Sắc" },
        status: "Full",
        rating: 7.0, ratingCount: 415,
        description: "Phụ mẫu Vân Kiều mất sớm, một mình nàng tự buôn bán nhỏ...",
        chapters: Array.from({ length: 50 }, (_, i) => ({ id: i + 1, title: `Chương ${i+1}: Tiêu đề chương...` }))
    }
}

export default async function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = await getStoryDetails(params.slug);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Thông tin truyện */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Ảnh bìa */}
          <div className="w-full md:w-48 relative h-72 flex-shrink-0">
            <Image src={story.cover_image_url} alt={story.title} fill style={{ objectFit: 'cover' }} className="rounded-lg shadow-md"/>
          </div>
          
          {/* Chi tiết */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{story.title}</h1>
            
            <div className="flex items-center mb-4 text-yellow-500">
                <Star className='w-5 h-5 fill-current'/>
                <span className="ml-2 text-gray-700"><strong>{story.rating}</strong>/10 ({story.ratingCount} lượt)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-600">
                <p className="flex items-center"><User className="w-4 h-4 mr-2 text-blue-500"/> Tác giả: <span className="ml-1 font-medium text-gray-800">{story.author.name}</span></p>
                <p className="flex items-center"><Book className="w-4 h-4 mr-2 text-blue-500"/> Trạng thái: <span className="ml-1 font-medium text-green-600">{story.status}</span></p>
            </div>

            <div className="flex gap-4 mt-6">
                <Link href={`/story/${params.slug}/chapter/1`} className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">Đọc từ đầu</Link>
                <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition">Lưu vào giá sách</button>
            </div>
          </div>
        </div>

        {/* Giới thiệu */}
        <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold mb-3 flex items-center"><Book className="w-6 h-6 mr-2"/> Giới thiệu truyện</h2>
            <p className="text-gray-600 leading-relaxed">{story.description}</p>
        </div>
      </div>

      {/* Danh sách chương */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 flex items-center"><List className="w-6 h-6 mr-2"/> Danh sách chương</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {story.chapters.map(chapter => (
                <Link key={chapter.id} href={`/story/${params.slug}/chapter/${chapter.id}`} className="text-gray-700 hover:text-blue-600 truncate border-b border-dashed pb-2">
                    {chapter.title}
                </Link>
            ))}
        </div>
        {/* Phân trang danh sách chương (nếu cần) */}
      </div>
    </div>
  );
}