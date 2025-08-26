/**
 * Utility functions for mobile device detection and keyboard handling
 */

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for touch support
  const hasTouch = 'ontouchstart' in window;
  
  // Check for mobile user agent
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  // Check for mobile viewport
  const isMobileViewport = window.innerWidth <= 768;
  
  return hasTouch && (isMobileUA || isMobileViewport);
};

export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android/.test(navigator.userAgent);
};

export const hasVirtualKeyboardSupport = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return 'virtualKeyboard' in navigator;
};

export const hideKeyboardIOS = (): void => {
  if (typeof document === 'undefined') return;
  
  // iOS-specific keyboard hiding technique
  const activeElement = document.activeElement as HTMLElement;
  if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
    activeElement.blur();
    
    // Force scroll to top to help hide keyboard on iOS
    if (window.scrollTo) {
      window.scrollTo(0, 0);
    }
  }
};

export const hideKeyboardAndroid = (): void => {
  if (typeof document === 'undefined') return;
  
  console.log('🤖 Hiding Android keyboard...'); // Debug log
  
  // Android-specific keyboard hiding technique
  const activeElement = document.activeElement as HTMLElement;
  if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
    console.log('🤖 Blurring Android input element:', activeElement.tagName);
    activeElement.blur();
    
    // Use Virtual Keyboard API if available
    if (hasVirtualKeyboardSupport()) {
      (navigator as any).virtualKeyboard?.hide();
    }
  } else {
    console.log('🤖 No active input element found');
  }
};

export const hideKeyboardGeneric = (): void => {
  if (typeof document === 'undefined') return;
  
  console.log('🌐 Hiding generic keyboard...'); // Debug log
  
  const activeElement = document.activeElement as HTMLElement;
  if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
    console.log('🌐 Blurring generic input element:', activeElement.tagName);
    activeElement.blur();
    
    // Try Virtual Keyboard API
    if (hasVirtualKeyboardSupport()) {
      (navigator as any).virtualKeyboard?.hide();
    }
    
    // Trigger resize event to help with viewport adjustments
    window.dispatchEvent(new Event('resize'));
  } else {
    console.log('🌐 No active input element found');
  }
};
