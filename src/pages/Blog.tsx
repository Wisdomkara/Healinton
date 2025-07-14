
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "Managing Diabetes with Smart Technology",
      excerpt: "Discover how modern apps can help you track blood sugar levels and maintain a healthy lifestyle with diabetes.",
      author: "Dr. Sarah Johnson",
      date: "December 20, 2024",
      readTime: "5 min read",
      image: "/placeholder.svg",
      category: "Diabetes"
    },
    {
      id: 2,
      title: "Heart Health: Prevention is Better Than Cure",
      excerpt: "Learn about the latest strategies for maintaining cardiovascular health and preventing heart disease.",
      author: "Dr. Michael Chen",
      date: "December 18, 2024",
      readTime: "7 min read",
      image: "/placeholder.svg",
      category: "Heart Health"
    },
    {
      id: 3,
      title: "Medication Adherence: Tips for Success",
      excerpt: "Practical strategies to help you remember and stick to your medication schedule for better health outcomes.",
      author: "Nurse Practitioner Lisa Wong",
      date: "December 15, 2024",
      readTime: "4 min read",
      image: "/placeholder.svg",
      category: "General Health"
    },
    {
      id: 4,
      title: "Nutrition Planning for Chronic Conditions",
      excerpt: "How to create meal plans that support your health goals while managing chronic conditions effectively.",
      author: "Nutritionist David Brown",
      date: "December 12, 2024",
      readTime: "6 min read",
      image: "/placeholder.svg",
      category: "Nutrition"
    },
    {
      id: 5,
      title: "Understanding Heart Disease Risk Factors",
      excerpt: "Comprehensive guide to identifying and managing risk factors for cardiovascular disease.",
      author: "Dr. Emily Carter",
      date: "December 10, 2024",
      readTime: "8 min read",
      image: "/placeholder.svg",
      category: "Heart Health"
    },
    {
      id: 6,
      title: "Living Well with Diabetes: Daily Management Tips",
      excerpt: "Practical advice for managing diabetes in your daily routine, from meal planning to exercise.",
      author: "Diabetes Educator Mark Thompson",
      date: "December 8, 2024",
      readTime: "6 min read",
      image: "/placeholder.svg",
      category: "Diabetes"
    }
  ];

  const categories = ["All", "Diabetes", "Heart Health", "General Health", "Nutrition"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Health <span className="text-green-600">Blog</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Expert insights, tips, and the latest research to help you manage your health effectively.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              size="sm"
              className="hover:scale-105 transition-transform"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            {selectedCategory === "All" 
              ? `Showing all ${blogPosts.length} articles` 
              : `Showing ${filteredPosts.length} articles in "${selectedCategory}"`
            }
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${
                  index % 4 === 0 ? 'rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1)' :
                  index % 4 === 1 ? 'rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)' :
                  index % 4 === 2 ? 'rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1)' :
                  'rgba(236, 72, 153, 0.1), rgba(34, 197, 94, 0.1)'
                })`
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800"></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <Button size="sm" className="hover:scale-105 transition-transform">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No results message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No articles found in the "{selectedCategory}" category.
            </p>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
