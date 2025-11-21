import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Hospital {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  state: string;
  image_url: string;
}

const Hospitals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospitals, setSelectedHospitals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
    fetchUserHospitals();
  }, [user]);

  const fetchHospitals = async () => {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load hospitals',
        variant: 'destructive',
      });
    } else {
      setHospitals(data || []);
    }
    setLoading(false);
  };

  const fetchUserHospitals = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_hospitals')
      .select('hospital_id')
      .eq('user_id', user.id);

    if (data) {
      setSelectedHospitals(data.map((h) => h.hospital_id).filter(Boolean));
    }
  };

  const handleSelectHospital = async (hospitalId: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to select a hospital',
        variant: 'destructive',
      });
      return;
    }

    if (selectedHospitals.includes(hospitalId)) {
      // Remove hospital
      const { error } = await supabase
        .from('user_hospitals')
        .delete()
        .eq('user_id', user.id)
        .eq('hospital_id', hospitalId);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to remove hospital',
          variant: 'destructive',
        });
      } else {
        setSelectedHospitals(selectedHospitals.filter((id) => id !== hospitalId));
        toast({
          title: 'Success',
          description: 'Hospital removed from your profile',
        });
      }
    } else {
      // Add hospital (max 2)
      if (selectedHospitals.length >= 2) {
        toast({
          title: 'Limit Reached',
          description: 'You can only select up to 2 hospitals',
          variant: 'destructive',
        });
        return;
      }

      const hospital = hospitals.find((h) => h.id === hospitalId);
      if (!hospital) return;

      const { error } = await supabase.from('user_hospitals').insert({
        user_id: user.id,
        hospital_id: hospitalId,
        hospital_name: hospital.name,
        email: hospital.email,
        phone: hospital.phone,
        address: hospital.address,
        is_default: selectedHospitals.length === 0,
      });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to add hospital',
          variant: 'destructive',
        });
      } else {
        setSelectedHospitals([...selectedHospitals, hospitalId]);
        toast({
          title: 'Success',
          description: 'Hospital added to your profile',
        });
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading hospitals...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/30 to-background dark:from-background dark:via-green-950/10 dark:to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Select Your Hospital
          </h1>
          <p className="text-muted-foreground">
            Choose up to 2 hospitals for your appointments (Selected: {selectedHospitals.length}/2)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => {
            const isSelected = selectedHospitals.includes(hospital.id);
            return (
              <Card
                key={hospital.id}
                className={`overflow-hidden transition-all hover:shadow-lg ${
                  isSelected
                    ? 'ring-2 ring-green-500 bg-green-50/50 dark:bg-green-950/20'
                    : 'bg-card'
                }`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={hospital.image_url}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg text-foreground">
                    {hospital.name}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>{hospital.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>{hospital.phone}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSelectHospital(hospital.id)}
                    variant={isSelected ? 'outline' : 'default'}
                    className="w-full"
                  >
                    {isSelected ? 'Remove' : 'Select Hospital'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
