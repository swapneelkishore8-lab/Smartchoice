import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, HeartIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const discount = Math.round(((product.price.original - product.price.current) / product.price.original) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <Link to={`/products/${product._id}`} className="block relative">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {discount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
          >
            {discount}% OFF
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-4 right-4 flex flex-col gap-2"
        >
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
            <HeartIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
            <ArrowsRightLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
        </motion.div>

        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
            {product.brand}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{product.model}</p>
        </Link>

        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.ratings.overall) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.ratings.overall} ({product.ratings.count})
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {product.specifications.memory?.ram && (
            <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
              {product.specifications.memory.ram}GB RAM
            </span>
          )}
          {product.specifications.memory?.storage && (
            <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
              {product.specifications.memory.storage}GB
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price.current.toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price.original.toLocaleString()}
            </span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
