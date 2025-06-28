
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const BlogPost = () => {
  const { id } = useParams();

  // Mock blog post data - in a real app, this would be fetched based on the ID
  const blogPost = {
    id: 1,
    title: "Managing Diabetes with Smart Technology",
    content: `
      <p>Living with diabetes can be challenging, but modern technology is making it easier than ever to manage this condition effectively. In this comprehensive guide, we'll explore how smart apps, wearable devices, and digital health tools can transform your diabetes management routine.</p>

      <h2>The Digital Revolution in Diabetes Care</h2>
      <p>Gone are the days when diabetes management relied solely on paper logs and memory. Today's digital tools offer real-time monitoring, personalized insights, and seamless integration with healthcare providers.</p>

      <h3>Smart Glucose Monitoring</h3>
      <p>Continuous Glucose Monitors (CGMs) have revolutionized how people with diabetes track their blood sugar levels. These devices provide real-time data, allowing for immediate adjustments to diet, exercise, and medication.</p>

      <h3>Meal Planning and Carb Counting</h3>
      <p>Modern apps can help you track carbohydrates, plan balanced meals, and even suggest recipes based on your dietary preferences and blood glucose targets. This technology takes the guesswork out of meal planning.</p>

      <h3>Medication Management</h3>
      <p>Smart reminders ensure you never miss a dose of insulin or other medications. Some apps even integrate with smart insulin pens to track doses automatically.</p>

      <h2>Integration with Healthcare Providers</h2>
      <p>The best diabetes management apps allow you to share your data directly with your healthcare team, enabling better communication and more informed treatment decisions.</p>

      <h3>Key Benefits:</h3>
      <ul>
        <li>Real-time blood glucose tracking</li>
        <li>Automated medication reminders</li>
        <li>Personalized meal recommendations</li>
        <li>Exercise and activity monitoring</li>
        <li>Healthcare provider integration</li>
        <li>Emergency alert systems</li>
      </ul>

      <h2>Getting Started</h2>
      <p>If you're ready to embrace digital diabetes management, start by consulting with your healthcare provider about which tools might be right for you. Remember, technology should complement, not replace, professional medical care.</p>

      <p>With the right combination of technology and professional support, managing diabetes can become more manageable and less stressful, allowing you to focus on living your best life.</p>
    `,
    author: "Dr. Sarah Johnson",
    date: "December 20, 2024",
    readTime: "5 min read",
    category: "Diabetes",
    summary: "Discover how modern apps can help you track blood sugar levels and maintain a healthy lifestyle with diabetes."
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
              {blogPost.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Card className="p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </Card>

        {/* Author Bio */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{blogPost.author}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Diabetes specialist with over 15 years of experience in digital health solutions.
              </p>
            </div>
          </div>
        </Card>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Heart Health: Prevention is Better Than Cure</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Learn about the latest strategies for maintaining cardiovascular health...
              </p>
              <Link to="/blog/2" className="text-green-600 hover:text-green-700 font-medium">
                Read More →
              </Link>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">Medication Adherence: Tips for Success</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Practical strategies to help you remember and stick to your medication schedule...
              </p>
              <Link to="/blog/3" className="text-green-600 hover:text-green-700 font-medium">
                Read More →
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
