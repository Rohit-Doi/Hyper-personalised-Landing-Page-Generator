"use client";
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ProductRecommendations from '@/components/recommendations/ProductRecommendations';

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: { name: string; value: string }[];
  description: string;
  details: { label: string; value: string }[];
  reviews: any[];
  related: any[];
};

const localProducts: Product[] = [
  // Men
  {
    id: '1',
    name: 'Sherwani Style 1',
    price: 79.99,
    images: ['/men/565d6e38-6df1-479c-89cc-5ba6f9eb683f1669377676866Sherwani1.jpg'],
    category: 'Men',
    rating: 4.5,
    reviewCount: 125,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [ { name: 'Cream', value: '#F5F5DC' } ],
    description: 'Elegant sherwani for festive occasions.',
    details: [ { label: 'Material', value: 'Silk Blend' } ],
    reviews: [],
    related: [],
  },
  {
    id: '2',
    name: 'Striped Resortwear Shirt',
    price: 29.99,
    images: ['/men/men-regular-fit-striped-resortwear-shirt.webp'],
    category: 'Men',
    rating: 4.2,
    reviewCount: 98,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [ { name: 'Blue', value: '#0000FF' } ],
    description: 'Casual striped shirt for men.',
    details: [ { label: 'Material', value: 'Cotton' } ],
    reviews: [],
    related: [],
  },
  // ...repeat for women, accessories, collections using the new data and images...
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const product = localProducts.find((p) => p.id === id) || localProducts[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);

  // Use image from query param if present, else from product.images[0]
  const imageFromQuery = searchParams?.get('image');
  const productImage = imageFromQuery || (product.images && product.images[0]) || '/placeholder-product.jpg';

  const addToCart = () => {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/cart');
  };
  const addToWishlist = () => {
    const storedWishlist = localStorage.getItem('wishlist');
    const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    router.push('/cart');
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#fcf8f8] overflow-x-hidden" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/" className="text-[#994d51] text-base font-medium leading-normal">Home</Link>
              <span className="text-[#994d51] text-base font-medium leading-normal">/</span>
              <Link href="/category/dresses" className="text-[#994d51] text-base font-medium leading-normal">Dresses</Link>
              <span className="text-[#994d51] text-base font-medium leading-normal">/</span>
              <span className="text-[#1b0e0e] text-base font-medium leading-normal">{product.name}</span>
            </div>
            {/* Product Gallery & Info */}
            <div className="flex w-full grow bg-[#fcf8f8] @container p-4">
              <div className="w-full flex justify-center">
                <img src={productImage} alt={product.name} className="rounded-lg max-h-[400px] object-contain" />
              </div>
            </div>
            {/* Product Name, Rating, Price */}
            <h1 className="text-[#1b0e0e] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">{product.name}</h1>
            <p className="text-[#994d51] text-sm font-normal leading-normal pb-3 pt-1 px-4">Item #{product.id.padStart(9, '0')}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
              <div className="flex flex-col gap-2">
                <p className="text-[#1b0e0e] text-4xl font-black leading-tight tracking-[-0.033em]">{product.rating}</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill={i < Math.round(product.rating) ? '#e92932' : '#d6aeb0'} viewBox="0 0 256 256">
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#1b0e0e] text-base font-normal leading-normal">{product.reviewCount} reviews</p>
              </div>
              {/* Size selection */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[#1b0e0e] text-lg font-bold leading-tight tracking-[-0.015em] pb-2">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <label key={size} className={`text-sm font-medium leading-normal flex items-center justify-center rounded-lg border px-4 h-11 text-[#1b0e0e] cursor-pointer ${selectedSize === size ? 'border-[3px] border-[#e92932] px-3.5' : 'border-[#e7d0d1]'}`}>
                      {size}
                      <input type="radio" className="invisible absolute" name="size" checked={selectedSize === size} onChange={() => setSelectedSize(size)} />
                    </label>
                  ))}
                </div>
              </div>
              {/* Color selection */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[#1b0e0e] text-lg font-bold leading-tight tracking-[-0.015em] pb-2">Color</h3>
                <div className="flex flex-wrap gap-5">
                  {product.colors.map((color) => (
                    <label key={color.value} className={`size-10 rounded-full border ring-[color-mix(in_srgb,#1b0e0e_50%,_transparent)] cursor-pointer ${selectedColor === color.value ? 'border-[3px] border-[#fcf8f8] ring' : 'border-[#e7d0d1]'}`} style={{ backgroundColor: color.value }}>
                      <input type="radio" className="invisible" name="color" checked={selectedColor === color.value} onChange={() => setSelectedColor(color.value)} />
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Add to Bag Button */}
            <div className="flex px-4 py-3 gap-4">
              <button onClick={addToCart} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#e92932] text-[#fcf8f8] text-base font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Add to Bag</span>
              </button>
              <button onClick={addToWishlist} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[#f3e7e8] text-[#e92932] text-base font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Wishlist</span>
              </button>
            </div>
            {/* Product Details */}
            <h3 className="text-[#1b0e0e] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Product Details</h3>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              {product.details.map((detail, i) => (
                <div key={i} className="col-span-2 grid grid-cols-subgrid border-t border-t-[#e7d0d1] py-5">
                  <p className="text-[#994d51] text-sm font-normal leading-normal">{detail.label}</p>
                  <p className="text-[#1b0e0e] text-sm font-normal leading-normal">{detail.value}</p>
                </div>
              ))}
            </div>
            {/* Customer Reviews */}
            <h3 className="text-[#1b0e0e] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Customer Reviews</h3>
            <div className="flex flex-col gap-8 overflow-x-hidden bg-[#fcf8f8] p-4">
              {product.reviews.map((review, i) => (
                <div key={i} className="flex flex-col gap-3 bg-[#fcf8f8]">
                  <div className="flex items-center gap-3">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url('${review.avatar}')` }}></div>
                    <div className="flex-1">
                      <p className="text-[#1b0e0e] text-base font-medium leading-normal">{review.name}</p>
                      <p className="text-[#994d51] text-sm font-normal leading-normal">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill={j < review.rating ? '#e92932' : '#d6aeb0'} viewBox="0 0 256 256">
                        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#1b0e0e] text-base font-normal leading-normal">{review.text}</p>
                  <div className="flex gap-9 text-[#994d51]">
                    <button className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" /></svg>
                      <p className="text-inherit">{review.likes}</p>
                    </button>
                    <button className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" /></svg>
                      <p className="text-inherit">{review.dislikes}</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Related Products */}
            <h3 className="text-[#1b0e0e] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Related Products</h3>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                {product.related.map((rel) => (
                  <Link key={rel.id} href={`/products/${rel.id}`} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg flex flex-col"
                      style={{ backgroundImage: `url('${rel.image}')` }}
                    ></div>
                    <div>
                      <p className="text-[#1b0e0e] text-base font-medium leading-normal">{rel.name}</p>
                      <p className="text-[#994d51] text-sm font-normal leading-normal">${rel.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <ProductRecommendations title="You May Also Like" maxItems={4} context={{ section: 'product_details', currentProductId: product.id }} className="p-4" />
          </div>
        </div>
      </div>
    </main>
  );
}
