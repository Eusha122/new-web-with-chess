import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Github } from 'lucide-react';
import TypedText from './TypedText';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 p-1"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-dark-900"></div>
            </motion.div>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-r from-primary-500 to-accent-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src="/481281109_1096804492202639_400819024598160651_n.jpg" 
                  alt="Eusha" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold font-poppins mb-3 sm:mb-4">
            <span className="block text-white">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              Eusha
            </span>
          </h1>
          
          <div className="text-lg sm:text-2xl lg:text-3xl text-gray-300 font-medium px-2">
            <TypedText
              strings={[
                "Tech Explorer 🚀",
                "Future Engineer 💻",
                "Problem Solver 🧩",
                "Code Enthusiast 👨‍💻",
                "Dreamer ✨"
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
        >
          High school student from Rajshahi, Bangladesh passionate about technology, coding, and building innovative solutions that make a difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            data-cursor="pointer"
          >
            <span>View Projects</span>
            <ArrowDown size={18} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            data-cursor="pointer"
          >
            <Download size={18} />
            <span>Download Resume</span>
          </motion.button>
          
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            data-cursor="pointer"
          >
            <Mail size={18} />
            <span>Contact Me</span>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-center space-x-6"
        >
          <motion.a
            href="https://github.com/Eusha122"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            data-cursor="pointer"
          >
            <Github size={24} />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400"
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;