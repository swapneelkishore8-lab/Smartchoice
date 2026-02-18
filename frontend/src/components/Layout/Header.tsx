import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { useCartStore, useWishlistStore, useComparisonStore, useUIStore } from '../../store';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.productIds.length);
  const comparisonCount = useComparisonStore((state) => state.getProductCount());

  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  const navLinks = [
    { href: '/products?category=phone', label: 'Phones', icon: DevicePhoneMobileIcon },
    { href: '/products?category=laptop', label: 'Laptops', icon: ComputerDesktopIcon },
    { href: '/recommendations', label: 'Find for You' },
    { href: '/compare', label: 'Compare' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <p className="hidden sm:block">🎉 Get personalized recommendations based on your needs!</p>
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/login" className="hover:text-primary-200 transition-colors">
              Sign In
            </Link>
            <span className="hidden sm:block">|</span>
            <Link to="/profile" className="hover:text-primary-200 transition-colors">
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <DevicePhoneMobileIcon className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-xl font-bold gradient-text hidden sm:block">
              SmartChoice
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-1.5 font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {link.icon && <link.icon className="w-5 h-5" />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all hidden sm:flex"
            >
              <HeartIcon className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Compare */}
            <Link
              to="/compare"
              className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all hidden sm:flex"
            >
              <ArrowsRightLeftIcon className="w-6 h-6" />
              {comparisonCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all hidden sm:flex"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              to="/login"
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
            >
              <UserIcon className="w-6 h-6" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all md:hidden"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <HeartIcon className="w-5 h-5" />
                    Wishlist
                  </span>
                  {wishlistCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/compare"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <ArrowsRightLeftIcon className="w-5 h-5" />
                    Compare
                  </span>
                  {comparisonCount > 0 && (
                    <span className="bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {comparisonCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCartIcon className="w-5 h-5" />
                    Cart
                  </span>
                  {cartItemCount > 0 && (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search phones, laptops, brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 text-lg outline-none placeholder-gray-400"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  {searchQuery ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Search results for "{searchQuery}"...</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Popular searches</p>
                      <div className="flex flex-wrap gap-2">
                        {['iPhone 15', 'Samsung S24', 'OnePlus 12', 'MacBook Pro', 'Gaming Laptop'].map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary-100 hover:text-primary-600 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

