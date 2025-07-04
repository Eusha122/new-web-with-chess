import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import BlogDetail from './BlogDetail';

const Blog: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showBlogDetail, setShowBlogDetail] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "What I'm Learning This Month",
      excerpt: "Diving deep into C++ programming and strengthening my problem-solving skills through competitive programming.",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      tags: ["Learning", "C++", "Problem Solving"],
      content: `🧠 What I'm Learning This Month: C++ and Problem Solving
As part of my continuous journey in software development, this month I've dedicated my focus to two critical areas: mastering C++ programming and strengthening my problem-solving skills. Both are foundational pillars for any aspiring software engineer — and this phase is all about building that foundation stronger than ever.

🔹 Deep Dive into C++
C++ is known for its performance, memory management, and use in systems-level programming. I chose C++ because it's not just a language — it's a discipline. It teaches you how computers manage memory, how data structures operate internally, and how to write efficient code that runs close to the hardware.

Over the past few weeks, I've worked through:

Core concepts like loops, functions, and classes

Advanced topics such as pointers, dynamic memory allocation, file handling

Standard Template Library (STL) — particularly vectors, maps, and sets

This learning is not just theoretical. I'm reinforcing concepts by writing real code, building mini-projects, and solving practical problems using C++.

🔹 Focused Problem Solving
Alongside language proficiency, I'm also investing serious time into improving my algorithmic thinking. I've been solving a variety of problems on platforms like Codeforces and LeetCode — ranging from basic logic puzzles to complex graph and dynamic programming challenges.

What I've learned:

How to break down complex problems into manageable sub-problems

The importance of writing time and space-efficient solutions

A more structured approach to debugging and optimizing code

This is not just about competitions — it's about sharpening my ability to think like an engineer.

💡 Why These Skills Matter
Mastering C++ and developing strong problem-solving capabilities are stepping stones for multiple goals: excelling in technical interviews, competing in programming contests, and ultimately becoming a better software developer.

These skills lay the groundwork for understanding lower-level system behavior, optimizing application performance, and approaching complex challenges with clarity and precision.

🚀 Looking Ahead
I believe in the power of consistent learning. Each month, I choose a focus that aligns with my long-term goals. This month, it's C++ and problem-solving. Next month, it might be Android development or contributing to open-source projects.

No matter the focus, the goal remains the same — to grow as a developer and a thinker.

Thanks for reading, and feel free to connect if you're on a similar learning journey!

— Eusha Ibna Akbor`
    },
    {
      id: 2,
      title: "My Thoughts on Tech in the Future",
      excerpt: "How AI and machine learning will reshape the way we build software and solve problems in the coming decade.",
      date: "2024-01-10",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      tags: ["AI", "Future", "Technology"],
      content: `🌐 My Thoughts on Tech in the Future
Technology has always been a driving force in shaping the way we live, work, and connect with the world. As someone passionate about tech and its endless potential, I often find myself imagining what the next few decades will bring — not just in gadgets or AI, but in how technology will influence the very structure of our lives.

🚀 The Rise of Artificial Intelligence
AI is no longer science fiction — it's now deeply integrated into our everyday lives. From smart assistants and recommendation engines to self-driving cars and AI-generated content, we're seeing how intelligent machines are transforming industries.

In the future, I believe AI won't just assist us — it will collaborate with us. Tools will become more personalized, adaptive, and human-like in communication. However, this will also raise new questions around ethics, job displacement, and human dependency on machines.

🧠 The Human-Tech Merge
One of the most fascinating ideas I see growing is the fusion of biology and technology. Brain-computer interfaces (like those being developed by Neuralink) could allow us to control devices with our thoughts, enhance memory, and even treat neurological disorders. It sounds futuristic, but progress is already being made.

I believe in a future where we will blur the line between human ability and machine precision — opening doors to a whole new world of learning, interaction, and creativity.

🌍 Smarter, More Connected World
With the expansion of the Internet of Things (IoT), everything from our refrigerators to our cities will become "smart." Data will drive decisions in real-time, reducing waste, saving energy, and improving efficiency.

In developing countries like mine (Bangladesh), I hope technology will help close the digital divide, bring better education, healthcare, and connectivity to rural areas, and create more opportunities for innovation at the grassroots level.

🛡️ Security and Digital Freedom
As our world becomes more digitized, cybersecurity and privacy will be more critical than ever. The future of tech must prioritize protecting users' data, ensuring transparency, and upholding digital rights — especially in an age where personal information is often more valuable than currency.

It's not just about creating powerful tools; it's about using them responsibly.

💡 My Role in This Future
As a student learning programming, problem solving, and AI, I see myself as part of this movement. Whether I become a software engineer, app developer, or AI researcher — my goal is to build solutions that improve lives and keep humanity at the center of innovation.

🔮 Final Thoughts
The future of tech is both exciting and unpredictable. While it promises incredible progress, it also demands responsibility, empathy, and vision. I believe that with the right mindset, we can create a world where technology empowers everyone — not just a few.

I'm learning, evolving, and preparing to be a meaningful part of that future.

— Eusha Ibna Akbor`
    },
    {
      id: 3,
      title: "Behind the Scenes of My Projects",
      excerpt: "The challenges I faced while building my latest projects and the lessons learned along the way.",
      date: "2024-01-05",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      tags: ["Projects", "Learning", "Development"],
      content: `🛠️ Behind the Scenes of My Projects
— by Eusha Ibna Akbor

Being a self-taught developer is both exciting and challenging — especially when you're juggling high school, coding, and building real-world projects all at once. This month, I've been diving deeper into Python development, experimenting with creative ideas, and improving my website — all while staying committed to learning and growth.

💻 What I'm Building
Right now, I'm working on a variety of small but meaningful Python projects, including fun tools like an Invisibility Cloak, along with other utility-based ideas. These projects are helping me understand how to think logically, solve problems, and write clean, functional code.

I'm also developing my personal website, where people can learn more about me, explore my projects, and even play chess against me — one of my favorite hobbies.

🧠 Technologies I Use
My main tech stack includes:

Python – for backend logic and automation

HTML/CSS – to build and style my website

JavaScript – for interactivity and frontend features

C++ (beginner level) – which I've just started learning to expand my problem-solving abilities

Each new project teaches me something valuable, whether it's a new programming concept or a creative way to present an idea.

⏳ The Struggles Are Real
As a student in Class 10, one of my biggest challenges is managing time between studies and coding. School responsibilities are demanding, and technical bugs often eat up hours when I try to fix them. But every challenge has pushed me to become better, more patient, and more passionate about building things from scratch.

💡 Where the Ideas Come From
Most of my ideas come from random thoughts — I'll be sitting there and suddenly think, "What if I had a website where anyone could get to know me and play chess with me?" That's exactly how my current site started.

I also get inspired by the tech content I see online, and I always try to add my own twist to make my projects unique.

👨‍👩‍👧‍👦 My Support System
What keeps me going is the unwavering support from my family. They believe in me, and that belief motivates me to keep learning — even on tough days. I've taught myself everything I know so far, and their encouragement makes that journey easier.

🚀 The Road Ahead
I don't plan to stop here. I want to:

Sharpen my C++ and problem-solving skills

Learn backend development in more depth

Improve my website with smarter features

And one day — build tools that can truly make people's lives better

Being self-taught means you face a lot of unknowns, but it also gives you the freedom to explore, experiment, and grow in your own way. I'm proud of how far I've come — and I'm even more excited about what's next.

If you're curious to see what I'm working on or want to play a game of chess, feel free to check out my site!

— Eusha Ibna Akbor`
    }
  ];

  const openBlogDetail = (post: any) => {
    setSelectedPost(post);
    setShowBlogDetail(true);
  };

  return (
    <>
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 relative">
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
                Blog & Thoughts
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Sharing my journey, learnings, and thoughts about technology and the future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-300 group cursor-pointer"
                data-cursor="pointer"
                onClick={() => openBlogDetail(post)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

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

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 text-primary-400 font-medium"
                  >
                    <span>Read More</span>
                    <ArrowRight size={16} />
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
              data-cursor="pointer"
            >
              View All Posts
            </motion.button>
          </motion.div>
        </div>
      </section>

      <BlogDetail
        post={selectedPost}
        isOpen={showBlogDetail}
        onClose={() => setShowBlogDetail(false)}
      />
    </>
  );
};

export default Blog;