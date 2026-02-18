// Product Types
export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: 'phone' | 'laptop';
  model: string;
  price: Price;
  specifications: Specifications;
  ratings: Ratings;
  images: string[];
  availability: Availability;
  pros?: string[];
  cons?: string[];
  tags: string[];
  slug: string;
}

export interface Price {
  current: number;
  original: number;
  currency: string;
  lastUpdated: string;
}

export interface Specifications {
  display?: Display;
  processor?: Processor;
  memory?: Memory;
  battery?: Battery;
  camera?: Camera;
  connectivity?: Connectivity;
  build?: Build;
  os?: string;
  features?: string[];
}

export interface Display {
  size: number;
  resolution: string;
  type: string;
  refreshRate?: number;
  brightness?: string;
}

export interface Processor {
  chipset: string;
  cores: number;
  speed: string;
  gpu?: string;
}

export interface Memory {
  ram: number;
  storage: number;
  storageType?: string;
  expandable?: number;
}

export interface Battery {
  capacity: number;
  charging: string;
  fastCharging?: number;
  wirelessCharging?: boolean;
}

export interface Camera {
  rear?: {
    main: number;
    ultraWide?: number;
    telephoto?: number;
    macro?: number;
  };
  front: number;
}

export interface Connectivity {
  '5g'?: boolean;
  '4g'?: boolean;
  wifi?: string;
  bluetooth?: string;
  usb?: string;
  nfc?: boolean;
}

export interface Build {
  material: string;
  weight: number;
  dimensions: {
    height: number;
    width: number;
    thickness: number;
  };
}

export interface Ratings {
  overall: number;
  performance: number;
  battery: number;
  display: number;
  camera: number;
  value: number;
  count: number;
}

export interface Availability {
  inStock: boolean;
  flipkart?: {
    available: boolean;
    url?: string;
    price?: number;
  };
  amazon?: {
    available: boolean;
    url?: string;
    price?: number;
  };
  official?: {
    available: boolean;
    url?: string;
  };
}

// User Types
export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  wishlist: Wishlist;
  comparisonList: string[];
}

export interface UserPreferences {
  phone?: PhonePreferences;
  laptop?: LaptopPreferences;
}

export interface PhonePreferences {
  primaryUse: string[];
  budget: { min: number; max: number };
  brandPreferences: string[];
  priority: {
    battery: number;
    performance: number;
    camera: number;
    display: number;
    brand: number;
    design: number;
  };
  features: string[];
}

export interface LaptopPreferences {
  primaryUse: string[];
  budget: { min: number; max: number };
  brandPreferences: string[];
  priority: {
    performance: number;
    battery: number;
    display: number;
    portability: number;
    brand: number;
  };
  specifications: {
    minRam: number;
    minStorage: number;
    processorPreference: string;
    gpuPreference: string;
  };
}

export interface Wishlist {
  products: Product[];
  alerts: PriceAlert[];
}

export interface PriceAlert {
  productId: string;
  targetPrice: number;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  pagination?: Pagination;
  filters?: Filters;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface Filters {
  brands: string[];
  priceRange: { min: number; max: number };
  ramOptions: number[];
  batteryOptions: number[];
}

// Recommendation Types
export interface RecommendationRequest {
  category: 'phone' | 'laptop';
  budget: { min: number; max: number };
  brandPreferences?: string[];
  priority: {
    battery?: number;
    performance?: number;
    camera?: number;
    display?: number;
    portability?: number;
    brand?: number;
  };
  primaryUse?: string[];
  features?: string[];
}

export interface RecommendationScore {
  product: Product;
  score: number;
  matchedCriteria: string[];
}

