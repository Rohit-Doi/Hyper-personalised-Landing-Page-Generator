import React from 'react';
import Link from 'next/link';

interface BannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const Banner = ({ title, subtitle, ctaText, ctaLink }: BannerProps) => {
  return (
    <div className="bg-pink-600 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-lg mb-6">{subtitle}</p>
        <Link href={ctaLink}>
          <a className="bg-white text-pink-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300">
            {ctaText}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Banner; 