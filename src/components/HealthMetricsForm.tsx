
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface HealthMetricsFormProps {
  onUpdate?: () => void;
}

const HealthMetricsForm: React.FC<HealthMetricsFormProps> = ({ onUpdate }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    weight: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodSugar: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('health_metrics')
      .insert({
        user_id: user.id,
        weight: parseFloat(formData.weight) || null,
        blood_pressure_systolic: parseInt(formData.bloodPressureSystolic) || null,
        blood_pressure_diastolic: parseInt(formData.bloodPressureDiastolic) || null,
        blood_sugar: parseFloat(formData.bloodSugar) || null
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save health metrics",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Health metrics saved successfully"
      });
      setFormData({ weight: '', bloodPressureSystolic: '', bloodPressureDiastolic: '', bloodSugar: '' });
      onUpdate?.();
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Update Health Metrics</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="70.5"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="systolic">Systolic BP</Label>
            <Input
              id="systolic"
              type="number"
              value={formData.bloodPressureSystolic}
              onChange={(e) => setFormData({ ...formData, bloodPressureSystolic: e.target.value })}
              placeholder="120"
            />
          </div>
          <div>
            <Label htmlFor="diastolic">Diastolic BP</Label>
            <Input
              id="diastolic"
              type="number"
              value={formData.bloodPressureDiastolic}
              onChange={(e) => setFormData({ ...formData, bloodPressureDiastolic: e.target.value })}
              placeholder="80"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
          <Input
            id="bloodSugar"
            type="number"
            step="0.1"
            value={formData.bloodSugar}
            onChange={(e) => setFormData({ ...formData, bloodSugar: e.target.value })}
            placeholder="95"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Saving...' : 'Save Health Metrics'}
        </Button>
      </form>
    </Card>
  );
};

export default HealthMetricsForm;
