import Link from 'next/link';
import Image from 'next/image';

interface Category {
  name: string;
  image: string;
  href: string;
}

interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((category, index) => (
        <Link key={index} href={category.href}>
          <div className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="aspect-square bg-gray-100 relative">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 flex items-end p-4">
                <h3 className="text-white font-medium text-lg truncate">{category.name}</h3>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
