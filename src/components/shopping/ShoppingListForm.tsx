
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface Country {
  id: string;
  name: string;
  code: string;
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  type: string;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  country: string;
  medicationName: string;
  pharmacyName: string;
}

interface ShoppingListFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  countries: Country[];
  pharmacies: Hospital[];
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const ShoppingListForm: React.FC<ShoppingListFormProps> = ({
  formData,
  setFormData,
  countries,
  pharmacies,
  loading,
  onSubmit
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Add Medication to Shopping List</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            id="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <Label htmlFor="country">Select Country</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value, pharmacyName: '' })}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="medication">Medication Name</Label>
          <Input
            id="medication"
            value={formData.medicationName}
            onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
            placeholder="Enter medication name"
            required
          />
        </div>

        <div>
          <Label htmlFor="pharmacy">Select Pharmacy</Label>
          <Select 
            value={formData.pharmacyName} 
            onValueChange={(value) => setFormData({ ...formData, pharmacyName: value })}
            disabled={!formData.country}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.country ? "Choose a pharmacy" : "Select country first"} />
            </SelectTrigger>
            <SelectContent>
              {pharmacies.map(pharmacy => (
                <SelectItem key={pharmacy.id} value={pharmacy.name}>
                  {pharmacy.name} - {pharmacy.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          {loading ? 'Adding...' : 'Add to Shopping List'}
        </Button>
      </form>
    </Card>
  );
};

export default ShoppingListForm;
