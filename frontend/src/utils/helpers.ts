// Format price in Indian Rupees
export const formatPrice = (price: number, currency = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscount = (original: number, current: number): number => {
  if (original <= 0) return 0;
  return Math.round(((original - current) / original) * 100);
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Calculate star rating display
export const getStarRating = (rating: number): { full: number; half: boolean; empty: number } => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
};

// Generate slug from string
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Get category label
export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    phone: 'Smartphones',
    laptop: 'Laptops',
  };
  return labels[category] || category;
};

// Get brand logo placeholder
export const getBrandLogo = (brand: string): string => {
  return `https://logo.clearbit.com/${brand.toLowerCase()}.com`;
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get battery life indicator
export const getBatteryIndicator = (capacity: number, category: string): string => {
  if (category === 'laptop') {
    if (capacity >= 70) return 'Excellent';
    if (capacity >= 60) return 'Very Good';
    if (capacity >= 50) return 'Good';
    return 'Average';
  } else {
    if (capacity >= 5000) return 'Excellent';
    if (capacity >= 4500) return 'Very Good';
    if (capacity >= 4000) return 'Good';
    return 'Average';
  }
};

// Get performance indicator
export const getPerformanceIndicator = (score: number): string => {
  if (score >= 90) return 'Outstanding';
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Very Good';
  if (score >= 60) return 'Good';
  return 'Average';
};

// Parse URL query parameters
export const parseQueryParams = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

// Build URL with query parameters
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  return searchParams.toString();
};

// Sort products by criteria
export const sortProducts = <T extends { price: { current: number }; ratings?: { overall: number } }>(
  products: T[],
  sortBy: string
): T[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price.current - b.price.current);
    case 'price-high':
      return sorted.sort((a, b) => b.price.current - a.price.current);
    case 'rating':
      return sorted.sort((a, b) => (b.ratings?.overall || 0) - (a.ratings?.overall || 0));
    case 'newest':
      return sorted.sort((a, b) => (b as any).createdAt - (a as any).createdAt);
    default:
      return sorted;
  }
};

// Color mapping for brand badges
export const getBrandColor = (brand: string): string => {
  const colors: Record<string, string> = {
    Apple: 'bg-gray-900 text-white',
    Samsung: 'bg-blue-600 text-white',
    OnePlus: 'bg-red-600 text-white',
    Xiaomi: 'bg-orange-500 text-white',
    Google: 'bg-green-500 text-white',
    Huawei: 'bg-red-700 text-white',
    OPPO: 'bg-green-600 text-white',
    Vivo: 'bg-blue-500 text-white',
    Realme: 'bg-yellow-500 text-black',
    ASUS: 'bg-purple-600 text-white',
    Dell: 'bg-blue-800 text-white',
    HP: 'bg-blue-700 text-white',
    Lenovo: 'bg-red-500 text-white',
    Acer: 'bg-red-800 text-white',
    MSI: 'bg-black text-white',
  };
  return colors[brand] || 'bg-gray-500 text-white';
};

// Responsive breakpoint helper
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = (): boolean => {
  return window.innerWidth >= 1024;
};

// Local storage helpers with error handling
export const localStorageGet = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const localStorageSet = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const localStorageRemove = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

