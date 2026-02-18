import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    icon: string;
    description: string;
  }[];
}

const questions: Question[] = [
  {
    id: 'category',
    question: 'What are you looking for?',
    options: [
      { value: 'phone', label: 'Smartphone', icon: '📱', description: 'iPhone, Samsung, OnePlus & more' },
      { value: 'laptop', label: 'Laptop', icon: '💻', description: 'MacBook, Dell, ASUS & more' }
    ]
  },
  {
    id: 'budget',
    question: 'What is your budget?',
    options: [
      { value: 'budget', label: 'Budget Friendly', icon: '💵', description: 'Under ₹20,000' },
      { value: 'midrange', label: 'Mid Range', icon: '💰', description: '₹20,000 - ₹50,000' },
      { value: 'premium', label: 'Premium', icon: '💎', description: '₹50,000 - ₹1,00,000' },
      { value: 'flagship', label: 'Flagship', icon: '👑', description: 'Above ₹1,00,000' }
    ]
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    options: [
      { value: 'camera', label: 'Camera', icon: '📸', description: 'Best photos & videos' },
      { value: 'performance', label: 'Performance', icon: '⚡', description: 'Speed & power' },
      { value: 'battery', label: 'Battery Life', icon: '🔋', description: 'Long lasting' },
      { value: 'display', label: 'Display', icon: '🖥️', description: 'Screen quality' },
      { value: 'brand', label: 'Brand', icon: '⭐', description: 'Trusted brands' }
    ]
  },
  {
    id: 'usage',
    question: 'How will you use it?',
    options: [
      { value: 'gaming', label: 'Gaming', icon: '🎮', description: 'High-end games' },
      { value: 'photography', label: 'Photography', icon: '📷', description: 'Camera focused' },
      { value: 'business', label: 'Business', icon: '💼', description: 'Work & productivity' },
      { value: 'casual', label: 'Casual', icon: '😊', description: 'Everyday use' },
      { value: 'creative', label: 'Creative', icon: '🎨', description: 'Content creation' }
    ]
  }
];

const RecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
      setTimeout(() => {
        navigate(`/products?category=${answers.category || 'phone'}&budget=${answers.budget}&priority=${answers.priority || 'performance'}`);
      }, 2000);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50"
      >
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
        />
      </motion.div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Step Counter */}
      <div className="fixed top-6 right-6 z-50">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-lg">
          <SparklesIcon className="w-5 h-5 text-primary-500" />
          <span className="font-medium">{currentStep + 1} / {questions.length}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Question Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg mb-6">
                  <SparklesIcon className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
                  {questions[currentStep].question}
                </h1>
                <p className="text-gray-500">
                  Step {currentStep + 1} of {questions.length}
                </p>
              </motion.div>

              {/* Options Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {questions[currentStep].options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className="group cursor-pointer relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <motion.span 
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="text-4xl"
                      >
                        {option.icon}
                      </motion.span>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {option.label}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {option.description}
                        </p>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"
                      >
                        <ArrowRightIcon className="w-4 h-4 text-primary-600" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-12">
                <button
                  onClick={goBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    currentStep === 0 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  Previous
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 shadow-2xl mb-8"
              >
                <CheckIcon className="w-16 h-16 text-white" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4"
              >
                Perfect Match Found!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500 text-xl mb-8"
              >
                Finding the best products based on your preferences...
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center gap-3"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-3 h-3 rounded-full bg-primary-500"
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative animated circles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 -left-20 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-accent-200 rounded-full opacity-20 blur-3xl"
        />
      </div>
    </div>
  );
};

export default RecommendationPage;

