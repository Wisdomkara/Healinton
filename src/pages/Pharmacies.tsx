import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  state: string;
  image_url: string | null;
}

const Pharmacies = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(
    localStorage.getItem('selectedPharmacyId')
  );

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load pharmacies',
        variant: 'destructive',
      });
    } else {
      setPharmacies(data || []);
    }
    setLoading(false);
  };

  const handleSelectPharmacy = (pharmacyId: string) => {
    localStorage.setItem('selectedPharmacyId', pharmacyId);
    setSelectedPharmacy(pharmacyId);
    toast({
      title: 'Pharmacy Selected',
      description: 'You can now order drugs from this pharmacy',
    });
    navigate('/drugs');
  };

  if (loading) {
    return <div className="p-8 text-center">Loading pharmacies...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/30 to-background dark:from-background dark:via-green-950/10 dark:to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Select a Pharmacy
          </h1>
          <p className="text-muted-foreground">
            Choose a pharmacy to order your medications from
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy) => (
            <Card
              key={pharmacy.id}
              className={`overflow-hidden bg-white dark:bg-card hover:shadow-lg transition-all border-2 ${
                selectedPharmacy === pharmacy.id
                  ? 'border-green-500'
                  : 'border-border'
              }`}
            >
              {pharmacy.image_url && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={pharmacy.image_url}
                    alt={pharmacy.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedPharmacy === pharmacy.id && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
              )}
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-lg text-foreground">
                  {pharmacy.name}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600" />
                    <span>{pharmacy.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0 text-green-600" />
                    <span className="text-xs break-all">{pharmacy.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>{pharmacy.phone}</span>
                  </div>
                </div>
                <Button
                  onClick={() => handleSelectPharmacy(pharmacy.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  variant={selectedPharmacy === pharmacy.id ? 'outline' : 'default'}
                >
                  {selectedPharmacy === pharmacy.id ? 'Selected' : 'Select Pharmacy'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;
