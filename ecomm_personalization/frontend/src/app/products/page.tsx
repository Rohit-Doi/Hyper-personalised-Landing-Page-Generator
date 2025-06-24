"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import ProductCard from "@/components/ProductCard";
import ProductRecommendations from '@/components/recommendations/ProductRecommendations';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
};

const featuredProducts = [
  {
    id: '1',
    name: 'Classic Leather Jacket',
    description: 'Timeless style for any occasion',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    category: 'Outerwear',
  },
  {
    id: '2',
    name: 'Summer Breeze Dress',
    description: 'Light and airy for warm days',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    category: 'Dresses',
  },
  {
    id: '3',
    name: 'Urban Explorer Backpack',
    description: 'Durable and versatile for city adventures',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    category: 'Bags',
  },
  {
    id: '4',
    name: 'Athletic Performance Shoes',
    description: 'Enhance your workout performance',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'Shoes',
  },
  {
    id: '5',
    name: 'Minimalist Wristwatch',
    description: 'Elegant and understated timekeeping',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Cozy Knit Sweater',
    description: 'Comfort and warmth for cooler evenings',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    category: 'Sweaters',
  },
];

const categories = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sale', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'Collection', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dresses', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
];

const filterChips = [
  'New Arrivals',
  'Best Sellers',
  'Trending Now',
  'Limited Edition',
  'Sustainable',
];

const getLocalImage = (folder: string, filename: string) => `/${folder}/${filename}`;

const menImages = [
  "men-regular-fit-striped-resortwear-shirt.webp",
  "IMG_7732.avif",
  "stylish-kurta-shawl-photoshoot-mens-ethnic-wear-photoshoot-traditional-dress-poses-for-man-mens-ethnic-wear-for-wedding-traditional-indian-mens-clothing-bringitonline_25.jpeg",
  "stylish-kurta-palama-with-coat-photoshoot-mens-ethnic-wear-photoshoot-traditional-dress-poses-for-man-mens-ethnic-wear-for-wedding-traditional-indian-mens-clothing-bringitonline_25.jpeg"
];
const womenImages = [
  "89974589.webp",
  "designers-wear-dress-photography-for-myntra.jpeg",
  "myntra-online-shopping-for-women-party-4.png",
  "6bee1566-ae33-4405-966b-5c45f637bb05.jpg"
];
const accessoriesImages = [
  "4b513d17-916f-4004-94ae-b92c0cfe9c88.jpg",
  "cdc0d04b-dea8-44cb-8d3b-76ef62be7e6a1668840596500-Nestasia-Quilted-Velvet-Lunch-Bag-6281668840596114-1.jpg"
];
const collectionsImages = [
  "2020-men-fashion.jpg",
  "Summer_mens_fashion.jpg.jpg"
];

