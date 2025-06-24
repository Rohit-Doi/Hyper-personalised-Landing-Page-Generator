import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  brand: string;
  discount?: number;
  isNew?: boolean;
  isTrending?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  imageUrl,
  brand,
  discount,
  isNew = false,
  isTrending = false,
}: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={400}
          className="h-full w-full object-cover object-center"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}
        {isNew && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}
        {isTrending && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            TRENDING
          </div>
        )}
        <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-200 flex items-center justify-center">
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors duration-200">
            Quick View
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link href={`/product/${id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {brand}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{name}</p>
          </div>
          <div className="flex-shrink-0 ml-2">
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-yellow-400" aria-hidden="true" />
              <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400 ml-1">({reviewCount})</span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center">
            <p className="text-base font-medium text-gray-900">₹{price.toLocaleString()}</p>
            {originalPrice && (
              <p className="ml-2 text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</p>
            )}
            {discount && (
              <p className="ml-2 text-sm font-medium text-green-600">{discount}% off</p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
export type { ProductCardProps };
