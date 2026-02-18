import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DevicePhoneMobileIcon, 
  ComputerDesktopIcon, 
  SparklesIcon,
  ArrowRightIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

// Celebrity endorsements data
const celebrities = [
  {
    id: 1,
    name: 'Shah Rukh Khan',
    role: 'Brand Ambassador',
    quote: 'SmartChoice se decision hamesha smart hota hai!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    tagline: 'Premium Choice'
  },
  {
    id: 2,
    name: 'Deepika Padukone',
    role: 'Tech Enthusiast',
    quote: 'Camera quality matters to me. SmartChoice understands!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    tagline: 'Camera Expert'
  },
  {
    id: 3,
    name: 'Virat Kohli',
    role: 'Performance Driven',
    quote: 'I need performance. SmartChoice delivers every time!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    tagline: 'Performance King'
  }
];

// Advertisement banners
const advertisements = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    discount: 'Up to ₹15,000 off',
    subtitle: 'Titanium Design • A17 Pro Chip • 48MP Camera',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
    cta: 'Shop Now',
    color: 'from-gray-900 to-gray-700'
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24 Ultra',
    discount: 'Exchange Bonus ₹5,000',
    subtitle: '200MP Camera • S Pen • Galaxy AI',
    image: 'https://images.unsplash.com/photo-1610945265078-385f4e266929?w=800',
    cta: 'Pre-order Now',
    color: 'from-purple-900 to-indigo-800'
  },
  {
    id: 3,
    title: 'OnePlus 12',
    discount: '₹5,000 Instant Discount',
    subtitle: '100W Charging • Hasselblad Camera',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800',
    cta: 'Buy Now',
    color: 'from-red-900 to-orange-800'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Animated Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
        >
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-2xl shadow-primary-500/30">
                <svg className="w-14 h-14 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>

            {/* Animated Title */}
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold"
            >
              <span className="gradient-text">SmartChoice</span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Find your perfect device with AI-powered recommendations based on your preferences
            </motion.p>

            {/* Animated CTA Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/recommendations"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
              >
                <SparklesIcon className="w-5 h-5" />
                Get Recommendations
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <DevicePhoneMobileIcon className="w-5 h-5" />
                Browse Products
              </Link>
            </motion.div>

            {/* Animated Stats */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { value: '50K+', label: 'Happy Users' },
                { value: '500+', label: 'Products' },
                { value: '4.9', label: 'User Rating' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: 'spring' }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Animated Celebrity Endorsements */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-12"
          >
            Trusted by Millions
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {celebrities.map((celeb, index) => (
              <motion.div
                key={celeb.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                  className="relative inline-block mb-4"
                >
                  <img 
                    src={celeb.image} 
                    alt={celeb.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white/30"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1">
                    <CheckBadgeIcon className="w-5 h-5 text-gray-900" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-white">{celeb.name}</h3>
                <p className="text-white/70 text-sm mb-3">{celeb.role}</p>
                <p className="text-white/90 italic">"{celeb.quote}"</p>
                <div className="mt-3 inline-block px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                  {celeb.tagline}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Advertisement Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {advertisements.map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${ad.color} p-8 min-h-[300px] flex flex-col justify-between`}
              >
                <div className="relative z-10">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                    className="text-white/80 text-sm font-medium mb-2"
                  >
                    Limited Time Offer
                  </motion.div>
                  <motion.h3
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                  >
                    {ad.title}
                  </motion.h3>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3"
                  >
                    {ad.discount}
                  </motion.div>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    className="text-white/90 text-sm mb-4"
                  >
                    {ad.subtitle}
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.6 }}
                >
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    {ad.cta}
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </motion.div>

                {/* Animated decorative circles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -right-10 -bottom-10 w-40 h-40 border-4 border-white/10 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute -right-5 -bottom-5 w-20 h-20 border-4 border-white/10 rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-center mb-4"
          >
            Choose Your Category
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 text-center mb-12 max-w-2xl mx-auto"
          >
            Browse our curated collection of smartphones and laptops from top brands
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: DevicePhoneMobileIcon,
                title: 'Smartphones',
                description: 'Latest phones from Apple, Samsung, OnePlus, Xiaomi & more',
                count: '250+ Products',
                gradient: 'from-blue-500 to-cyan-500',
                link: '/products?category=phone'
              },
              {
                icon: ComputerDesktopIcon,
                title: 'Laptops',
                description: 'Powerful laptops for work, gaming & creativity',
                count: '150+ Products',
                gradient: 'from-purple-500 to-pink-500',
                link: '/products?category=laptop'
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Link
                  to={category.link}
                  className="block relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10 flex items-center gap-6">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <category.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-gray-500 mt-1">{category.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium rounded-full">
                          {category.count}
                        </span>
                        <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-accent-600 p-12 text-center"
          >
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
              >
                Ready to Find Your Perfect Device?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-white/80 mb-8"
              >
                Take our 30-second quiz and get personalized recommendations
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/recommendations"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <SparklesIcon className="w-5 h-5" />
                  Start Recommendation Quiz
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

