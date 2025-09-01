import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Settings, Activity, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const IllnessSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentIllness, setCurrentIllness] = useState('');
  const [newIllness, setNewIllness] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const illnessOptions = [
    'Type 1 Diabetes',
    'Type 2 Diabetes',
    'Gestational Diabetes',
    'Hypertension (High Blood Pressure)',
    'Hypotension (Low Blood Pressure)',
    'Heart Disease',
    'Coronary Artery Disease',
    'Congestive Heart Failure',
    'Stroke',
    'Chronic Kidney Disease',
    'Kidney Stones',
    'Asthma',
    'COPD (Chronic Obstructive Pulmonary Disease)',
    'Bronchitis',
    'Emphysema',
    'Arthritis',
    'Rheumatoid Arthritis',
    'Osteoarthritis',
    'Osteoporosis',
    'Fibromyalgia',
    'Multiple Sclerosis',
    'Parkinson\'s Disease',
    'Alzheimer\'s Disease',
    'Epilepsy',
    'Migraine',
    'Chronic Headaches',
    'Depression',
    'Anxiety Disorders',
    'Bipolar Disorder',
    'PTSD',
    'Stress',
    'Insomnia',
    'Sleep Apnea',
    'Thyroid Disorders',
    'Hyperthyroidism',
    'Hypothyroidism',
    'Celiac Disease',
    'Crohn\'s Disease',
    'Ulcerative Colitis',
    'IBS (Irritable Bowel Syndrome)',
    'GERD (Gastroesophageal Reflux Disease)',
    'Peptic Ulcers',
    'Liver Disease',
    'Hepatitis B',
    'Hepatitis C',
    'Cirrhosis',
    'Cancer',
    'Breast Cancer',
    'Lung Cancer',
    'Colorectal Cancer',
    'Prostate Cancer',
    'Skin Cancer',
    'Leukemia',
    'Lymphoma',
    'Lupus',
    'Psoriasis',
    'Eczema',
    'HIV/AIDS',
    'Tuberculosis',
    'Malaria',
    'Sickle Cell Disease',
    'Hemophilia',
    'Anemia',
    'Iron Deficiency',
    'Vitamin D Deficiency',
    'Vitamin B12 Deficiency',
    'Obesity',
    'Eating Disorders',
    'Anorexia',
    'Bulimia',
    'PCOS (Polycystic Ovary Syndrome)',
    'Endometriosis',
    'Menopause',
    'Erectile Dysfunction',
    'Benign Prostatic Hyperplasia',
    'Glaucoma',
    'Cataracts',
    'Macular Degeneration',
    'Hearing Loss',
    'Tinnitus',
    'Chronic Fatigue Syndrome',
    'Chronic Pain',
    'Back Pain',
    'Neck Pain',
    'Sciatica',
    'Carpal Tunnel Syndrome',
    'Tennis Elbow',
    'Plantar Fasciitis',
    'Varicose Veins',
    'Deep Vein Thrombosis',
    'Atrial Fibrillation',
    'High Cholesterol',
    'Metabolic Syndrome',
    'Prediabetes',
    'Gout',
    'Pneumonia',
    'Bronchial Infections',
    'Sinusitis',
    'Allergies',
    'Food Allergies',
    'Seasonal Allergies',
    'Skin Allergies',
    'Cold',
    'Flu',
    'Fever',
    'Cough',
    'Sore Throat',
    'Runny Nose',
    'Congestion',
    'Headaches',
    'Nausea',
    'Vomiting',
    'Diarrhea',
    'Constipation',
    'Acid Reflux',
    'Heartburn',
    'Bloating',
    'Gas',
    'Stomach Ache',
    'Muscle Aches',
    'Joint Pain',
    'Fatigue',
    'Dizziness',
    'Shortness of Breath',
    'Chest Pain',
    'Palpitations',
    'Skin Rashes',
    'Dry Skin',
    'Acne',
    'Hair Loss',
    'Dandruff',
    'Eye Strain',
    'Dry Eyes',
    'Blurred Vision',
    'Ear Pain',
    'Toothache',
    'Jaw Pain',
    'Swollen Glands',
    'Bruising',
    'Cuts and Scrapes',
    'Burns',
    'Sprains',
    'Minor Injuries',
    'Sunburn',
    'Bug Bites',
    'Poison Ivy',
    'Dehydration',
    'Motion Sickness',
    'Jet Lag',
    'Mild Anxiety',
    'Mood Swings',
    'Irritability',
    'Concentration Issues',
    'Memory Problems',
    'Seasonal Depression',
    'PMS',
    'Menstrual Cramps',
    'Hot Flashes',
    'Night Sweats',
    'Morning Sickness',
    'Growing Pains',
    'Teething Pain',
    'Diaper Rash',
    'Cradle Cap',
    'Colic',
    'General Wellness Maintenance'
  ];

  useEffect(() => {
    const fetchCurrentIllness = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('illness_type')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching illness type:', error);
        } else if (data) {
          setCurrentIllness(data.illness_type || '');
          setNewIllness(data.illness_type || '');
        }
      } catch (error) {
        console.error('Error fetching illness type:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentIllness();
  }, [user]);

  const handleUpdateIllness = async () => {
    if (!user || !newIllness || newIllness === currentIllness) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ illness_type: newIllness })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setCurrentIllness(newIllness);
      toast({
        title: "Updated Successfully",
        description: `Your managed condition has been updated to ${newIllness}.`
      });
    } catch (error) {
      console.error('Error updating illness type:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update your managed condition. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Health Condition Management</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Change the condition you want to focus on managing
          </p>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Currently Managing:</span>
            </div>
            <p className="text-green-800 dark:text-green-200 font-semibold mt-1">
              {currentIllness || 'No condition selected'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-illness">Select New Condition to Manage</Label>
            <Select value={newIllness} onValueChange={setNewIllness}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a condition to manage" />
              </SelectTrigger>
              <SelectContent>
                {illnessOptions.map((illness) => (
                  <SelectItem key={illness} value={illness}>
                    {illness}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {newIllness && newIllness !== currentIllness && (
            <Button 
              onClick={handleUpdateIllness} 
              disabled={saving}
              className="w-full"
            >
              <Check className="h-4 w-4 mr-2" />
              {saving ? 'Updating...' : 'Update Managed Condition'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default IllnessSettings;
