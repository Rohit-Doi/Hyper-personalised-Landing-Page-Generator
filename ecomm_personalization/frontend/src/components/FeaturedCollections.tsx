import ProductCard from './ProductCard';

const collections = [
  {
    id: '1',
    name: "Women's New Arrivals",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZZr5dD15Kprv2BhbbMawHFIQesy9mvge6wWIL3JrMB_pOvpY84nR-CuQs-IjjW5FsNOKw4urvYxW1D-RHFvKEGPAKta88em-685p1HT6WzuQ2GaB4-X_9OlKLLWsw03gKqOuwRxYf2lw8lr7N0d6EcU7xABQD9AfzJbXyMI_GAf2bFf8bbakYDXb9pYxsg3CHBAMC91RFts7YODiq-_Uy5Q4Ojt5wLbo0xtWb1ehEZpzQlJP-A9cvMWLFesC2vNTy3wS7-U3TfBmo',
    price: 0,
  },
  {
    id: '2',
    name: "Men's Best Sellers",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDopqqLtKyQgfHoiqP0grNTU98Jt8o2bNsQS_5lZ5HAZqZko7SUcFrtcrOXY9Bo1ez_YqyjkyXAd92YhUgbZd2ryM5j4dE-fLGGE9he8oS5fE9yuywAyzMqbpzy-V3X5J85cTBtsyj9yjB4NwW0tpxX2Bj0r-_ko_6JyEy9uIaVCJEwFGd54xK9MlcvPdLfHr6ZY_WqGWbpFyBqAVkr_fB6UlGB_tUJ7ankSpoMfL0x-ZFGDDe9V_wiEVaW8KHiNBitWBhccPSzKYKK',
    price: 0,
  },
  {
    id: '3',
    name: 'Trending Accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBnj142ITIhBkIXvXUUcHRErumkxdgHs6Qcn8aKOsPdqfIsPfNEm-8RYSOQL4-7apcKpi8mpAtF-2sJS4bxHC9gHdS87r5irh9ffbAusdXuKGZp_d75dcliUp2NIO0n40W0u2ASO8o_Wyd8Ogrb4e02vOcspmlmrmPffwhY1yEH8ZCQo6DREl4JR3cPP8_gnNId8u1rumh2CmMffieGNilasQIYXqiIDz2ZcqlKXigxyLenXGR8CBu2SNaX445YfFRKfFqh1HjI-Iv',
    price: 0,
  },
];

const FeaturedCollections = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-[#1b0e0e]">Featured Collections</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <div key={collection.id} className="group relative overflow-hidden rounded-lg">
              <div 
                className="aspect-video w-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 p-6 transition-opacity group-hover:bg-opacity-40">
                <div className="flex h-full flex-col justify-end">
                  <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                  <button className="mt-2 w-fit bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
