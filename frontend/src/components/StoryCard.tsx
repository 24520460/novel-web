import Link from 'next/link';
import Image from 'next/image';

// Định nghĩa kiểu dữ liệu cho props
interface StoryProps {
    story: {
        slug: string;
        title: string;
        cover_image_url: string;
        author: {
            displayName: string;
        };
    };
}

const StoryCard = ({ story }: StoryProps) => {
    return (
        <div className="group">
            <Link href={`/story/${story.slug}`}>
                <div className="relative w-full pb-[133%] overflow-hidden rounded-md shadow-sm group-hover:shadow-md transition">
                    {/* Sử dụng Next.js Image cho tối ưu hóa */}
                    <Image
                        src={story.cover_image_url}
                        alt={story.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                    />
                </div>
            </Link>
            <div className="mt-2">
                <Link href={`/story/${story.slug}`} className="block text-sm font-medium text-gray-900 truncate hover:text-blue-600 transition" title={story.title}>
                    {story.title}
                </Link>
                <p className="text-xs text-gray-500 truncate">{story.author.displayName}</p>
            </div>
        </div>
    );
};

export default StoryCard;