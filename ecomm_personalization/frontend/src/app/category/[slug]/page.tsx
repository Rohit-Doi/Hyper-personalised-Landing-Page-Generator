'use client';

import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductRecommendations from '@/components/recommendations/ProductRecommendations';

const categoryImages: Record<string, string> = {
  Dresses: '/women/584e3bfb-0f4f-408f-89b1-4b5a04b710c51695970415815KALINIWomenBlueEthnicMotifsYokeDesignRegularKurtawithTrouser1.jpg',
  Shoes: '/men/565d6e38-6df1-479c-89cc-5ba6f9eb683f1669377676866Sherwani1.jpg',
  Accessories: '/accessories/4b513d17-916f-4004-94ae-b92c0cfe9c881702721174153Organisers1.jpg',
  Men: '/men/565d6e38-6df1-479c-89cc-5ba6f9eb683f1669377676866Sherwani1.jpg',
  Women: '/women/584e3bfb-0f4f-408f-89b1-4b5a04b710c51695970415815KALINIWomenBlueEthnicMotifsYokeDesignRegularKurtawithTrouser1.jpg',
  Sale: '/collections/2020-men-fashion.jpg',
  Collection: '/collections/2020-men-fashion.jpg',
  Default: '/collections/2020-men-fashion.jpg',
};

const getCategoryName = (slugParam: string | string[]): string => {
  if (typeof slugParam === 'string') {
    return slugParam.charAt(0).toUpperCase() + slugParam.slice(1);
  }
  if (Array.isArray(slugParam) && slugParam.length > 0) {
    const firstSlug = slugParam[0];
    return firstSlug.charAt(0).toUpperCase() + firstSlug.slice(1);
  }
  return 'Category';
};

