export interface BaseProduct {
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
  category: string;
  inStock?: boolean;
  tags?: string[];
}

export const featuredProducts: BaseProduct[] = [
  {
    id: '1',
    name: 'Slim Fit Casual Shirt',
    price: 899,
    originalPrice: 1499,
    rating: 4.5,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'H&M',
    category: 'shirts',
    discount: 40,
    isNew: true,
    inStock: true,
    tags: ['casual', 'shirt', 'slim-fit']
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 1999,
    originalPrice: 2499,
    rating: 4.7,
    reviewCount: 289,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Levi\'s',
    category: 'pants',
    discount: 20,
    inStock: true,
    tags: ['jeans', 'denim', 'slim-fit']
  },
  // Add more featured products as needed
];

export const newArrivals: BaseProduct[] = [
  {
    id: '6',
    name: 'Casual Shirt',
    price: 1599,
    rating: 4.3,
    reviewCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80',
    brand: 'CasualWear',
    category: 'shirts',
    isNew: true,
    inStock: true,
    tags: ['casual', 'shirt']
  },
  {
    id: '7',
    name: 'Athletic Shorts',
    price: 1299,
    rating: 4.6,
    reviewCount: 134,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Nike',
    category: 'shorts',
    isNew: true,
    inStock: true,
    tags: ['athletic', 'shorts', 'sport']
  },
  // Add more new arrivals as needed
];
