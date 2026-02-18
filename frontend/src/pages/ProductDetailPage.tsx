import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, HeartIcon, ArrowsRightLeftIcon, CheckIcon, StarIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';

// Mock product data
const product: Product = {
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
    features: ['Dynamic Island', 'ProMotion', 'Always-On Display', 'Satellite Emergency', 'Action Button']
  },
  ratings: { overall: 4.8, performance: 4.9, battery: 4.5, display: 4.9, camera: 4.8, value: 4.3, count: 2456 },
  images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'],
  availability: { inStock: true, amazon: { available: true, url: 'https://amazon.in', price: 119900 } },
  pros: ['Excellent camera system', 'Titanium build', 'Powerful processor', 'USB-C port'],
  cons: ['Expensive', 'Heavy', 'No charger included', 'Slow charging compared to Android'],
  tags: ['premium', 'flagship', 'camera', 'ios'],
  slug: 'iphone-15-pro-max'
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  const ratingBars = [
    { label: 'Performance', value: product.ratings.performance, color: 'bg-blue-500' },
    { label: 'Battery', value: product.ratings.battery, color: 'bg-green-500' },
    { label: 'Display', value: product.ratings.display, color: 'bg-purple-500' },
    { label: 'Camera', value: product.ratings.camera, color: 'bg-pink-500' },
    { label: 'Value', value: product.ratings.value, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-soft"
          >
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Brand & Title */}
            <div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {product.brand}
              </span>
              <h1 className="text-3xl font-display font-bold text-gray-900 mt-3">
                {product.name}
              </h1>
              <p className="text-gray-500 mt-1">{product.model}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.ratings.overall) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={i < Math.floor(product.ratings.overall) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.ratings.overall} ({product.ratings.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.current.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-green-600 mt-1">In Stock • Free Shipping</p>
              
              <div className="flex gap-3 mt-4">
                <button className="flex-1 btn-primary">
                  Add to Cart
                </button>
                <button className="p-3 btn-secondary">
                  <HeartIcon className="w-6 h-6" />
                </button>
                <button className="p-3 btn-secondary">
                  <ArrowsRightLeftIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-semibold text-gray-900 mb-4">Key Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.specifications.display && (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Display</p>
                    <p className="font-medium">{product.specifications.display.size}" {product.specifications.display.type}</p>
                  </div>
                )}
                {product.specifications.processor && (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Processor</p>
                    <p className="font-medium">{product.specifications.processor.chipset}</p>
                  </div>
                )}
                {product.specifications.memory && (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">RAM / Storage</p>
                    <p className="font-medium">{product.specifications.memory.ram}GB / {product.specifications.memory.storage}GB</p>
                  </div>
                )}
                {product.specifications.battery && (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Battery</p>
                    <p className="font-medium">{product.specifications.battery.capacity}mAh</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckIcon className="w-5 h-5" /> Pros
                </h3>
                <ul className="space-y-2">
                  {product.pros?.slice(0, 3).map((pro, i) => (
                    <li key={i} className="text-sm text-green-700">• {pro}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <XIcon className="w-5 h-5" /> Cons
                </h3>
                <ul className="space-y-2">
                  {product.cons?.slice(0, 3).map((con, i) => (
                    <li key={i} className="text-sm text-red-700">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rating Breakdown */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-soft">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Rating Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl font-bold text-gray-900">{product.ratings.overall}</div>
                <div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-6 h-6 ${i < Math.floor(product.ratings.overall) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill={i < Math.floor(product.ratings.overall) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 mt-1">{product.ratings.count} reviews</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {ratingBars.map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-gray-600">{bar.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${bar.color} rounded-full`}
                      style={{ width: `${(bar.value / 5) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm font-medium">{bar.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple X icon component
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default ProductDetailPage;