const ProductsPage = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // Mock products data
  const products: Product[] = [
    {
      id: "1",
      name: "Sherwani Style 1",
      price: 79.99,
      image: getLocalImage("men", "565d6e38-6df1-479c-89cc-5ba6f9eb683f1669377676866Sherwani1.jpg"),
      category: "Men",
      isNew: true,
    },
    {
      id: "2",
      name: "Striped Resortwear Shirt",
      price: 29.99,
      image: getLocalImage("men", "men-regular-fit-striped-resortwear-shirt.webp"),
      category: "Men",
      isSale: true,
    },
    {
      id: "3",
      name: "Kurta Pullover",
      price: 34.99,
      image: getLocalImage("men", "199dfc78-6ba9-4830-83ae-855427d35f551729746979193-KVETOO-Striped-Turtle-Neck-Long-Sleeves-Acrylic-Pullover-Swe-1.jpg"),
      category: "Men",
    },
    {
      id: "4",
      name: "Indigo Printed Short Kurta",
      price: 39.99,
      image: getLocalImage("men", "402af633-1ed8-43a1-b9fd-60adb3488bf21684474558714-Men-Indigo-Printed-short-Kurta-6511684474558337-1.jpg"),
      category: "Men",
      isNew: true,
    },
    {
      id: "5",
      name: "Women's Designer Dress",
      price: 79.99,
      image: getLocalImage("women", womenImages[0]),
      category: "Women",
      isSale: true,
    },
    {
      id: "6",
      name: "Velvet Lunch Bag",
      price: 59.99,
      image: getLocalImage("accessories", accessoriesImages[0]),
      category: "Accessories",
    },
    {
      id: "7",
      name: "Women's Party Dress",
      price: 89.99,
      image: getLocalImage("women", womenImages[2]),
      category: "Women",
    },
    {
      id: "8",
      name: "Collection Polo",
      price: 69.99,
      image: getLocalImage("collections", collectionsImages[0]),
      category: "Collections",
      isSale: true,
    },
    {
      id: "9",
      name: "Accessories Gift Set",
      price: 79.99,
      image: getLocalImage("accessories", accessoriesImages[1]),
      category: "Accessories",
      isNew: true,
    },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (search.trim() === "" || product.name.toLowerCase().includes(search.toLowerCase()))
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "newest":
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Cart and Wishlist state
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product) => {
    setCart((prev: Product[]) => [...prev, product]);
  };
  const addToWishlist = (product: Product) => {
    setWishlist((prev: Product[]) => [...prev, product]);
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#fcf8f8] overflow-x-hidden" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Search Bar */}
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#994d51] flex border-none bg-[#f3e7e8] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search for products"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1b0e0e] focus:outline-0 focus:ring-0 border-none bg-[#f3e7e8] focus:border-none h-full placeholder:text-[#994d51] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </label>
            </div>
            {/* Filter Chips */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {filterChips.map((chip, i) => (
                <div key={i} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f3e7e8] pl-4 pr-4">
                  <p className="text-[#1b0e0e] text-sm font-medium leading-normal">{chip}</p>
                </div>
              ))}
            </div>
            {/* Featured Products */}
            <h2 className="text-[#1b0e0e] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured Products</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {featuredProducts.map((prod) => (
                <Link key={prod.id} href={`/products/${prod.id}`} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                    style={{ backgroundImage: `url('${prod.image}')` }}
                  ></div>
                  <div>
                    <p className="text-[#1b0e0e] text-base font-medium leading-normal">{prod.name}</p>
                    <p className="text-[#994d51] text-sm font-normal leading-normal">{prod.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <ProductRecommendations title="Recommended For You" maxItems={4} context={{ section: 'products' }} className="p-4" />
            {/* Shop by Category */}
            <h2 className="text-[#1b0e0e] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Shop by Category</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {categories.map((cat, i) => (
                <Link key={i} href={`/category/${cat.name.toLowerCase()}`} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  ></div>
                  <p className="text-[#1b0e0e] text-base font-medium leading-normal">{cat.name}</p>
                </Link>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex items-center justify-center p-4 gap-2">
              <button className="flex size-10 items-center justify-center">
                <div className="text-[#1b0e0e]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                  </svg>
                </div>
              </button>
              <button className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#1b0e0e] rounded-full bg-[#f3e7e8]">1</button>
              <button className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#1b0e0e] rounded-full">2</button>
              <button className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#1b0e0e] rounded-full">3</button>
              <button className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#1b0e0e] rounded-full">4</button>
              <button className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#1b0e0e] rounded-full">5</button>
              <button className="flex size-10 items-center justify-center">
                <div className="text-[#1b0e0e]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </button>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {sortedProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  ></div>
                  <div>
                    <p className="text-[#1b0e0e] text-base font-medium leading-normal">{product.name}</p>
                    <p className="text-[#994d51] text-sm font-normal leading-normal">${product.price.toFixed(2)}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => addToCart(product)} className="px-3 py-1 bg-[#e92932] text-white rounded-lg text-sm font-bold">Add to Bag</button>
                      <button onClick={() => addToWishlist(product)} className="px-3 py-1 bg-[#f3e7e8] text-[#e92932] rounded-lg text-sm font-bold">Wishlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
