import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  state: string;
}

const Pharmacies = () => {
  const { toast } = useToast();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="p-8 text-center">Loading pharmacies...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/30 to-background dark:from-background dark:via-green-950/10 dark:to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Available Pharmacies
          </h1>
          <p className="text-muted-foreground">
            Browse pharmacies for your drug orders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy) => (
            <Card
              key={pharmacy.id}
              className="p-6 space-y-4 bg-card hover:shadow-lg transition-all"
            >
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
                  <span>{pharmacy.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>{pharmacy.phone}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;
