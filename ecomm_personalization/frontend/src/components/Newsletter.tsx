'use client';

import dynamic from 'next/dynamic';

const NewsletterForm = () => {
  return (
    <section className="bg-[#f8f8f8] py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-[#1b0e0e] md:text-3xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-8 text-gray-600">
            Get the latest updates on new products and upcoming sales
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-[#e92932] focus:outline-none focus:ring-2 focus:ring-[#e92932] focus:ring-opacity-50"
            />
            <button className="rounded-lg bg-[#e92932] px-6 py-3 font-medium text-white transition-colors hover:bg-[#c8232c] focus:outline-none focus:ring-2 focus:ring-[#e92932] focus:ring-opacity-50">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export default with no SSR to prevent hydration issues
const Newsletter = dynamic(() => Promise.resolve(NewsletterForm), {
  ssr: false,
});

export default Newsletter;