// Define a Product type for clarity and type safety
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const menProducts: Product[] = [
  { id: '1', name: 'Sherwani Style 1', price: 79.99, image: '/men/565d6e38-6df1-479c-89cc-5ba6f9eb683f1669377676866Sherwani1.jpg' },
  { id: '2', name: 'Striped Resortwear Shirt', price: 29.99, image: '/men/men-regular-fit-striped-resortwear-shirt.webp' },
  { id: '3', name: 'Kurta Pullover', price: 34.99, image: '/men/199dfc78-6ba9-4830-83ae-855427d35f551729746979193-KVETOO-Striped-Turtle-Neck-Long-Sleeves-Acrylic-Pullover-Swe-1.jpg' },
  { id: '4', name: 'Indigo Printed Short Kurta', price: 39.99, image: '/men/402af633-1ed8-43a1-b9fd-60adb3488bf21684474558714-Men-Indigo-Printed-short-Kurta-6511684474558337-1.jpg' },
  { id: '5', name: 'Kurta Shawl Photoshoot', price: 44.99, image: '/men/stylish-kurta-shawl-photoshoot-mens-ethnic-wear-photoshoot-traditional-dress-poses-for-man-mens-ethnic-wear-for-wedding-traditional-indian-mens-clothing-bringitonline_25.jpeg' },
  { id: '6', name: 'Kurta Palama with Coat', price: 49.99, image: '/men/stylish-kurta-palama-with-coat-photoshoot-mens-ethnic-wear-photoshoot-traditional-dress-poses-for-man-mens-ethnic-wear-for-wedding-traditional-indian-mens-clothing-bringitonline_25.jpeg' },
  { id: '7', name: 'Slim Fit Opaque Striped Shirt', price: 54.99, image: '/men/75ad82fa-3f84-47ca-94bb-7f2e899cb6ab1709659883713HERENOWMenSlimFitOpaqueStripedCasualShirt1.jpg' },
  { id: '8', name: 'Formal Dress Cardigan', price: 59.99, image: '/men/myntra-online-shopping-for-mens_Formal_DressCardigan.jpg' },
];
const womenProducts: Product[] = [
  { id: '1', name: 'Blue Ethnic Motifs Kurta Set', price: 59.99, image: '/women/584e3bfb-0f4f-408f-89b1-4b5a04b710c51695970415815KALINIWomenBlueEthnicMotifsYokeDesignRegularKurtawithTrouser1.jpg' },
  { id: '2', name: 'Party Dress', price: 69.99, image: '/women/myntra-online-shopping-for-women-party-4.png' },
  { id: '3', name: 'Designer Wear Dress', price: 74.99, image: '/women/designers-wear-dress-photography-for-myntra.jpeg' },
  { id: '4', name: 'Pink Embroidered Maxi Dress', price: 64.99, image: '/women/6bee1566-ae33-4405-966b-5c45f637bb051649049087439-Sangria-Women-Pink-Embroidered-Net-A-Line-Maxi-Dress-4341649-1.jpg' },
  { id: '5', name: 'Floral Printed Dress', price: 54.99, image: '/women/bb058407-d64c-43dd-a8ae-ac6cba92c7641735308885503-OCTICS-Floral-Printed-Fit--Flare-Dress-1081735308884799-1.jpg' },
  { id: '6', name: "Women's Outfit March 2024", price: 79.99, image: '/women/181phceo_womens-outfit_625x300_06_March_24.webp' },
  { id: '7', name: 'Yellow Ethnic Motifs Kurta Set', price: 69.99, image: '/women/7e0b1821-d427-4799-a630-82fb816a51c71698223340513FIORRAWomenYellowEthnicMotifsPrintedRegularKurtawithPalazzos1.avif' },
  { id: '8', name: 'All About You Women Dress', price: 89.99, image: '/women/4e12b4b4-1bee-453e-8178-0cabe187c53e1718972514834-all-about-you-Women-Dresses-8061718972514315-1.jpg' },
];
const accessoriesProducts: Product[] = [
  { id: '1', name: 'Organisers Set', price: 19.99, image: '/accessories/4b513d17-916f-4004-94ae-b92c0cfe9c881702721174153Organisers1.jpg' },
  { id: '2', name: 'Quilted Velvet Lunch Bag', price: 24.99, image: '/accessories/cdc0d04b-dea8-44cb-8d3b-76ef62be7e6a1668840596500-Nestasia-Quilted-Velvet-Lunch-Bag-6281668840596114-1.jpg' },
  { id: '3', name: 'Protective Trolley Bag Cover', price: 29.99, image: '/accessories/32d88eab-4455-4ac3-8269-828b20448bb81718099082354-Cortina-Turquoise-Printed-Protective-Large-Trolley-Bag-Cover-1.jpg' },
  { id: '4', name: 'Saree Accessories', price: 14.99, image: '/accessories/d0edd3df-cf9d-4aa7-9829-497ef54f8fd21707823963409SareeAccessories4.jpg' },
  { id: '5', name: 'Accessory Gift Set', price: 34.99, image: '/accessories/4316ad76-2dda-4d8e-94a3-764929dec78b1716967777514AccessoryGiftSet1.jpg' },
  { id: '6', name: 'Gold Plated Mathapatti', price: 44.99, image: '/accessories/170d82d0-e87b-4980-a2cc-5df5b729f9bb1666000180739-Fida-Gold-Plated-White-Kundan-Studded--Pearl-Beaded-Mathapat-1.jpg' },
  { id: '7', name: 'Handheld Bag', price: 39.99, image: '/accessories/b23bde38-812f-44f5-9797-1e96c92a95031712815355985-ASTRID-Cream-Coloured--Black-Striped-Handheld-Bag-1871712815-1.jpg' },
  { id: '8', name: 'Hairband', price: 9.99, image: '/accessories/c765422e-a9b5-41c0-a22d-5512a3d129bd1720168439531VOGUEHAIRACCESSORIESWomenHairband1.jpg' },
];
const collectionsProducts: Product[] = [
  { id: '1', name: '2020 Men Fashion', price: 69.99, image: '/collections/2020-men-fashion.jpg' },
  { id: '2', name: "Summer Men's Fashion", price: 74.99, image: '/collections/Summer_mens_fashion.jpg.jpg' },
  { id: '3', name: 'Trends Polo', price: 59.99, image: '/collections/26012020_TRENDS_02_Polo.webp' },
  { id: '4', name: 'Featured Collection', price: 79.99, image: '/collections/Featured-image-69.webp' },
  { id: '5', name: 'Spring Fashion Trends', price: 89.99, image: '/collections/spring-fashion-trends-florals.jpg' },
  { id: '6', name: 'Housewives Collection', price: 99.99, image: '/collections/ss25comps_housewives.avif' },
  { id: '7', name: 'RTW Collection', price: 109.99, image: '/collections/holding-rtw.webp' },
  { id: '8', name: 'Collage Holding', price: 119.99, image: '/collections/Collage Holding (1).webp' },
];

