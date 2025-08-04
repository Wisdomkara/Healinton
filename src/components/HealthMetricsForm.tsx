
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Activity } from 'lucide-react';
import { z } from 'zod';
import { validateFormData } from '@/utils/validation';

// Validation schema for health metrics
const healthMetricsSchema = z.object({
  weight: z.number().min(1, 'Weight must be greater than 0').max(1000, 'Weight seems too high'),
  blood_pressure_systolic: z.number().min(50, 'Systolic BP too low').max(300, 'Systolic BP too high'),
  blood_pressure_diastolic: z.number().min(30, 'Diastolic BP too low').max(200, 'Diastolic BP too high'),
  blood_sugar: z.number().min(1, 'Blood sugar must be greater than 0').max(1000, 'Blood sugar seems too high')
});

const HealthMetricsForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    blood_sugar: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Only allow numeric input for health metrics
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save your health metrics.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Convert string inputs to numbers and validate
      const numericData = {
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        blood_pressure_systolic: formData.blood_pressure_systolic ? parseInt(formData.blood_pressure_systolic) : undefined,
        blood_pressure_diastolic: formData.blood_pressure_diastolic ? parseInt(formData.blood_pressure_diastolic) : undefined,
        blood_sugar: formData.blood_sugar ? parseFloat(formData.blood_sugar) : undefined
      };

      // Remove undefined values
      const filteredData = Object.fromEntries(
        Object.entries(numericData).filter(([_, value]) => value !== undefined)
      );

      if (Object.keys(filteredData).length === 0) {
        toast({
          title: "No data to save",
          description: "Please enter at least one health metric.",
          variant: "destructive"
        });
        return;
      }

      // Validate the data
      const validation = validateFormData(healthMetricsSchema.partial(), filteredData);
      if (!validation.success) {
        toast({
          title: "Invalid input",
          description: validation.error,
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('health_metrics')
        .insert({
          user_id: user.id,
          ...validation.data
        });

      if (error) {
        console.error('Error saving health metrics:', error);
        toast({
          title: "Error",
          description: "Failed to save health metrics. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Health metrics saved successfully.",
      });

      // Reset form
      setFormData({
        weight: '',
        blood_pressure_systolic: '',
        blood_pressure_diastolic: '',
        blood_sugar: ''
      });

    } catch (error) {
      console.error('Error saving health metrics:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Health Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="text"
                inputMode="decimal"
                placeholder="70.5"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blood_sugar">Blood Sugar (mg/dL)</Label>
              <Input
                id="blood_sugar"
                name="blood_sugar"
                type="text"
                inputMode="decimal"
                placeholder="100"
                value={formData.blood_sugar}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blood_pressure_systolic">Systolic BP (mmHg)</Label>
              <Input
                id="blood_pressure_systolic"
                name="blood_pressure_systolic"
                type="text"
                inputMode="numeric"
                placeholder="120"
                value={formData.blood_pressure_systolic}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blood_pressure_diastolic">Diastolic BP (mmHg)</Label>
              <Input
                id="blood_pressure_diastolic"
                name="blood_pressure_diastolic"
                type="text"
                inputMode="numeric"
                placeholder="80"
                value={formData.blood_pressure_diastolic}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Health Metrics'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsForm;
