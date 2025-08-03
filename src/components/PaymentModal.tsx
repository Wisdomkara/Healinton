
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { processPayment, loading } = usePayment();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await processPayment({
      amount: 5.00,
      currency: 'USD',
      paymentMethod: 'credit_card'
    });

    if (result.success) {
      onSuccess();
      onClose();
      // Refresh the page to update premium status
      window.location.reload();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Premium Subscription - $5/month
          </DialogTitle>
        </DialogHeader>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input
                id="billingAddress"
                placeholder="123 Main St, City, State, ZIP"
                value={formData.billingAddress}
                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Your payment information is secure and encrypted</span>
            </div>
            
            <div className="space-y-2">
              <Button type="submit" disabled={loading} className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                {loading ? 'Processing Payment...' : 'Pay $5.00/month'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="w-full">
                Cancel
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
