
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send, Heart } from 'lucide-react';

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex: number) => {
    setHoveredRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting!');
      return;
    }

    // Create email subject and body
    const subject = `Healinton App Review - ${rating} Star${rating > 1 ? 's' : ''}`;
    const body = `Rating: ${rating}/5 stars\n\nFeedback:\n${feedback || 'No additional feedback provided.'}`;
    
    // Create mailto link - use karawisdom38@gmail.com for 5-star reviews
    const emailAddress = rating === 5 ? 'karawisdom38@gmail.com' : 'support@healinton.com';
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.open(mailtoLink);
    
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0);
      setFeedback('');
    }, 3000);
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <Heart className="h-16 w-16 text-green-600 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Thank You!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your feedback has been sent to our team. We appreciate your input!
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Rate Your Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Help us improve Healinton by sharing your feedback
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                className="transition-all duration-200 transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`h-12 w-12 transition-all duration-200 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
          
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {getRatingText(hoveredRating || rating)}
          </p>
        </div>

        {/* Feedback Input */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
            Share your thoughts (optional)
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you love about Healinton or how we can improve..."
            className="min-h-32 resize-none border-2 focus:border-green-500 transition-colors"
            maxLength={500}
          />
          <p className="text-sm text-gray-500 mt-2">
            {feedback.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={rating === 0}
          >
            <Send className="h-5 w-5 mr-2" />
            Send Feedback
          </Button>
          
          {rating === 0 && (
            <p className="text-sm text-red-500 mt-2">
              Please select a rating before submitting
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Your feedback will be sent directly to our team at{' '}
            <span className="font-medium text-green-600">
              {rating === 5 ? 'karawisdom38@gmail.com' : 'support@healinton.com'}
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RateUs;
