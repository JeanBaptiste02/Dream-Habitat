import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Interior Design',
    'Home Decoration',
    'Tips & Tricks',
    'Success Stories'
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Transform Your Living Room with AI: A Step-by-Step Guide",
      category: "Interior Design",
      author: "Sophie Anderson",
      date: "March 25, 2024",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-fotoaibe-1571460.jpg&fm=jpg",
      excerpt: "Discover how artificial intelligence is revolutionizing home interior design and how you can use it to transform your space.",
      featured: true
    },
    {
      id: 2,
      title: "2024 Interior Design Trends You Need to Know",
      category: "Tips & Tricks",
      author: "Michael Chen",
      date: "March 23, 2024",
      readTime: "4 min read",
      image: "data:image/jpeg;base64,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",
      excerpt: "Stay ahead of the curve with these emerging interior design trends that will dominate 2024."
    },
    {
      id: 3,
      title: "From Dull to Dynamic: A RoomGPT Success Story",
      category: "Success Stories",
      author: "Emma Watson",
      date: "March 20, 2024",
      readTime: "6 min read",
      image: "data:image/jpeg;base64,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",
      excerpt: "See how one homeowner transformed their space using AI-powered design suggestions."
    },
    {
        id: 4,
        title: "2024 Interior Design Trends You Need to Know",
        category: "Tips & Tricks",
        author: "Michael Chen",
        date: "March 23, 2024",
        readTime: "4 min read",
        image: "data:image/jpeg;base64,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",
        excerpt: "Stay ahead of the curve with these emerging interior design trends that will dominate 2024."
      },
      {
        id: 5,
        title: "Transform Your Living Room with AI: A Step-by-Step Guide",
        category: "Home Decoration",
        author: "Sophie Anderson",
        date: "March 25, 2024",
        readTime: "5 min read",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-fotoaibe-1571460.jpg&fm=jpg",
        excerpt: "Discover how artificial intelligence is revolutionizing home interior design and how you can use it to transform your space.",
        featured: true
      },
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const filteredPosts = blogPosts.filter(post => 
    selectedCategory === 'All' || post.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              DREAM HABITAT Blog
            </motion.h1>
            <motion.p 
              className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Discover the latest trends, tips, and transformations in AI-powered interior design
            </motion.p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.find(post => post.featured) && selectedCategory === 'All' && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="relative">
                <img 
                  src={filteredPosts.find(post => post.featured).image}
                  alt="Featured post"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span className="inline-block px-4 py-1 rounded-full bg-blue-500 text-sm font-medium mb-4">
                    Featured
                  </span>
                  <h2 className="text-3xl font-bold mb-4">
                    {filteredPosts.find(post => post.featured).title}
                  </h2>
                  <p className="text-lg mb-4">
                    {filteredPosts.find(post => post.featured).excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span>{filteredPosts.find(post => post.featured).author}</span>
                    <span>•</span>
                    <span>{filteredPosts.find(post => post.featured).date}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.filter(post => !post.featured || selectedCategory !== 'All').map((post) => (
            <motion.article 
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
            >
              <div className="relative">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 hover:text-blue-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;