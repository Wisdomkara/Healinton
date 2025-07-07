
import { useState, useEffect } from 'react';

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

export const useCountriesAndPharmacies = (selectedCountry: string) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [pharmacies, setPharmacies] = useState<Hospital[]>([]);

  useEffect(() => {
    // Fallback to sample countries since new tables might not be recognized yet
    setCountries([
      { id: '1', name: 'United States', code: 'US' },
      { id: '2', name: 'United Kingdom', code: 'UK' },
      { id: '3', name: 'Canada', code: 'CA' },
      { id: '4', name: 'Australia', code: 'AU' },
      { id: '5', name: 'Germany', code: 'DE' },
      { id: '6', name: 'Nigeria', code: 'NG' },
      { id: '7', name: 'Kenya', code: 'KE' },
      { id: '8', name: 'Ghana', code: 'GH' }
    ]);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fallback to sample pharmacies
      setPharmacies([
        { id: '1', name: 'City Pharmacy', address: '123 Main St', city: 'Downtown', phone: '+1-555-0123', email: 'info@citypharmacy.com', type: 'pharmacy' },
        { id: '2', name: 'Health Plus Pharmacy', address: '456 Health Ave', city: 'Midtown', phone: '+1-555-0456', email: 'contact@healthplus.com', type: 'pharmacy' }
      ]);
    } else {
      setPharmacies([]);
    }
  }, [selectedCountry]);

  return { countries, pharmacies };
};
