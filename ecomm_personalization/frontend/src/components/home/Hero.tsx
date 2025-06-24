'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Prevent SSR for this component to avoid hydration issues
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: 'Summer Collection 2024',
      subtitle: 'Up to 50% off on selected items',
      cta: 'Shop Now',
      // Using placeholder images from a reliable source
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Discover the latest trends',
      cta: 'Explore',
      image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    },
    {
      id: 3,
      title: 'Flash Sale',
      subtitle: 'Limited time offers',
      cta: 'Grab the Deal',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative h-[500px]">
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
                onError={(e) => {
                  // Fallback to a solid color if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221920%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201920%20500%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18c9b2c2a1f%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A25pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18c9b2c2a1f%22%3E%3Crect%20width%3D%221920%22%20height%3D%22500%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22910%22%20y%3D%22260%22%3E' + encodeURIComponent(slide.title) + '%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black/30 flex items-center">
              <div className="container mx-auto px-4 text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-6">{slide.subtitle}</p>
                <button 
                  className="bg-pink-600 text-white px-8 py-3 rounded-md hover:bg-pink-700 transition-colors"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Export default with no SSR to prevent hydration issues
export default dynamic(() => Promise.resolve(HeroCarousel), {
  ssr: false,
});
