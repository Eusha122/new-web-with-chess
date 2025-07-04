import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Rocket, Heart, Star, Calendar, MapPin } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'JavaScript', level: 80, icon: '⚡' },
    { name: 'C++', level: 40, icon: '⚙️' },
    { name: 'HTML/CSS', level: 90, icon: '🎨' },
    { name: 'Git', level: 75, icon: '📝' },
  ];

  const timeline = [
    {
      year: '2022',
      title: 'Started Coding Journey',
      description: 'Discovered programming through online tutorials and fell in love with creating digital solutions.',
      icon: <Code className="w-5 h-5" />,
    },
    {
      year: '2023',
      title: 'First Web Project',
      description: 'Built my first website and learned the fundamentals of web development.',
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      year: '2024',
      title: 'Exploring Technologies',
      description: 'Dove deeper into various programming languages and frameworks.',
      icon: <Star className="w-5 h-5" />,
    },
    {
      year: '2025',
      title: 'Current Focus',
      description: 'Building innovative tech solutions and preparing for university while mastering new technologies.',
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            I'm a passionate high school student from Bangladesh who believes technology can change the world. 
            Every line of code I write is a step towards building a better future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-dark-700">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white">From Bangladesh 🇧🇩</h3>
                  <p className="text-gray-400 text-sm sm:text-base">Rajshahi, Bangladesh</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                Growing up in Rajshahi, Bangladesh, I've always been fascinated by how technology can bridge gaps and create opportunities. 
                Despite the challenges, I've found my passion in coding and building things that matter.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                I spend my days learning new technologies, working on projects, and dreaming about the innovations 
                I'll create in the future. My goal is to become a software engineer who builds solutions that 
                make a positive impact on people's lives.
              </p>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <span>📚 High School Student</span>
                <span>💻 Self-taught Developer</span>
                <span>🚀 Future Engineer</span>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl p-4 sm:p-6 border border-primary-500/20">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Currently</h4>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span>Building exciting tech projects</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>Learning advanced programming concepts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span>Preparing for university applications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  <span>Exploring AI and machine learning</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Skills & Timeline */}
          <div className="space-y-6 sm:space-y-8">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-dark-700"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Skills & Technologies</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-base sm:text-lg">{skill.icon}</span>
                        <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
                      </div>
                      <span className="text-gray-400 text-xs sm:text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        className="h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-dark-700"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">My Journey</h3>
              <div className="space-y-4 sm:space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex items-start space-x-3 sm:space-x-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                        <span className="text-primary-400 font-bold text-sm sm:text-base">{item.year}</span>
                        <h4 className="text-white font-semibold text-sm sm:text-base">{item.title}</h4>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;