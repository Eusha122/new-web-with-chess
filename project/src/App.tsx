import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [visitors, setVisitors] = useState<Array<{name: string, relation: string}>>([]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Load visitors from localStorage
    const savedVisitors = localStorage.getItem('portfolioVisitors');
    if (savedVisitors) {
      setVisitors(JSON.parse(savedVisitors));
    }

    return () => clearTimeout(timer);
  }, []);

  const addVisitor = (name: string, relation: string) => {
    const newVisitor = { name, relation };
    const updatedVisitors = [...visitors, newVisitor];
    setVisitors(updatedVisitors);
    localStorage.setItem('portfolioVisitors', JSON.stringify(updatedVisitors));
  };

  return (
    <div className="relative min-h-screen bg-dark-900 text-white overflow-x-hidden">
      <CustomCursor />
      <ParticleBackground />
      <ScrollProgress />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Navbar visitors={visitors} onAddVisitor={addVisitor} />
            <Hero />
            <About />
            <Projects />
            <Blog />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;