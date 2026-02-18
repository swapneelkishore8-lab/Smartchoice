import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/Products/ProductCard';
import { Product } from '../types';

const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  
  // Mock products for demo
  const products: Product[] = [
    {
      _id: '1',
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      category: 'phone',
      model: 'iPhone 15 Pro Max',
      price: { current: 119900, original: 119900, currency: 'INR', lastUpdated: new Date().toISOString() },
      specifications: {
        display: { size: 6.7, resolution: '2796 x 1290', type: 'Super Retina XDR OLED', refreshRate: 120, brightness: '2000 nits' },
        processor: { chipset: 'Apple A17 Pro', cores: 6, speed: '3.78 GHz', gpu: '6-core GPU' },
        memory: { ram: 8, storage: 256, storageType: 'NVMe' },
        battery: { capacity: 4422, charging: 'USB-C', fastCharging: 30, wirelessCharging: true },
        camera: { rear: { main: 48, ultraWide: 12, telephoto: 12 }, front: 12 },
        connectivity: { '5g': true, wifi: 'Wi-Fi 6E', bluetooth: '5.3', usb: 'USB-C 3.0', nfc: true },
        build: { material: 'Titanium', weight: 221, dimensions: { height: 159.9, width: 76.7, thickness: 8.25 } },
        os: 'iOS 17',
        features: ['Dynamic Island', 'ProMotion', 'Always-On Display']
      },
      ratings: { overall: 4.8, performance: 4.9, battery: 4.5, display: 4.9, camera: 4.8, value: 4.3, count: 2456 },
      images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'],
      availability: { inStock: true, amazon: { available: true, url: 'https://amazon.in' } },
      pros: ['Excellent camera system', 'Titanium build', 'Powerful processor'],
      cons: ['Expensive', 'Heavy'],
      tags: ['premium', 'flagship', 'camera', 'ios'],
      slug: 'iphone-15-pro-max'
    },
    {
      _id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      category: 'phone',
      model: 'Galaxy S24 Ultra',
      price: { current: 99999, original: 109999, currency: 'INR', lastUpdated: new Date().toISOString() },
      specifications: {
        display: { size: 6.8, resolution: '3088 x 1440', type: 'Dynamic AMOLED 2X', refreshRate: 120, brightness: '2600 nits' },
        processor: { chipset: 'Snapdragon 8 Gen 3', cores: 8, speed: '3.4 GHz', gpu: 'Adreno 750' },
        memory: { ram: 12, storage: 256, storageType: 'UFS 4.0' },
        battery: { capacity: 5000, charging: 'USB-C', fastCharging: 45, wirelessCharging: true },
        camera: { rear: { main: 200, ultraWide: 12, telephoto: 50 }, front: 12 },
        connectivity: { '5g': true, wifi: 'Wi-Fi 7', bluetooth: '5.3', usb: 'USB-C 3.2', nfc: true },
        build: { material: 'Titanium', weight: 232, dimensions: { height: 162.3, width: 79, thickness: 8.6 } },
        os: 'Android 14',
        features: ['S Pen', 'Galaxy AI', 'Circle to Search']
      },
      ratings: { overall: 4.7, performance: 4.8, battery: 4.6, display: 4.9, camera: 4.7, value: 4.4, count: 1876 },
      images: ['https://images.unsplash.com/photo-1610945265078-3858a0054825?w=400'],
      availability: { inStock: true, flipkart: { available: true, url: 'https://flipkart.com' }, amazon: { available: true, url: 'https://amazon.in' } },
      pros: ['Amazing 200MP camera', 'S Pen included', 'Excellent display'],
      cons: ['Expensive', 'Large size'],
      tags: ['premium', 'flagship', 'android', 'camera', 'spen'],
      slug: 'samsung-galaxy-s24-ultra'
    },
    {
      _id: '3',
      name: 'OnePlus 12',
      brand: 'OnePlus',
      category: 'phone',
      model: 'OnePlus 12',
      price: { current: 64999, original: 69999, currency: 'INR', lastUpdated: new Date().toISOString() },
      specifications: {
        display: { size: 6.82, resolution: '3168 x 1440', type: 'ProXDR BOE OLED', refreshRate: 120, brightness: '4500 nits' },
        processor: { chipset: 'Snapdragon 8 Gen 3', cores: 8, speed: '3.3 GHz', gpu: 'Adreno 750' },
        memory: { ram: 12, storage: 256, storageType: 'UFS 4.0' },
        battery: { capacity: 5400, charging: 'USB-C', fastCharging: 100, wirelessCharging: true },
        camera: { rear: { main: 50, ultraWide: 48, telephoto: 64 }, front: 32 },
        connectivity: { '5g': true, wifi: 'Wi-Fi 7', bluetooth: '5.4', usb: 'USB-C 3.2', nfc: true },
        build: { material: 'Aluminum', weight: 220, dimensions: { height: 164.3, width: 75.8, thickness: 9.15 } },
        os: 'OxygenOS 14',
        features: ['100W charging', 'Hasselblad Camera', 'IR Blaster']
      },
      ratings: { overall: 4.6, performance: 4.8, battery: 4.7, display: 4.7, camera: 4.4, value: 4.6, count: 987 },
      images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400'],
      availability: { inStock: true, amazon: { available: true, url: 'https://amazon.in' } },
      pros: ['Blazing fast charging', 'Powerful performance', 'Great display'],
      cons: ['Camera could be better', 'No official IP rating'],
      tags: ['flagship', 'performance', 'charging', 'android'],
      slug: 'oneplus-12'
    },
    {
      _id: '4',
      name: 'MacBook Pro 14" M3 Max',
      brand: 'Apple',
      category: 'laptop',
      model: 'MacBook Pro 14" M3 Max',
      price: { current: 199900, original: 199900, currency: 'INR', lastUpdated: new Date().toISOString() },
      specifications: {
        display: { size: 14.2, resolution: '3024 x 1964', type: 'Liquid Retina XDR', refreshRate: 120 },
        processor: { chipset: 'Apple M3 Max', cores: 14, speed: '4.05 GHz' },
        memory: { ram: 36, storage: 1024, storageType: 'SSD' },
        battery: { capacity: 70, charging: 'MagSafe 3', fastCharging: 96 },
        connectivity: { wifi: 'Wi-Fi 6E', bluetooth: '5.3', usb: 'Thunderbolt 5' },
        build: { material: 'Aluminum', weight: 1.55, dimensions: { height: 1.55, width: 31.26, thickness: 22.12 } },
        os: 'macOS Sonoma',
        features: ['ProMotion', 'Studio Quality Mics', 'Spatial Audio']
      },
      ratings: { overall: 4.9, performance: 4.9, battery: 4.8, display: 4.9, camera: 4.7, value: 4.5, count: 567 },
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
      availability: { inStock: true, amazon: { available: true, url: 'https://amazon.in' } },
      pros: ['Incredible performance', 'Stunning display', 'Amazing battery life'],
      cons: ['Very expensive', 'Limited ports'],
      tags: ['premium', 'professional', 'macos', 'creative'],
      slug: 'macbook-pro-14-m3-max'
    }
  ];

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const brands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Google', 'Dell', 'HP', 'Lenovo', 'ASUS'];
  const priceRanges = [
    { label: 'Under ₹10,000', min: 0, max: 10000 },
    { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
    { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
    { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
    { label: 'Above ₹1,00,000', min: 100000, max: 1000000 },
  ];

  const filteredProducts = products.filter(p => 
    (category === 'all' || p.category === category) &&
    (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">
                {category === 'all' ? 'All Products' : category === 'phone' ? 'Smartphones' : 'Laptops'}
              </h1>
              <p className="text-gray-500 mt-1">{filteredProducts.length} products found</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 md:w-80">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
                >
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden p-2.5 bg-white border border-gray-200 rounded-xl"
              >
                <FunnelIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'phone', label: 'Smartphones' },
              { id: 'laptop', label: 'Laptops' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.id })}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button className="text-sm text-primary-600 hover:text-primary-700">Clear All</button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-600">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-600">& Above</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <XMarkIcon className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              {/* Add filter content here - same as sidebar */}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;

