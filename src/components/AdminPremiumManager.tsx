import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Crown, Plus, User, Calendar, Check, X } from 'lucide-react';

interface PremiumUser {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  added_by: string;
  added_at: string;
  expires_at: string | null;
  is_active: boolean;
  notes: string | null;
}

const AdminPremiumManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [premiumUsers, setPremiumUsers] = useState<PremiumUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    notes: ''
  });

  useEffect(() => {
    fetchPremiumUsers();
  }, []);

  const fetchPremiumUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('premium_users_admin')
        .select('*')
        .order('added_at', { ascending: false });

      if (error) throw error;
      setPremiumUsers(data || []);
    } catch (error) {
      console.error('Error fetching premium users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load premium users.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addPremiumUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.email) return;

    try {
      // First check if user exists in auth.users
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', formData.email)
        .single();

      if (userError || !userData) {
        toast({
          title: 'Error',
          description: 'User with this email not found. They must register first.',
          variant: 'destructive'
        });
        return;
      }

      // Add to premium users admin table
      const { error } = await supabase
        .from('premium_users_admin')
        .insert({
          user_id: userData.id,
          email: formData.email,
          full_name: formData.full_name || null,
          added_by: user.email || 'admin',
          notes: formData.notes || null
        });

      if (error) throw error;

      setFormData({ email: '', full_name: '', notes: '' });
      setShowAddForm(false);
      fetchPremiumUsers();

      toast({
        title: 'Success',
        description: 'User has been added to premium users list.',
      });

    } catch (error) {
      console.error('Error adding premium user:', error);
      toast({
        title: 'Error',
        description: 'Failed to add premium user. They may already be premium.',
        variant: 'destructive'
      });
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('premium_users_admin')
        .update({ is_active: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      fetchPremiumUsers();
      toast({
        title: 'Success',
        description: `User status has been ${!currentStatus ? 'activated' : 'deactivated'}.`,
      });

    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user status.',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Crown className="h-6 w-6 mr-2 text-yellow-500" />
          Premium Users Manager
        </h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Premium User
        </Button>
      </div>

      {/* Add Premium User Form */}
      {showAddForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Premium User</h3>
          <form onSubmit={addPremiumUser} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes..."
                rows={3}
              />
            </div>
            <div className="flex space-x-3">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Add User
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Premium Users List */}
      <div className="grid gap-4">
        {premiumUsers.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No premium users found.</p>
          </Card>
        ) : (
          premiumUsers.map((premiumUser) => (
            <Card key={premiumUser.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <User className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {premiumUser.full_name || 'Unknown Name'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {premiumUser.email}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Added: {new Date(premiumUser.added_at).toLocaleDateString()}
                      {premiumUser.expires_at && (
                        <span className="ml-2">
                          | Expires: {new Date(premiumUser.expires_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {premiumUser.notes && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Notes: {premiumUser.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    premiumUser.is_active 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                  }`}>
                    {premiumUser.is_active ? 'Active' : 'Inactive'}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleUserStatus(premiumUser.id, premiumUser.is_active)}
                    className={`${
                      premiumUser.is_active 
                        ? 'hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                        : 'hover:bg-green-50 hover:text-green-600 hover:border-green-200'
                    }`}
                  >
                    {premiumUser.is_active ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
        <div className="flex items-start space-x-3">
          <Crown className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-200">
              Premium Access Information
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              All users have free premium access until November 30, 2025. This manager allows you to 
              manually grant extended premium access to specific users beyond that date.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminPremiumManager;