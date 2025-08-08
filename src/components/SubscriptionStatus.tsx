
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Crown, AlertTriangle } from 'lucide-react';
import { usePremium } from '@/hooks/usePremium';
import { usePayment } from '@/hooks/usePayment';
import { format } from 'date-fns';

const SubscriptionStatus = () => {
  const { isPremium, subscriptionType, expiresAt, loading, daysRemaining, status } = usePremium();
  const { renewSubscription, loading: renewLoading } = usePayment();

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  const handleRenew = async () => {
    const result = await renewSubscription();
    if (result.success) {
      window.location.reload(); // Refresh to update status
    }
  };

  const isExpiringSoon = daysRemaining !== null && daysRemaining <= 7;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isPremium ? 'bg-yellow-100' : 'bg-gray-100'}`}>
            <Crown className={`h-5 w-5 ${isPremium ? 'text-yellow-600' : 'text-gray-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {subscriptionType === 'premium' ? 'Premium Plan' : 'Free Plan'}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                {status || 'Unknown'}
              </Badge>
              {isExpiringSoon && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Expires Soon
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPremium && expiresAt && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              Expires on {format(new Date(expiresAt), 'PPP')}
              {daysRemaining !== null && (
                <span className={`ml-2 font-medium ${isExpiringSoon ? 'text-red-600' : 'text-green-600'}`}>
                  ({daysRemaining} days remaining)
                </span>
              )}
            </span>
          </div>

          {isExpiringSoon && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800 mb-2">
                Your premium subscription expires in {daysRemaining} days. Renew now to continue enjoying premium features.
              </p>
              <Button 
                size="sm" 
                onClick={handleRenew} 
                disabled={renewLoading}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                {renewLoading ? 'Renewing...' : 'Renew Subscription'}
              </Button>
            </div>
          )}
        </div>
      )}

      {!isPremium && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Upgrade to Premium to unlock advanced features, AI insights, and priority support.
          </p>
          <Button size="sm" asChild>
            <a href="/premium">Upgrade to Premium</a>
          </Button>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Premium subscriptions automatically expire after 30 days and require manual renewal.
        </p>
      </div>
    </Card>
  );
};

export default SubscriptionStatus;
