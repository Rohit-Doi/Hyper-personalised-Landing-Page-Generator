import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  variant?: 'light' | 'dark';
  position?: 'left' | 'center' | 'right';
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageUrl,
  variant = 'light',
  position = 'left',
}) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-900';
  const buttonVariant = variant === 'dark' ? 'bg-white text-gray-900' : 'bg-pink-600 text-white';
  
  const positionClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`relative h-96 overflow-hidden rounded-xl ${variant === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} relative`}>
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className={`relative h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 ${positionClasses[position]}`}>
        <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${textColor}`}>
          {title}
        </h2>
        <p className={`mt-4 max-w-xl text-lg ${variant === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
          {subtitle}
        </p>
        <div className="mt-8">
          <Link
            href={ctaLink}
            className={`inline-flex items-center rounded-md px-6 py-3 text-base font-medium ${buttonVariant} shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200`}
          >
            {ctaText}
            <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
