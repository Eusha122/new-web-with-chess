import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

interface BlogDetailProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, isOpen, onClose }) => {
  if (!post) return null;

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Handle headings
      if (paragraph.startsWith('🧠') || paragraph.startsWith('🌐') || paragraph.startsWith('🛠️')) {
        return (
          <h1 key={index} className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
            {paragraph}
          </h1>
        );
      }
      
      // Handle subheadings with emojis
      if (paragraph.startsWith('🔹') || paragraph.startsWith('🚀') || paragraph.startsWith('🧠') || 
          paragraph.startsWith('🌍') || paragraph.startsWith('🛡️') || paragraph.startsWith('💡') || 
          paragraph.startsWith('🔮') || paragraph.startsWith('💻') || paragraph.startsWith('⏳') || 
          paragraph.startsWith('👨‍👩‍👧‍👦') || paragraph.startsWith('🚀')) {
        return (
          <h2 key={index} className="text-xl sm:text-2xl font-bold text-primary-400 mb-4 mt-8">
            {paragraph}
          </h2>
        );
      }
      
      // Handle regular paragraphs
      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="min-h-screen bg-dark-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-dark-800/95 backdrop-blur-md border-b border-dark-700 z-10">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span className="hidden sm:inline">Back to Blog</span>
                  </motion.button>
                  
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              {/* Hero Image */}
              <div className="relative overflow-hidden rounded-2xl mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              </div>

              {/* Article Header */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center space-x-6 text-gray-400 text-sm sm:text-base">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="space-y-4">
                  {formatContent(post.content)}
                </div>
              </div>

              {/* Author Section */}
              <div className="mt-12 pt-8 border-t border-dark-700">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500">
                    <img 
                      src="/481281109_1096804492202639_400819024598160651_n.jpg" 
                      alt="Eusha" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Eusha Ibna Akbor</h3>
                    <p className="text-gray-400">Tech Explorer • Future Engineer • Dreamer</p>
                    <p className="text-sm text-gray-500 mt-1">
                      High school student from Bangladesh passionate about technology and innovation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Blog Button */}
              <div className="mt-12 text-center">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Back to All Posts
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogDetail;