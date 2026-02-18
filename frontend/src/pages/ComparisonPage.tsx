import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ComparisonPage: React.FC = () => {
  const products = [
    {
      _id: '1',
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      price: 119900,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300',
      specs: {
        display: '6.7" OLED',
        processor: 'A17 Pro',
        ram: '8GB',
        storage: '256GB',
        battery: '4422mAh',
        camera: '48MP',
      }
    },
    {
      _id: '2',
      name: 'Samsung S24 Ultra',
      brand: 'Samsung',
      price: 99999,
      image: 'https://images.unsplash.com/photo-1610945265078-3858a0054825?w=300',
      specs: {
        display: '6.8" AMOLED',
        processor: 'Snapdragon 8 Gen 3',
        ram: '12GB',
        storage: '256GB',
        battery: '5000mAh',
        camera: '200MP',
      }
    },
  ];

  const specLabels: Record<string, string> = {
    display: 'Display',
    processor: 'Processor',
    ram: 'RAM',
    storage: 'Storage',
    battery: 'Battery',
    camera: 'Camera',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-display font-bold text-gray-900">Compare Products</h1>
          <p className="text-gray-500 mt-1">Comparing {products.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="grid grid-cols-4">
            {/* Product Columns */}
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 ${index === 0 ? 'bg-primary-50' : ''}`}
              >
                <button className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500">
                  ×
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-xl mb-4"
                />
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-xl font-bold text-primary-600 mt-2">
                  ₹{product.price.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Spec Rows */}
          {Object.entries(specLabels).map(([key, label]) => (
            <div key={key} className="grid grid-cols-4 border-t border-gray-100">
              <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                {label}
              </div>
              {products.map((product) => (
                <div key={product._id} className="p-4 text-center">
                  {product.specs[key as keyof typeof product.specs]}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Add More Products */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="btn-primary inline-flex"
          >
            + Add More Products to Compare
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;

