// VAT rates by country (in percentage)
export const VAT_RATES: Record<string, number> = {
  // European Union
  'Austria': 20,
  'Belgium': 21,
  'Bulgaria': 20,
  'Croatia': 25,
  'Cyprus': 19,
  'Czech Republic': 21,
  'Denmark': 25,
  'Estonia': 20,
  'Finland': 24,
  'France': 20,
  'Germany': 19,
  'Greece': 24,
  'Hungary': 27,
  'Ireland': 23,
  'Italy': 22,
  'Latvia': 21,
  'Lithuania': 21,
  'Luxembourg': 17,
  'Malta': 18,
  'Netherlands': 21,
  'Poland': 23,
  'Portugal': 23,
  'Romania': 19,
  'Slovakia': 20,
  'Slovenia': 22,
  'Spain': 21,
  'Sweden': 25,
  
  // Other European countries
  'United Kingdom': 20,
  'Norway': 25,
  'Switzerland': 7.7,
  
  // North America
  'United States': 0, // Sales tax varies by state
  'Canada': 5, // GST, provinces add PST
  'Mexico': 16,
  
  // Africa
  'Nigeria': 7.5,
  'South Africa': 15,
  'Kenya': 16,
  'Ghana': 12.5,
  'Egypt': 14,
  'Morocco': 20,
  'Tanzania': 18,
  'Uganda': 18,
  'Ethiopia': 15,
  
  // Asia
  'China': 13,
  'India': 18,
  'Japan': 10,
  'South Korea': 10,
  'Singapore': 8,
  'Malaysia': 10,
  'Thailand': 7,
  'Vietnam': 10,
  'Indonesia': 11,
  'Philippines': 12,
  'Pakistan': 17,
  'Bangladesh': 15,
  
  // Middle East
  'United Arab Emirates': 5,
  'Saudi Arabia': 15,
  'Turkey': 18,
  'Israel': 17,
  
  // Oceania
  'Australia': 10,
  'New Zealand': 15,
  
  // South America
  'Brazil': 17,
  'Argentina': 21,
  'Chile': 19,
  'Colombia': 19,
  'Peru': 18,
};

export const getVATRate = (country: string | null | undefined): number => {
  if (!country) return 0;
  return VAT_RATES[country] || 0;
};

export const calculateVAT = (amount: number, country: string | null | undefined): number => {
  const rate = getVATRate(country);
  return (amount * rate) / 100;
};

export const calculateTotalWithVAT = (amount: number, country: string | null | undefined): number => {
  return amount + calculateVAT(amount, country);
};
