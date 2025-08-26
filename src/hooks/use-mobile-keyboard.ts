import { useEffect, useRef, useCallback } from 'react';
import { 
  isMobileDevice, 
  isIOS, 
  isAndroid, 
  hideKeyboardIOS, 
  hideKeyboardAndroid, 
  hideKeyboardGeneric 
} from '@/lib/utils/mobile-detection';

export const useMobileKeyboard = () => {
  console.log('🔧 useMobileKeyboard hook initialized'); // Debug log
  
  // Check mobile detection status
  if (typeof window !== 'undefined') {
    console.log('📱 Mobile detection check:', {
      hasTouch: 'ontouchstart' in window,
      userAgent: navigator.userAgent,
      viewportWidth: window.innerWidth,
      isMobileDevice: isMobileDevice()
    });
  }
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const touchStartYRef = useRef<number>(0);

  const hideKeyboard = useCallback(() => {
    console.log('🔄 Hiding mobile keyboard...'); // Debug log
    
    // Only proceed if we're on a mobile device
    if (!isMobileDevice()) {
      console.log('❌ Not on mobile device - skipping keyboard hide'); // Debug log
      return;
    }
    
    console.log('📱 Mobile device detected - proceeding with keyboard hide'); // Debug log
    
    // Use platform-specific keyboard hiding techniques
    if (isIOS()) {
      console.log('🍎 Hiding iOS keyboard...'); // Debug log
      hideKeyboardIOS();
    } else if (isAndroid()) {
      console.log('🤖 Hiding Android keyboard...'); // Debug log
      hideKeyboardAndroid();
    } else {
      console.log('🌐 Hiding generic mobile keyboard...'); // Debug log
      hideKeyboardGeneric();
    }
  }, []);

  const handleScroll = useCallback(() => {
    console.log('📜 Scroll event detected'); // Debug log
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      console.log('🎯 Triggering keyboard hide on scroll'); // Debug log
      hideKeyboard();
    }

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set a timeout to reset the scrolling flag
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, [hideKeyboard]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    console.log('👆 Touch start event detected'); // Debug log
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartYRef.current) return;
    
    const touchCurrentY = e.touches[0].clientY;
    const touchDiff = Math.abs(touchCurrentY - touchStartYRef.current);
    
    // If the touch movement is significant (more than 10px), hide keyboard
    if (touchDiff > 10) {
      console.log('👆 Touch move event detected - hiding keyboard'); // Debug log
      hideKeyboard();
    }
  }, [hideKeyboard]);

  const handleTouchEnd = useCallback(() => {
    console.log('👆 Touch end event detected'); // Debug log
    touchStartYRef.current = 0;
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    if (scrollContainer) {
      // Add scroll event listener
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      
      // Add touch event listeners for better mobile detection
      scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
      scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchmove', handleTouchMove);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Remove the problematic useEffect and replace with a callback ref approach
  const setScrollContainerRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      console.log('🔗 Ref callback - attaching event listeners to:', element); // Debug log
      
      // Add scroll event listener
      element.addEventListener('scroll', handleScroll, { passive: true });
      console.log('✅ Scroll event listener attached (callback ref)'); // Debug log
      
      // Add touch event listeners for better mobile detection
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: true });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
      console.log('✅ Touch event listeners attached (callback ref)'); // Debug log
      
      // Store the element for cleanup
      scrollContainerRef.current = element;
    } else {
      // Cleanup when ref is null
      if (scrollContainerRef.current) {
        console.log('🔗 Ref callback - removing event listeners'); // Debug log
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
        scrollContainerRef.current.removeEventListener('touchstart', handleTouchStart);
        scrollContainerRef.current.removeEventListener('touchmove', handleTouchMove);
        scrollContainerRef.current.removeEventListener('touchend', handleTouchEnd);
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollContainerRef.current = null;
      }
    }
  }, [handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Also add global scroll listener for cases where the container might not be directly scrollable
  useEffect(() => {
    const handleGlobalScroll = () => {
      // Only hide keyboard if we're not in a search context
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        const searchContainer = activeElement.closest('[data-search-container]');
        if (!searchContainer) {
          hideKeyboard();
        }
      }
    };

    window.addEventListener('scroll', handleGlobalScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleGlobalScroll);
    };
  }, [hideKeyboard]);

  console.log('🔧 useMobileKeyboard hook returning scrollContainerRef'); // Debug log
  return { scrollContainerRef, setScrollContainerRef };
};