const filterChips = [
  'Price',
  'Size',
  'Color',
  'Sort By',
];

export default function CategoryPage() {
  const params = useParams<{ slug: string | string[] }>();
  const slug = params?.slug || '';
  const categoryName = getCategoryName(slug);
  const heroImage = categoryImages[categoryName] || categoryImages.Default;

  let products: Product[] = [];
  if (slug === 'men') products = menProducts;
  else if (slug === 'women') products = womenProducts;
  else if (slug === 'accessories') products = accessoriesProducts;
  else if (slug === 'collections') products = collectionsProducts;
  else if (slug === 'sale') products = [
    ...menProducts.slice(0, 3),
    ...womenProducts.slice(0, 3),
    ...accessoriesProducts.slice(0, 2)
  ];
  else products = [];

  return (
    <main className="relative flex min-h-screen flex-col bg-[#fcf8f8] overflow-x-hidden" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      {/* Hero Section */}
      <div className="w-full h-64 bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: `url('${heroImage}')` }}>
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">{categoryName}</h1>
      </div>
      {/* Category Description */}
      <div className="container mx-auto px-4 py-6">
        <p className="text-lg text-[#994d51] text-center max-w-2xl mx-auto">Discover the latest in {categoryName.toLowerCase()} and elevate your style with our curated selection. Shop top trends, best sellers, and exclusive pieces for every occasion.</p>
      </div>
      {/* Filter Chips */}
      <div className="container mx-auto px-4 flex flex-wrap gap-3 justify-center pb-6">
        {filterChips.map((chip) => (
          <button key={chip} className="px-4 py-2 rounded-full border border-[#e7d0d1] bg-white text-[#1b0e0e] font-medium hover:bg-[#f3e7e8] transition-colors">{chip}</button>
        ))}
      </div>
      {/* Product Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <ProductCard
              key={`${categoryName}-${product.id}-${product.name}-${idx}`}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={categoryName}
              variant="category"
            />
          ))}
        </div>
      </div>
      <ProductRecommendations title="Recommended in this Category" maxItems={4} context={{ section: 'category', category: categoryName }} className="p-4" />
      {/* Pagination Controls */}
      <div className="container mx-auto px-4 pb-12 flex justify-center gap-2">
        <button className="px-4 py-2 rounded-lg border border-[#e7d0d1] bg-white text-[#1b0e0e] font-medium hover:bg-[#f3e7e8]">Previous</button>
        <button className="px-4 py-2 rounded-lg border border-[#e7d0d1] bg-white text-[#1b0e0e] font-medium hover:bg-[#f3e7e8]">1</button>
        <button className="px-4 py-2 rounded-lg border border-[#e7d0d1] bg-white text-[#1b0e0e] font-medium hover:bg-[#f3e7e8]">2</button>
        <button className="px-4 py-2 rounded-lg border border-[#e7d0d1] bg-white text-[#1b0e0e] font-medium hover:bg-[#f3e7e8]">3</button>
        <button className="px-4 py-2 rounded-lg border border-[#e7d0d1] bg-white text-[#1b0e0e] font-medium hover:bg-[#f3e7e8]">Next</button>
      </div>
    </main>
  );
}
