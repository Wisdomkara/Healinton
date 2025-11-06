
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Star, Send, Heart } from 'lucide-react';
import { z } from 'zod';
import { emailSchema, nameSchema, sanitizeText, validateFormData } from '@/utils/validation';

const RateUs = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarHover = (value) => {
    setHoveredRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: 'Please rate us',
        description: 'Please select a star rating before submitting',
        variant: 'destructive'
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to submit a rating.',
        variant: 'destructive'
      });
      return;
    }

    // Validate input data
    const ratingSchema = z.object({
      userName: nameSchema.optional().or(z.literal('')),
      userEmail: emailSchema.optional().or(z.literal('')),
      feedback: z.string()
        .max(1000, 'Feedback must be less than 1000 characters')
        .transform(sanitizeText)
        .optional()
        .or(z.literal(''))
    });

    const validation = validateFormData(ratingSchema, { userName, userEmail, feedback });
    if (!validation.success) {
      toast({
        title: 'Invalid Input',
        description: validation.error,
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save rating to Supabase database
      const { error } = await supabase
        .from('ratings')
        .insert({
          user_id: user.id,
          user_name: validation.data.userName || `${user.user_metadata?.first_name} ${user.user_metadata?.last_name}`.trim() || 'Anonymous',
          user_email: validation.data.userEmail || user.email,
          rating,
          feedback: validation.data.feedback || null
        });

      if (error) {
        console.error('Error saving rating:', error);
        throw error;
      }

      // If it's a 5-star rating, send email notification
      if (rating === 5) {
        try {
          const response = await fetch('/api/send-rating-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: 'karawisdom38@gmail.com',
              subject: '⭐ New 5-Star Rating Received!',
              ratingData: {
                rating,
                feedback,
                userName: userName || `${user.user_metadata?.first_name} ${user.user_metadata?.last_name}`.trim() || 'Anonymous',
                userEmail: userEmail || user.email,
                submittedAt: new Date().toISOString()
              }
            })
          });

          if (!response.ok) {
            console.error('Failed to send email notification');
          }
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Continue with the rating submission even if email fails
        }
      }

      toast({
        title: 'Thank you for your feedback!',
        description: rating === 5 
          ? 'Your 5-star rating means the world to us! 🌟' 
          : 'We appreciate your feedback and will work to improve.',
      });

      // Reset form
      setRating(0);
      setHoveredRating(0);
      setFeedback('');
      setUserName('');
      setUserEmail('');

    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit rating. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (stars) => {
    switch (stars) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Rate Your Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your feedback helps us improve Healinton and serve you better
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="text-center">
            <Label className="text-lg font-medium mb-4 block">How would you rate our app?</Label>
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-all duration-200 transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-lg font-medium text-green-600 dark:text-green-400">
                {getRatingText(rating)}
              </p>
            )}
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userName">Your Name (Optional)</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Your Email (Optional)</Label>
              <Input
                id="userEmail"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1"
              />
            </div>
          </div>

          {/* Feedback */}
          <div>
            <Label htmlFor="feedback">Tell us more about your experience</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts, suggestions, or what you loved most about Healinton..."
              rows={4}
              className="mt-1 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-medium transform hover:scale-105 transition-all duration-200"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Rating
              </>
            )}
          </Button>
        </form>

        {/* Thank you message for 5 stars */}
        {rating === 5 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-l-4 border-yellow-400">
            <p className="text-center text-yellow-800 dark:text-yellow-200 font-medium">
              🌟 Amazing! Your 5-star rating will be sent directly to our team! 🌟
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RateUs;
