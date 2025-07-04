import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-dark-700">
      <div className="max-w-7xl mx-auto">
        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -top-6 right-8 w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
          data-cursor="pointer"
        >
          <ArrowUp size={20} />
        </motion.button>

        <div className="text-center">
          {/* Logo/Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold font-poppins bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Eusha Ibna Akbor
                </h3>
                <p className="text-gray-400 text-sm">Tech Explorer • Future Engineer</p>
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg italic mb-8 max-w-2xl mx-auto"
          >
            "Every line of code is a step towards building a better future."
          </motion.p>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center space-x-2 text-gray-400"
          >
            <span>© 2025 Eusha Ibna Akbor. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-current" />
              <span>in Bangladesh</span>
            </span>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-sm text-gray-500"
          >
            <p>Built with React, TypeScript, Tailwind CSS, and Framer Motion</p>
            <p className="mt-2">
              Suggested domains: 
              <span className="text-primary-400 ml-2">eusha.dev</span>
              <span className="text-accent-400 ml-2">whoiseusha.com</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;