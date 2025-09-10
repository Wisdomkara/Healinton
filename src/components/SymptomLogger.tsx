
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useEnsureProfile } from '@/hooks/useEnsureProfile';

const SymptomLogger = () => {
  useEnsureProfile(); // Ensure user profile exists
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    symptoms: '',
    severity: '',
    additionalNotes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const feedback = generateFeedback(formData.symptoms, parseInt(formData.severity));
    
    const { error } = await supabase
      .from('symptoms')
      .insert({
        user_id: user.id,
        symptoms: formData.symptoms,
        severity: parseInt(formData.severity),
        additional_notes: formData.additionalNotes,
        feedback
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to log symptoms",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Symptoms Logged",
        description: "Your symptoms have been recorded with feedback"
      });
      setFormData({ symptoms: '', severity: '', additionalNotes: '' });
    }
    setLoading(false);
  };

  const generateFeedback = (symptoms: string, severity: number): string => {
    if (severity >= 8) {
      return "Your symptoms seem severe. Please consider consulting with a healthcare provider immediately.";
    } else if (severity >= 5) {
      return "Moderate symptoms detected. Monitor closely and consider scheduling a checkup if symptoms persist.";
    } else {
      return "Mild symptoms noted. Continue monitoring and maintain your current care routine.";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Log Your Symptoms</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="symptoms">Describe Your Symptoms</Label>
          <Textarea
            id="symptoms"
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            placeholder="Describe how you're feeling..."
            required
          />
        </div>
        <div>
          <Label htmlFor="severity">Severity (1-10)</Label>
          <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select severity level" />
            </SelectTrigger>
            <SelectContent>
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <SelectItem key={num} value={num.toString()}>{num} - {num <= 3 ? 'Mild' : num <= 6 ? 'Moderate' : 'Severe'}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            placeholder="Any additional information..."
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Logging...' : 'Log Symptoms'}
        </Button>
      </form>
    </Card>
  );
};

export default SymptomLogger;
