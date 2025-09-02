
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Quote, Sparkles } from 'lucide-react';

const MotivationalQuote = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPersonalizedQuote = () => {
    const illness = profile?.illness_type;
    const quotes = {
      diabetes: [
        "Managing diabetes is a journey, not a destination. Every healthy choice counts.",
        "Your blood sugar doesn't define you - your determination does.",
        "Small steps in diet and exercise lead to big improvements in health."
      ],
      hypertension: [
        "Lower your pressure, raise your spirits. Every heartbeat is a chance to heal.",
        "Calm mind, healthy heart. You're stronger than your blood pressure.",
        "Heart health is a choice you make every day. Choose wellness."
      ],
      obesity: [
        "Your weight loss journey is a marathon, not a sprint. Progress over perfection.",
        "Every pound lost is a victory. Celebrate your small wins.",
        "You are more than a number on a scale. You are worth the effort."
      ],
      default: [
        "Health is not about the weight you lose, but about the life you gain.",
        "Take care of your body. It's the only place you have to live.",
        "Every day is a new opportunity to improve your health and happiness."
      ]
    };

    const relevantQuotes = quotes[illness as keyof typeof quotes] || quotes.default;
    const today = new Date().getDate();
    return relevantQuotes[today % relevantQuotes.length];
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  const quote = getPersonalizedQuote();
  const userName = profile?.first_name || 'Friend';

  return (
    <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700/30">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-full">
          <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
            Daily Motivation for {userName}
          </h3>
          <div className="relative">
            <Quote className="h-4 w-4 text-green-400 absolute -top-1 -left-1" />
            <p className="text-gray-700 dark:text-gray-300 text-sm italic pl-4 leading-relaxed">
              {quote}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              — Your Healinton Team
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MotivationalQuote;
