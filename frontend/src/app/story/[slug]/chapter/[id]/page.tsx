import Link from 'next/link';
import { ArrowLeft, ArrowRight, List } from 'lucide-react';

// Mock data fetch (Thay thế bằng API call)
async function getChapterContent(slug: string, id: string) {
    // Giả lập delay để test loading nếu cần
    // await new Promise(resolve => setTimeout(resolve, 500));
    
    const currentId = parseInt(id);
    return {
        storyTitle: "Nàng Không Muốn Làm Hoàng Hậu",
        storySlug: slug,
        chapterTitle: `Chương ${currentId}: Nàng không tin Yến Đình lại lừa nàng chuyện lớn đến vậy!`,
        // Nội dung mẫu dài hơn một chút để test scroll
        content: `<p>Mưa vào mùa hè thường kéo đến rất nhanh. Mới vừa rồi trời còn nắng chang chang, vậy mà chỉ chớp mắt mây đen đã kéo đến đen kịt cả một vùng trời.</p><br>
                  <p>Vân Kiều nhìn về bến tàu gần đó, lòng đầy lo lắng. Chuyến hàng này rất quan trọng với nàng, nếu bị mưa làm ướt thì coi như công sức cả tháng nay đổ sông đổ bể.</p><br>
                  <p>"Tiểu thư, chúng ta mau tìm chỗ trú mưa thôi!" - Nha hoàn Tiểu Thúy vội vàng che ô chạy tới.</p>
                  <p>Vân Kiều lắc đầu: "Không được, ta phải đợi thuyền cập bến đã."</p>`,
        prevId: currentId > 1 ? currentId - 1 : null,
        nextId: currentId + 1, // Bạn cần logic để kiểm tra xem có chương tiếp theo thật không
    }
}

export default async function ChapterPage({ params }: { params: { slug: string, id: string } }) {
  const chapter = await getChapterContent(params.slug, params.id);

  // Component điều hướng tái sử dụng
  const ChapterNavigation = () => (
      <div className="flex justify-center items-center gap-4 py-4">
          <Link
              href={chapter.prevId ? `/story/${chapter.storySlug}/chapter/${chapter.prevId}` : '#'}
              className={`px-4 py-2 rounded-full flex items-center transition ${chapter.prevId ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              aria-disabled={!chapter.prevId}
          >
              <ArrowLeft className="w-4 h-4 mr-2" /> Chương trước
          </Link>

          <Link href={`/story/${chapter.storySlug}`} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full flex items-center hover:bg-gray-300 transition" title="Mục lục">
              <List className="w-4 h-4" />
          </Link>

          <Link
              href={chapter.nextId ? `/story/${chapter.storySlug}/chapter/${chapter.nextId}` : '#'}
              className={`px-4 py-2 rounded-full flex items-center transition ${chapter.nextId ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              aria-disabled={!chapter.nextId}
          >
              Chương tiếp <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
      </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-[#f9f9f9] sm:bg-transparent"> {/* max-w-3xl cho dễ đọc hơn */}
      
      <div className="text-center mb-8">
        <Link href={`/story/${chapter.storySlug}`} className="text-xl md:text-2xl font-bold text-blue-600 hover:underline">
          {chapter.storyTitle}
        </Link>
        <h1 className="text-lg md:text-xl font-medium mt-3 text-gray-800">{chapter.chapterTitle}</h1>
      </div>

      {/* Navigation Controls (Top) */}
      <div className="mb-8 border-t border-b border-gray-200">
        <ChapterNavigation />
      </div>

      {/* Chapter Content */}
      <div className="chapter-content text-lg text-gray-900 leading-relaxed sm:px-6 sm:bg-white sm:shadow-sm sm:rounded-lg sm:py-8">
           <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </div>
           
      {/* Navigation Controls (Bottom) */}
       <div className="mt-8 border-t border-gray-200 pt-4">
         <ChapterNavigation />
       </div>

    </div>
  );
}