import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

const defaultBreakpoints: BreakpointConfig = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useResponsive(customBreakpoints?: Partial<BreakpointConfig>) {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };
  
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      // Determine current breakpoint
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    };
    
    // Set initial values
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);
  
  // Helper functions to check breakpoints
  const isXs = windowSize.width < breakpoints.sm;
  const isSm = windowSize.width >= breakpoints.sm && windowSize.width < breakpoints.md;
  const isMd = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isLg = windowSize.width >= breakpoints.lg && windowSize.width < breakpoints.xl;
  const isXl = windowSize.width >= breakpoints.xl && windowSize.width < breakpoints['2xl'];
  const is2Xl = windowSize.width >= breakpoints['2xl'];
  
  const isSmDown = windowSize.width < breakpoints.md;
  const isMdDown = windowSize.width < breakpoints.lg;
  const isLgDown = windowSize.width < breakpoints.xl;
  const isXlDown = windowSize.width < breakpoints['2xl'];
  
  const isSmUp = windowSize.width >= breakpoints.sm;
  const isMdUp = windowSize.width >= breakpoints.md;
  const isLgUp = windowSize.width >= breakpoints.lg;
  const isXlUp = windowSize.width >= breakpoints.xl;
  const is2XlUp = windowSize.width >= breakpoints['2xl'];
  
  return {
    windowSize,
    breakpoints,
    currentBreakpoint,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isSmDown,
    isMdDown,
    isLgDown,
    isXlDown,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    is2XlUp,
  };
}
