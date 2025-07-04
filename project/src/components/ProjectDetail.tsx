import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, Github, Code, Eye } from 'lucide-react';

interface ProjectDetailProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, isOpen, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(Object.keys(project?.languages || {})[0] || '');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'code' | 'preview'>('split');

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="h-full w-full bg-dark-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-dark-700 flex-shrink-0">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{project.title}</h1>
                  <p className="text-gray-400 text-sm sm:text-base">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {/* View Mode Toggle */}
                <div className="hidden lg:flex items-center space-x-1 bg-dark-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('code')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'code' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Code Only"
                  >
                    <Code size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('split')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'split' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Split View"
                  >
                    <div className="w-4 h-4 border border-current rounded-sm">
                      <div className="w-full h-1/2 border-b border-current"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'preview' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Preview Only"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {/* External Links */}
                <div className="flex items-center space-x-2">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="View on GitHub"
                  >
                    <Github size={18} />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="View Demo"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mobile View Mode Toggle */}
            <div className="lg:hidden flex items-center justify-center space-x-1 bg-dark-700 rounded-lg p-1 mx-4 mt-4">
              <button
                onClick={() => setViewMode('code')}
                className={`flex-1 p-2 rounded-md transition-colors text-sm ${
                  viewMode === 'code' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex-1 p-2 rounded-md transition-colors text-sm ${
                  viewMode === 'preview' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Preview
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {viewMode === 'split' ? (
                <div className="h-full grid lg:grid-cols-2 gap-4 p-4">
                  {/* Code Section */}
                  <div className="bg-dark-700/50 rounded-xl border border-dark-600 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-dark-600">
                      <div className="flex space-x-2">
                        {Object.keys(project.languages).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                              selectedLanguage === lang
                                ? 'bg-primary-600 text-white'
                                : 'bg-dark-600 text-gray-400 hover:text-white'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                      <motion.button
                        onClick={() => copyToClipboard(project.languages[selectedLanguage], selectedLanguage)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-3 py-1 bg-dark-600 hover:bg-dark-500 rounded-md text-sm text-gray-400 hover:text-white transition-colors"
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
                    <div className="flex-1 overflow-auto p-4">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                        <code>{project.languages[selectedLanguage]}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="bg-dark-700/50 rounded-xl border border-dark-600 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-dark-600">
                      <h3 className="text-lg font-semibold text-white">Live Preview</h3>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-3 py-1 bg-primary-600 hover:bg-primary-700 rounded-md text-sm text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span>Open Full</span>
                      </motion.a>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <iframe
                        src={project.demo}
                        className="w-full h-full border-0"
                        title={`${project.title} Preview`}
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    </div>
                  </div>
                </div>
              ) : viewMode === 'code' ? (
                <div className="h-full p-4">
                  <div className="bg-dark-700/50 rounded-xl border border-dark-600 h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-dark-600">
                      <div className="flex space-x-2">
                        {Object.keys(project.languages).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                              selectedLanguage === lang
                                ? 'bg-primary-600 text-white'
                                : 'bg-dark-600 text-gray-400 hover:text-white'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                      <motion.button
                        onClick={() => copyToClipboard(project.languages[selectedLanguage], selectedLanguage)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-3 py-1 bg-dark-600 hover:bg-dark-500 rounded-md text-sm text-gray-400 hover:text-white transition-colors"
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
                    <div className="flex-1 overflow-auto p-4">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                        <code>{project.languages[selectedLanguage]}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full p-4">
                  <div className="bg-dark-700/50 rounded-xl border border-dark-600 h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-dark-600">
                      <h3 className="text-lg font-semibold text-white">Live Preview</h3>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-3 py-1 bg-primary-600 hover:bg-primary-700 rounded-md text-sm text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span>Open Full</span>
                      </motion.a>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <iframe
                        src={project.demo}
                        className="w-full h-full border-0"
                        title={`${project.title} Preview`}
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetail;