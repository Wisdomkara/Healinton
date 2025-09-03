
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const ReminderForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reminderDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('reminders')
      .insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        reminder_date: formData.reminderDate
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to set reminder",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Reminder Set",
        description: "Your reminder has been created successfully"
      });
      setFormData({ title: '', description: '', reminderDate: '' });
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Set Reminder</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Reminder Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Take medication, Doctor visit, etc."
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Additional details..."
          />
        </div>
        <div>
          <Label htmlFor="reminderDate">Date & Time</Label>
          <Input
            id="reminderDate"
            type="datetime-local"
            value={formData.reminderDate}
            onChange={(e) => setFormData({ ...formData, reminderDate: e.target.value })}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Setting...' : 'Set Reminder'}
        </Button>
      </form>
    </Card>
  );
};

export default ReminderForm;
