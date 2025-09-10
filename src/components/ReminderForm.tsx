
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEnsureProfile } from '@/hooks/useEnsureProfile';
import { Clock } from 'lucide-react';
import { z } from 'zod';
import { validateFormData, nameSchema, textAreaSchema } from '@/utils/validation';

// Validation schema for reminders
const reminderSchema = z.object({
  title: nameSchema,
  description: textAreaSchema.optional(),
  reminder_date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const now = new Date();
    return selectedDate > now;
  }, 'Reminder date must be in the future')
});

const ReminderForm = () => {
  useEnsureProfile(); // Ensure user profile exists
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reminder_date: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create reminders.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Validate the form data
      const validation = validateFormData(reminderSchema, formData);
      if (!validation.success) {
        toast({
          title: "Invalid input",
          description: validation.error,
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('reminders')
        .insert({
          user_id: user.id,
          title: validation.data.title,
          description: validation.data.description || null,
          reminder_date: validation.data.reminder_date
        });

      if (error) {
        console.error('Error creating reminder:', error);
        toast({
          title: "Error",
          description: "Failed to create reminder. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Reminder created successfully.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        reminder_date: ''
      });

    } catch (error) {
      console.error('Error creating reminder:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Get minimum datetime (current time + 1 minute)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Create Reminder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Take medication"
              value={formData.title}
              onChange={handleInputChange}
              required
              maxLength={100}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Additional details about this reminder..."
              value={formData.description}
              onChange={handleInputChange}
              maxLength={1000}
              className="w-full"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder_date">Date & Time *</Label>
            <Input
              id="reminder_date"
              name="reminder_date"
              type="datetime-local"
              value={formData.reminder_date}
              onChange={handleInputChange}
              min={getMinDateTime()}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Reminder'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReminderForm;
