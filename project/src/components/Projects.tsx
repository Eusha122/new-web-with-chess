import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Code, Copy, Check, Eye } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  const filters = ['All', 'Web', 'Python', 'Interactive', 'AI'];

  const projects = [
    {
      id: 1,
      title: 'Interactive Date Proposal',
      description: 'A fun, interactive web application with animated elements and engaging user interactions.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Interactive',
      github: '#',
      demo: '/project-one',
      languages: {
        HTML: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Can we go on a date?</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Can we go on a date</h1>
        <div class="buttons">
            <button class="yes-button" onclick="handleYesClick()">Yes</button>
            <button class="no-button" onclick="handleNoClick()">No</button>
        </div>
        <div class="gif_container">
            <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif" alt="Cute GIF">
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        JavaScript: `const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = \`\${currentSize * 1.5}px\`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}`,
        CSS: `body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f9e3e3;
    font-family: 'Arial', sans-serif;
    flex-direction: column;
}

.container {
    text-align: center;
}

h1 {
    font-size: 2.5em;
    color: #d32f2f;
}

.buttons {
    margin-top: 20px;
}

.yes-button {
    font-size: 1.5em;
    padding: 10px 20px;
    margin-right: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.no-button {
    font-size: 1.5em;
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}`
      }
    },
    {
      id: 2,
      title: 'Romantic Love Story',
      description: 'An immersive, animated love story with beautiful visual effects and interactive elements.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop',
      tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
      category: 'Interactive',
      github: '#',
      demo: '/index.html',
      languages: {
        HTML: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Something Special For You</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
</head>
<body>
    <div class="container">
        <div class="neon-frame"></div>
        <h1 class="text-glitch" data-text="I have something for you...">I have something for you...</h1>
        <p class="subtitle">A special moment awaits...</p>
        
        <div class="btn-container">
            <button class="btn" id="revealBtn">Click to Reveal</button>
        </div>
    </div>
</body>
</html>`,
        JavaScript: `document.addEventListener('DOMContentLoaded', function() {
    const revealBtn = document.getElementById('revealBtn');
    
    revealBtn.addEventListener('click', function() {
        this.classList.add('clicked');
        showMagicEffects();
        
        setTimeout(function() {
            window.location.href = 'propose.html';
        }, 5000);
    });
    
    function showMagicEffects() {
        // Create floating hearts and magical effects
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 300);
        }
    }
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        document.body.appendChild(heart);
        
        // Animate the heart
        gsap.to(heart, {
            y: -window.innerHeight,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 5,
            ease: "power1.out",
            onComplete: function() {
                document.body.removeChild(heart);
            }
        });
    }
});`
      }
    },
    {
      id: 3,
      title: 'Invisibility Cloak',
      description: 'A Python computer vision project that creates an invisibility effect using OpenCV and color detection.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop',
      tags: ['Python', 'OpenCV', 'Computer Vision'],
      category: 'Python',
      github: '#',
      demo: '#',
      languages: {
        Python: `import cv2
import numpy as np
import time

print("""
     Your cloak is loading....
     hide from your webcam for the first 5 seconds, as it needs to capture the background (without you in it) 
""")

# Initialize webcam
video = cv2.VideoCapture(0)
time.sleep(3)

# Capture static background frame
bg_frame = 0
for _ in range(30):
    success, bg_frame = video.read()

# Flip background for mirror view
bg_frame = np.flip(bg_frame, axis=1)

while video.isOpened():
    success, frame = video.read()
    if not success:
        break

    # Flip the frame horizontally (mirror effect)
    frame = np.flip(frame, axis=1)

    # Convert BGR image to HSV color space
    hsv_img = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Slightly smoothen the image
    blurred_hsv = cv2.GaussianBlur(hsv_img, (35, 35), 0)

    # Lower red hue range, you can swap out the colour, this is set to red
    red_lower_1 = np.array([0, 120, 70])
    red_upper_1 = np.array([10, 255, 255])
    mask_red1 = cv2.inRange(hsv_img, red_lower_1, red_upper_1)

    # Upper red hue range
    red_lower_2 = np.array([170, 120, 70])
    red_upper_2 = np.array([180, 255, 255])
    mask_red2 = cv2.inRange(hsv_img, red_lower_2, red_upper_2)

    # Combine both red masks
    full_mask = mask_red1 + mask_red2

    # Clean up noise from the mask
    full_mask = cv2.morphologyEx(
        full_mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))

    # Replace detected red areas with background
    frame[np.where(full_mask == 255)] = bg_frame[np.where(full_mask == 255)]

    # Show the final output
    cv2.imshow('Magic Window', frame)

    # Break loop if ESC key is pressed
    if cv2.waitKey(10) == 27:
        break`
      }
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      category: 'Web',
      github: '#',
      demo: '#',
      languages: {
        TypeScript: `import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Eusha
          </span>
        </h1>
        <p className="text-xl text-gray-400">
          Tech Explorer • Future Engineer • Dreamer
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;`
      }
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openProjectDetail = (project: any) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  return (
    <>
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold font-poppins mb-6">
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                My Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Here are some of the projects I've built while learning and exploring different technologies.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                    : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-700'
                }`}
                data-cursor="pointer"
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onCopyCode={copyToClipboard}
                copiedCode={copiedCode}
                onOpenDetail={openProjectDetail}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectDetail
        project={selectedProject}
        isOpen={showProjectDetail}
        onClose={() => setShowProjectDetail(false)}
      />
    </>
  );
};

interface ProjectCardProps {
  project: any;
  index: number;
  onCopyCode: (code: string, language: string) => void;
  copiedCode: string | null;
  onOpenDetail: (project: any) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  onCopyCode, 
  copiedCode, 
  onOpenDetail 
}) => {
  const [showCode, setShowCode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(Object.keys(project.languages)[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="bg-dark-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            onClick={() => setShowCode(!showCode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-dark-800/80 backdrop-blur-sm rounded-full text-white hover:bg-primary-600 transition-colors"
            data-cursor="pointer"
            title="View Code"
          >
            <Code size={18} />
          </motion.button>
          <motion.button
            onClick={() => onOpenDetail(project)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-dark-800/80 backdrop-blur-sm rounded-full text-white hover:bg-accent-600 transition-colors"
            data-cursor="pointer"
            title="View Details"
          >
            <Eye size={18} />
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            data-cursor="pointer"
          >
            <Github size={18} />
            <span>Code</span>
          </motion.a>
          <motion.a
            href={project.demo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            data-cursor="pointer"
          >
            <ExternalLink size={18} />
            <span>Demo</span>
          </motion.a>
          <motion.button
            onClick={() => onOpenDetail(project)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors ml-auto"
            data-cursor="pointer"
          >
            <Eye size={18} />
            <span>View Details</span>
          </motion.button>
        </div>

        {/* Code Section */}
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 border-t border-dark-700 pt-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                {Object.keys(project.languages).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-700 text-gray-400 hover:text-white'
                    }`}
                    data-cursor="pointer"
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <motion.button
                onClick={() => onCopyCode(project.languages[selectedLanguage], selectedLanguage)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-1 bg-dark-700 hover:bg-dark-600 rounded-md text-sm text-gray-400 hover:text-white transition-colors"
                data-cursor="pointer"
              >
                {copiedCode === selectedLanguage ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>
            <div className="bg-dark-900 rounded-lg p-4 overflow-x-auto max-h-64">
              <pre className="text-sm text-gray-300">
                <code>{project.languages[selectedLanguage]}</code>
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;