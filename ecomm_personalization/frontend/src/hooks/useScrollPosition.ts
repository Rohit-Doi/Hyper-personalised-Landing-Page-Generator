import { useState, useEffect } from 'react';

/**
 * useScrollPosition hook
 * Returns the current scroll position (x and y) of the window.
 * The hook updates on `scroll` and `resize` events.
 *
 * Example
 * ```tsx
 * const { x, y, direction } = useScrollPosition();
 * ```
 */
export interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
}

export function useScrollPosition(): ScrollPosition {
  const [scroll, setScroll] = useState<ScrollPosition>({ x: 0, y: 0, direction: null });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScroll({
        x: window.scrollX,
        y: currentY,
        direction: currentY > lastY ? 'down' : currentY < lastY ? 'up' : scroll.direction,
      });
      lastY = currentY;
    };

    // Initialize
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return scroll;
}
