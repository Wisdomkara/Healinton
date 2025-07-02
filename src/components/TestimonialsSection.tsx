
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      condition: "Type 2 Diabetes",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=100&h=100&fit=crop&crop=face",
      text: "Healinton has completely transformed how I manage my diabetes. The meal plans are realistic and delicious, and I've never felt more in control of my health.",
      rating: 5
    },
    {
      name: "Robert Chen",
      condition: "Hypertension",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "The medication reminders and blood pressure tracking have been game-changers. My doctor is amazed at how consistent my readings have become.",
      rating: 5
    },
    {
      name: "Jennifer Williams",
      condition: "Heart Disease",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      text: "After my heart attack, I was scared and overwhelmed. Healinton gave me the confidence to take charge of my recovery. I haven't missed a single appointment since.",
      rating: 5
    },
    {
      name: "David Thompson",
      condition: "High Cholesterol",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "The personalized meal recommendations helped me lower my cholesterol by 40 points in just 3 months. My family doctor couldn't believe the results!",
      rating: 5
    },
    {
      name: "Lisa Anderson",
      condition: "Obesity & Diabetes",
      location: "Phoenix, AZ",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      text: "I've lost 35 pounds and my A1C dropped from 9.2 to 6.8. The community support and practical tools made all the difference in my journey.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-green-50/80 via-blue-50/80 to-purple-50/80 dark:from-green-950/50 dark:via-blue-950/50 dark:to-purple-950/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 px-4 py-2 rounded-full mb-6">
            <Quote className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              What Our Users Say
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real Stories, Real Results
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of people who have transformed their health management with Healinton
          </p>
        </div>

        {/* Desktop Layout - 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* First Column - 2 testimonials */}
          <div className="space-y-6">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.condition} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Second Column - 2 testimonials with offset */}
          <div className="space-y-6 mt-8">
            {testimonials.slice(2, 4).map((testimonial, index) => (
              <Card 
                key={index + 2}
                className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.condition} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Third Column - 1 testimonial centered */}
          <div className="flex justify-center items-start mt-16">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm max-w-sm">
              <div className="flex items-center mb-4">
                {renderStars(testimonials[4].rating)}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                "{testimonials[4].text}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonials[4].image} 
                  alt={testimonials[4].name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[4].name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonials[4].condition} • {testimonials[4].location}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile Layout - Single column carousel-style */}
        <div className="md:hidden space-y-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.condition} • {testimonial.location}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">5.0</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Based on 2,500+ verified reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
