import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

interface CarouselArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export const CarouselArrow = ({ direction, onClick }: CarouselArrowProps) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 ${direction === 'left' ? 'left-2' : 'right-2'} z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white/100`}
    aria-label={`${direction} arrow`}
  >
    {direction === 'left' ? (
      <FiChevronLeft className="h-6 w-6 text-gray-800" />
    ) : (
      <FiChevronRight className="h-6 w-6 text-gray-800" />
    )}
  </button>
);
