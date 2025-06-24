import ProductCard from './ProductCard';

const products = [
  {
    id: '1',
    name: 'Elegant Evening Dress',
    price: 129.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV8UghVyqfx6j2EDqpLRn1nrY954_d20yNrzVfCI8OT0U0IgeoGKc3ODC8VxKC24oGJaGoMFtz8bWEjdiZ41S0m62VcSGRqaLcx56C8AjKbV0mQlrpjOsuV0x5tia3K_jyc2ho-ctfGdQLmWEJ-w-M21QdG3Mlyh2j5H4EXvrGlLEOoiBaW93tH-1N_qMYVP61bDddc9xB4lVVY7CKghhpB5pSKBxFX8YSXviTA0sEE2_bMj9mj-BBzdVGAaw-5r4UCN3i6bpLLJ0y',
  },
  {
    id: '2',
    name: 'Casual Denim Jacket',
    price: 79.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOxXbIi6UQ_9EulKOZMpJxRySDiFPp99rJxpAhIV2DR-54ELKIf3L1AuDb2aJOxVA7k_6QlyGBmulj2DczIalt5ggPgTjZ5ePhrKbubADJejIB4b8DBYqVHU_JZv9PQhu8btOae3MgryRx-84Phfuj9xC5QqYqD1IdZ-x24D5IdbN6it0ChGjszleK6Abm3qZsZ2SCno_18yzaAUlwRRGClcm29Mhud3ldgiGlcvlmyOWxcrPlkK_pY74e7fddxXEyfPPJi0xA14s9',
  },
  {
    id: '3',
    name: 'Leather Handbag',
    price: 149.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASf8zPFYbAs0SJPBB19Qrvgt2kLXqw0nbfmPFR4jgDRyzsWR4YieHW0cbNF0SqJLbDajyqwEtpeTVVLYYP4BMxVzEBLZ8veV4kJjBTRmCtgpnhRw8TWojAZoqXf1eFMRe5stdAMVun7XaRJ0m9Z8uS7pyQjsHHRZhSV6VkXStGGXsJLoWtuov7uDhSanZEquAR2EcyxOBKXYCxnMTQwxDdjp0TExUlgahq85rSqP1NP6RUpe1KIpnCL0IH8IoMeyACPnBhI-W1a-C9',
  },
  {
    id: '4',
    name: 'Stylish Sunglasses',
    price: 59.99,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP82a-o_F0NwFhkB5M4K7qnrl-LXLbYcxyBFqwio0xcOtEQu9xj45z2g5VLewHyQfHaop9YWRhXv1fV2b40qSHPoYg8mQTLghlLuGbae9hYtfE_ZWgnYVPIFSDpRFfF8ZcU5GmnJJXWeA8yb7GLAqwXDfcs9BglWJYi_qQdORKffIqxogHuLEBnbJ16biYIsyfnFICItR_lCk5r6q9CdwHnCukOY_aEVKu9rRTNLDHcBY8vND40MSQcR84-tN6zjreZ7OLsI7WwyKk',
  },
];

const RecommendedProducts = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-[#1b0e0e]">Recommended For You</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
