import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserIcon, HeartIcon, Cog6ToothIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ProfilePage: React.FC = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joinedDate: 'January 2024',
  };

  const stats = [
    { label: 'Products Viewed', value: '156' },
    { label: 'Comparisons', value: '12' },
    { label: 'Saved Items', value: '8' },
  ];

  const recentActivity = [
    { type: 'viewed', product: 'iPhone 15 Pro Max', date: '2 hours ago' },
    { type: 'compared', product: 'Samsung S24 Ultra vs OnePlus 12', date: '1 day ago' },
    { type: 'saved', product: 'MacBook Pro 14"', date: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">{user.name}</h1>
              <p className="text-primary-100">{user.email}</p>
              <p className="text-sm text-primary-200 mt-1">Member since {user.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-soft text-center"
                >
                  <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preferences */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-medium text-gray-900">Preferred Categories</h3>
                    <p className="text-sm text-gray-500">Smartphones, Laptops</p>
                  </div>
                  <Link to="/recommendations" className="text-primary-600 hover:text-primary-700">
                    <Cog6ToothIcon className="w-5 h-5" />
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-medium text-gray-900">Budget Range</h3>
                    <p className="text-sm text-gray-500">₹30,000 - ₹1,00,000</p>
                  </div>
                  <Link to="/recommendations" className="text-primary-600 hover:text-primary-700">
                    <Cog6ToothIcon className="w-5 h-5" />
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-medium text-gray-900">Top Priority</h3>
                    <p className="text-sm text-gray-500">Performance, Battery</p>
                  </div>
                  <Link to="/recommendations" className="text-primary-600 hover:text-primary-700">
                    <Cog6ToothIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <Link
                to="/recommendations"
                className="mt-4 w-full btn-primary inline-flex justify-center"
              >
                Update Preferences
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <HeartIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.product}</p>
                      <p className="text-sm text-gray-500 capitalize">{activity.type} • {activity.date}</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-2">
                <Link to="/wishlist" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <HeartIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">Wishlist</span>
                </Link>
                <Link to="/compare" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="text-gray-700">Comparisons</span>
                </Link>
                <Link to="/recommendations" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-gray-700">Recommendations</span>
                </Link>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left text-red-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

