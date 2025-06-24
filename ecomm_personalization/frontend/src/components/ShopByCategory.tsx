'use client';

import dynamic from 'next/dynamic';
import ProductCard from './ProductCard';

const categories = [
  {
    id: '1',
    name: 'Dresses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfmBas3M3V_c2UOTb53zJVdew2KAQJ1qSADAhaVLpvPX5tSiLDlP6mxiZoIY5Z078xI-95qjJmybcjxR4sblIT7EspMJxJlT_GvS_scPj3GOlCk70eK-zygKKNQkoKCvw4CZSNiPLCjYVAiHtycV-Ut7gRjB29gpb5R6yWkuv5BQdhwjhNY6EeO1YUXgWRi6nxNRc8WamVAmT1tAQOpGvOCCK7rmHNjwVb6ME6wewZIXOjbef1vx5HAdTQcShuQNpnQ7DfstmwEfYK',
  },
  {
    id: '2',
    name: 'Tops',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQwYCXXueMe8cXjvjthTfWQX8RJpJGYJDHrOagc3Nhipx9nboy3b3CD-Lo8kVJSMG2P66cefr4GCFGUNhKPcfYCatqiWmcQ3T0Hj2Z5VkFQtOHD0WKglUQWns4b_2OtoaUzeeHBlGynu6F2zCSRC7kjpcs6SSjegSFCPoaGUs1DCayK7migt-eDv3LwlacedHkMUFylp2yD9yCDU3DzHtyGUfbE_E3TJNOCQTxmRfm3xORcaQGjdjgbJxBAz5GMj0STYo8LPCecVJG',
  },
  {
    id: '3',
    name: 'Bottoms',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkj_FJDkfi_GAhK-_rHCjeI0MQhCdaOz1zezhDxmrOU8TStyvbhJwC_AibXUuxXug0RbNgCMdxmr21rMUAZ0pl6NRe1T253V-KBqi84a_miCLQlhGi2VPMEZamXLchWP-kgvpRofff9AST7O2nFH-vquB5EBuOJA6Rdv_gOiP_bHK7x39ghIQX3OMwxbMXBstw7hqIUkT2lcj3TTberZuIPvxKQvoJ84a3rECyBKUWmCVgsoA7ViSe4V6kP7MUsWg72xuAc7GiQn1q',
  },
  {
    id: '4',
    name: 'Shoes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPClJo-2g5b6H6VDTiMu-_7vwcKp0vdQS5dvFm_FxuMzM7rdG-XWCVEBOtHPPCrbeT2c2w0bbQAHt5IiV2yYuBC9vtOMZ-JI07rBU4xyxPRY0VjsGcJewVySHUpK-GplNTuyWnTwTyJolhqc8OJSMHLO17f7eUYZrMv-CYB65GDlcs2ORQNHYO_zuMEZuiXvHeDZrytbvgcM5PAblIrPLBgE5YKhYIOhN3TXqY08_xrFLM7v6tpSdQdxuMix2YWvjtKSfpVXQ87YOa',
  },
  {
    id: '5',
    name: 'Accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdmashQxT3AugjzHiinc8eSorBtbaaAtZWJoZ00AQk763I0yaz4GMPza7nIzh0aDofrULOimx4yOYiMeVyvNjmF9tmg7QgDTGwd45o_XJIQTH5ze3JTGIrVwUaI7MjbGrQgN33YqA7uwmqHWmYSxeHJ_PJd_XDxLCwUdPQRU6sPBx_o1q85Z2t4LA6OVw_NhuXq9AREyHPNplyV36KmHdaWZVqoO3aHBnS0Xi2AGVcRWquezVJjR7dy_DGqoRWT5OsyFoZPh8zl51b',
  },
];

// Prevent SSR for this component to avoid hydration issues
const ShopByCategoryComponent = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-[#1b0e0e]">Shop By Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category) => (
            <ProductCard 
              key={category.id} 
              {...category} 
              variant="category"
              price={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Export default with no SSR to prevent hydration issues
const ShopByCategory = dynamic(() => Promise.resolve(ShopByCategoryComponent), {
  ssr: false,
});

export default ShopByCategory;
